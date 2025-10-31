"use client";

import { useMemo, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";
import { useDrag, useDrop } from "react-dnd";
import type { Shift, ShiftCal } from "../../model/shiftType";

interface CalendarViewProps {
  shifts: ShiftCal[];
  onEditShift?: (shift: any) => void;
  onDropShift?: (shiftId: number, newDate: Date, employeeId?: string) => void;
}

type ViewMode = "day" | "week" | "month" | "year";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getEmployeesFromShifts = (shifts: ShiftCal[]) => {
  const employeeMap = new Map();

  shifts.forEach((shift) => {
    if (shift.users && Array.isArray(shift.users)) {
      shift.users.forEach((user) => {
        if (!employeeMap.has(user.id)) {
          employeeMap.set(user.id, {
            id: user.id,
            name: user.fullName || user.userName,
            userName: user.userName,
            email: user.email,
            employeeCode: user.employeeCode,
          });
        }
      });
    }
  });

  return Array.from(employeeMap.values());
};

const ItemTypes = {
  SHIFT: "shift",
};

const formatTimeDisplay = (time: string) => {
  if (!time) return "00:00";
  return time.slice(0, 5);
};

const isDateInShiftRange = (date: Date, shift: Shift) => {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  const startDate = new Date(shift.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(shift.endDate);
  endDate.setHours(0, 0, 0, 0);

  return checkDate >= startDate && checkDate <= endDate;
};

const isDateSkipped = (date: Date, shift: Shift) => {
  if (!shift.skipDates || shift.skipDates === "[]") return false;

  try {
    const skipDates = JSON.parse(shift.skipDates);
    return skipDates.some((skipDate: any) => {
      const skipStart = new Date(skipDate.startDate);
      skipStart.setHours(0, 0, 0, 0);

      const skipEnd = new Date(skipDate.endDate);
      skipEnd.setHours(0, 0, 0, 0);

      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);

      return checkDate >= skipStart && checkDate <= skipEnd;
    });
  } catch (error) {
    console.error("Error parsing skipDates:", error);
    return false;
  }
};

const getShiftColor = (shift: any) => {
  if (!shift) return "grey.300";

  const type = shift.shiftType || shift.type || shift.name || "";
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("morning")) return "rgba(33, 150, 243, 0.15)";
  if (normalizedType.includes("afternoon")) return "rgba(16, 189, 0, 0.25)";
  if (normalizedType.includes("night")) return "rgba(244, 67, 54, 0.25)";

  if (shift.startTime) {
    const hour = parseInt(shift.startTime.split(":")[0]);
    if (hour < 12) return "rgba(33, 150, 243, 0.15)";
    if (hour < 18) return "rgba(255, 193, 7, 0.25)";
    return "rgba(244, 67, 54, 0.25)";
  }

  return "rgba(158, 158, 158, 0.25)";
};

const DraggableShiftCard = ({
  shift,
  user,
  onEditShift,
}: {
  shift: any;
  user?: any;
  onEditShift?: (shift: any) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIFT,
    item: { shift, user },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const shiftColor = getShiftColor(shift);

  return (
    <Box
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      onClick={() => onEditShift?.(shift)}
      sx={{
        mb: 0.5,
        p: 0.75,
        borderRadius: 1.5,
        cursor: "grab",
        backgroundColor: shiftColor,
        opacity: isDragging ? 0.5 : 1,
        transition: "0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          boxShadow: 2,
          transform: "scale(1.03)",
        },
      }}
    >
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{
          color: "text.primary",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {user?.name || user?.userName || "Unnamed"}
      </Typography>
      {user?.employeeCode && (
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.7rem",
            ml: 0.5,
          }}
        >
          {user.employeeCode}
        </Typography>
      )}
    </Box>
  );
};

const DropTargetCell = ({
  date,
  employeeId,
  onDrop,
  children,
}: {
  date: Date;
  employeeId?: string;
  onDrop: (shiftId: number, newDate: Date, employeeId?: string) => void;
  children: React.ReactNode;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SHIFT,
    drop: (item: { shift: any; user?: any }) => {
      onDrop(item.shift.id, date, employeeId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      sx={{
        height: "100%",
        minHeight: 80,
        backgroundColor: isOver ? "rgba(25, 118, 210, 0.08)" : "transparent",
        transition: "background-color 0.2s",
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  );
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfWeekMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDates(date: Date) {
  const start = startOfWeekMonday(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const start = startOfWeekMonday(firstOfMonth);

  const matrix: Date[][] = [];
  for (let week = 0; week < 6; week++) {
    const row: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const d = new Date(start);
      d.setDate(start.getDate() + week * 7 + day);
      row.push(d);
    }
    matrix.push(row);
  }
  return matrix;
}

function formatWeekRange(weekDates: Date[]) {
  const start = weekDates[0];
  const end = weekDates[6];
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${startStr} - ${endStr}`;
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatYear(date: Date) {
  return date.getFullYear();
}

export default function CalendarView({
  shifts,
  onEditShift,
  onDropShift,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewMode>("week");
  const [searchTerm, setSearchTerm] = useState("");

  const employees = useMemo(() => getEmployeesFromShifts(shifts), [shifts]);

  const filteredEmployees = useMemo(
    () =>
      searchTerm
        ? employees.filter(
            (e) =>
              e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              e.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              e.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : employees,
    [employees, searchTerm]
  );
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
  const monthMatrix = useMemo(() => getMonthMatrix(currentDate), [currentDate]);
  const today = useMemo(() => new Date(), []);

  const goToToday = () => setCurrentDate(new Date());

  const navigate = (direction: "prev" | "next") => {
    const mult = direction === "next" ? 1 : -1;
    const d = new Date(currentDate);
    if (view === "week") {
      d.setDate(d.getDate() + 7 * mult);
    } else if (view === "month") {
      d.setMonth(d.getMonth() + 1 * mult);
    } else {
      d.setFullYear(d.getFullYear() + 1 * mult);
    }
    setCurrentDate(d);
  };

  const headerTitle =
    view === "week"
      ? formatWeekRange(weekDates)
      : view === "month"
      ? formatMonth(currentDate)
      : formatYear(currentDate).toString();

  const getShiftsForDateAndEmployee = (date: Date, employeeId?: string) => {
    return shifts.filter((shift) => {
      if (!isDateInShiftRange(date, shift) || isDateSkipped(date, shift)) {
        return false;
      }
      if (employeeId) {
        return shift.users?.some((user: any) => user.id === employeeId);
      }

      return true;
    });
  };

  const shiftsForDay = (date: Date) => {
    const allowedEmployeeIds = new Set(filteredEmployees.map((e) => e.id));

    return shifts.filter((shift) => {
      if (!isDateInShiftRange(date, shift) || isDateSkipped(date, shift)) {
        return false;
      }
      return shift.users?.some((user: any) => allowedEmployeeIds.has(user.id));
    });
  };

  const handleDrop = (shiftId: number, newDate: Date, employeeId?: string) => {
    onDropShift?.(shiftId, newDate, employeeId);
  };

  const DayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
        <Box sx={{ width: 60, flexShrink: 0 }}>
          {hours.map((h) => (
            <Box
              key={h}
              sx={{
                height: 60,
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption">
                {h.toString().padStart(2, "0")}:00
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {filteredEmployees.map((emp) => (
                    <TableCell
                      key={emp.id}
                      align="center"
                      sx={{ minWidth: 140, bgcolor: "background.paper" }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {emp.userName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {emp.employeeCode}
                        </Typography>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {hours.map((h) => (
                  <TableRow key={h} sx={{ height: 60 }}>
                    {filteredEmployees.map((emp) => {
                      const empShifts = getShiftsForDateAndEmployee(
                        currentDate,
                        emp.id
                      ).filter((shift) => {
                        const shiftStartHour = parseInt(
                          shift.startTime.split(":")[0]
                        );
                        const shiftEndHour = parseInt(
                          shift.endTime.split(":")[0]
                        );
                        return h >= shiftStartHour && h < shiftEndHour;
                      });

                      return (
                        <TableCell
                          key={emp.id + "-" + h}
                          sx={{
                            p: 0.5,
                            borderRight: 1,
                            borderColor: "divider",
                            verticalAlign: "top",
                          }}
                        >
                          {empShifts.map((shift) => (
                            <DraggableShiftCard
                              key={shift.id}
                              shift={shift}
                              user={emp}
                              onEditShift={onEditShift}
                            />
                          ))}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  const WeekView = () => (
    <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
        >
          <Table stickyHeader size="small" aria-label="Week schedule">
            <TableHead>
              <TableRow>
                {weekDates.map((date, i) => {
                  const isToday = isSameDay(date, today);
                  return (
                    <TableCell
                      key={i}
                      align="center"
                      sx={{
                        minWidth: 140,
                        bgcolor: "background.paper",
                        borderBottom: 2,
                        borderColor: isToday ? "primary.main" : "divider",
                        py: 1.25,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.3,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="text.secondary"
                        >
                          {weekDays[i]}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color={isToday ? "primary.main" : "text.primary"}
                          lineHeight={1}
                        >
                          {date.getDate()}
                        </Typography>
                        {isToday && (
                          <Chip
                            label="Today"
                            color="primary"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id} sx={{ height: 84 }}>
                  {weekDates.map((date, j) => {
                    const empShifts = getShiftsForDateAndEmployee(date, emp.id);
                    return (
                      <TableCell
                        key={j}
                        sx={{
                          p: 0.75,
                          borderRight: j < 6 ? 1 : 0,
                          borderColor: "divider",
                          verticalAlign: "top",
                        }}
                      >
                        <DropTargetCell
                          date={date}
                          employeeId={emp.id}
                          onDrop={handleDrop}
                        >
                          {empShifts.length === 0 ? (
                            <Typography variant="caption" color="text.disabled">
                              No shift
                            </Typography>
                          ) : (
                            empShifts.map((shift) => (
                              <DraggableShiftCard
                                key={shift.id}
                                shift={shift}
                                user={emp}
                                onEditShift={onEditShift}
                              />
                            ))
                          )}
                        </DropTargetCell>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  const MonthView = () => (
    <Box sx={{ flex: 1, overflow: "auto" }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
      >
        <Table size="small" stickyHeader aria-label="Month calendar">
          <TableHead>
            <TableRow>
              {weekDays.map((d) => (
                <TableCell key={d} align="center" sx={{ fontWeight: 600 }}>
                  {d}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {monthMatrix.map((row, rIdx) => (
              <TableRow key={rIdx} sx={{ height: 116 }}>
                {row.map((date, cIdx) => {
                  const inCurrentMonth =
                    date.getMonth() === currentDate.getMonth() &&
                    date.getFullYear() === currentDate.getFullYear();
                  const isToday = isSameDay(date, today);
                  const dayShifts = shiftsForDay(date);
                  return (
                    <TableCell
                      key={`${rIdx}-${cIdx}`}
                      sx={{
                        p: 1,
                        verticalAlign: "top",
                        opacity: inCurrentMonth ? 1 : 0.5,
                        borderRight: cIdx < 6 ? 1 : 0,
                        borderColor: "divider",
                      }}
                    >
                      <DropTargetCell date={date} onDrop={handleDrop}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            color={isToday ? "primary.main" : "text.primary"}
                          >
                            {date.getDate()}
                          </Typography>
                          {isToday && (
                            <Chip
                              size="small"
                              color="primary"
                              label="Today"
                              sx={{ height: 20, fontSize: 10 }}
                            />
                          )}
                        </Box>
                        <Divider sx={{ mb: 0.75 }} />
                        {dayShifts.length === 0 ? (
                          <Typography variant="caption" color="text.disabled">
                            No shifts
                          </Typography>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            {dayShifts.map((shift) =>
                              shift.users?.map((user) => (
                                <DraggableShiftCard
                                  key={shift.id + "-" + user.id}
                                  shift={shift}
                                  user={user}
                                  onEditShift={onEditShift}
                                />
                              ))
                            )}
                          </Box>
                        )}
                      </DropTargetCell>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const YearView = () => {
    const months = Array.from(
      { length: 12 },
      (_, i) => new Date(currentDate.getFullYear(), i, 1)
    );
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
          overflow: "auto",
        }}
      >
        {months.map((monthDate) => {
          const matrix = getMonthMatrix(monthDate);
          const allowedEmployeeIds = new Set(
            filteredEmployees.map((e) => e.id)
          );
          const monthShiftCount = shifts.filter(
            (s) =>
              s.users?.some((user: any) => allowedEmployeeIds.has(user.id)) &&
              isDateInShiftRange(monthDate, s) &&
              !isDateSkipped(monthDate, s)
          ).length;

          return (
            <Card
              key={monthDate.getMonth()}
              variant="outlined"
              sx={{ borderRadius: 2, width: "100%" }}
            >
              <Box
                sx={{
                  p: 1.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  {monthDate.toLocaleDateString("en-US", { month: "long" })}
                </Typography>
                <Chip
                  size="small"
                  color={monthShiftCount > 0 ? "primary" : "default"}
                  label={`${monthShiftCount} shift${
                    monthShiftCount === 1 ? "" : "s"
                  }`}
                />
              </Box>
              <Divider />
              <TableContainer component={Paper} elevation={0}>
                <Table
                  size="small"
                  aria-label={`${monthDate.toLocaleDateString("en-US", {
                    month: "long",
                  })} calendar`}
                >
                  <TableHead>
                    <TableRow>
                      {weekDays.map((d) => (
                        <TableCell
                          key={d}
                          align="center"
                          sx={{ p: 0.5, fontSize: 11, color: "text.secondary" }}
                        >
                          {d}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matrix.map((row, rIdx) => (
                      <TableRow key={rIdx}>
                        {row.map((date, cIdx) => {
                          const inCurrentMonth =
                            date.getMonth() === monthDate.getMonth() &&
                            date.getFullYear() === monthDate.getFullYear();
                          const isToday = isSameDay(date, today);
                          const count = shiftsForDay(date).length;
                          return (
                            <TableCell
                              key={`${rIdx}-${cIdx}`}
                              align="right"
                              sx={{
                                p: 0.5,
                                height: 28,
                                verticalAlign: "top",
                                opacity: inCurrentMonth ? 1 : 0.45,
                                borderRight: cIdx < 6 ? 1 : 0,
                                borderColor: "divider",
                              }}
                            >
                              <DropTargetCell date={date} onDrop={handleDrop}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: 11,
                                      fontWeight: isToday ? 800 : 600,
                                      color: isToday
                                        ? "primary.main"
                                        : "text.secondary",
                                    }}
                                  >
                                    {date.getDate()}
                                  </Typography>
                                  {count > 0 && (
                                    <Box
                                      component="span"
                                      sx={{
                                        ml: 0.5,
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        bgcolor: "primary.main",
                                      }}
                                    />
                                  )}
                                </Box>
                              </DropTargetCell>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          );
        })}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        p: 0,
        height: "100%",
        borderRadius: 2,
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider", mt: 2 }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              aria-label="Previous"
              onClick={() => navigate("prev")}
              size="small"
            >
              <ChevronLeft />
            </IconButton>
            <Button
              variant="outlined"
              onClick={goToToday}
              size="small"
              startIcon={<Today />}
            >
              Today
            </Button>
            <IconButton
              aria-label="Next"
              onClick={() => navigate("next")}
              size="small"
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="primary.main"
              sx={{ textAlign: "center" }}
              aria-live="polite"
              aria-atomic="true"
            >
              {headerTitle}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tabs
              value={view}
              onChange={(_, v) => setView(v)}
              aria-label="Calendar view switch"
              TabIndicatorProps={{ sx: { height: 3 } }}
              sx={{
                "& .MuiTab-root": { textTransform: "none", minHeight: 40 },
                "& .Mui-selected": { fontWeight: 700 },
              }}
            >
              <Tab value="day" label="Day" />
              <Tab value="week" label="Week" />
              <Tab value="month" label="Month" />
              <Tab value="year" label="Year" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, pt: 2, flex: 1, display: "flex", minHeight: 0 }}>
        {view === "day" && <DayView />}
        {view === "week" && <WeekView />}
        {view === "month" && <MonthView />}
        {view === "year" && <YearView />}
      </Box>
    </Card>
  );
}
