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

interface CalendarViewProps {
  shifts: any[];
  onEditShift?: (shift: any) => void;
}

type ViewMode = "week" | "month" | "year";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const employees = [
  { id: "1", name: "John Doe", avatar: "/default-avator.png" },
  { id: "2", name: "Jane Smith", avatar: "/default-avator.png" },
  { id: "3", name: "Mike Johnson", avatar: "/default-avator.png" },
  { id: "4", name: "Sarah Wilson", avatar: "/default-avator.png" },
];

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
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewMode>("week");
  const [searchTerm, setSearchTerm] = useState("");

  const rightPaneRef = useRef<HTMLDivElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);

  const filteredEmployees = useMemo(
    () =>
      employees.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
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

  const handleRightScroll = () => {
    if (leftPaneRef.current && rightPaneRef.current) {
      leftPaneRef.current.scrollTop = rightPaneRef.current.scrollTop;
    }
  };

  const shiftsForDay = (date: Date) => {
    const allowedEmployeeIds = new Set(filteredEmployees.map((e) => e.id));
    return shifts.filter(
      (s) =>
        allowedEmployeeIds.has(s.employeeId) &&
        isSameDay(new Date(s.start), date)
    );
  };

  const WeekView = () => (
    <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <Box
        ref={rightPaneRef}
        onScroll={handleRightScroll}
        sx={{ flex: 1, overflow: "auto" }}
      >
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
                    const empShifts = shifts.filter(
                      (s) =>
                        s.employeeId === emp.id &&
                        isSameDay(new Date(s.start), date)
                    );
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
                        {empShifts.length === 0 ? (
                          <Typography variant="caption" color="text.disabled">
                            No shift
                          </Typography>
                        ) : (
                          empShifts.map((shift) => (
                            <Card
                              key={shift.id}
                              variant="outlined"
                              onClick={() =>
                                onEditShift?.(shift.original || shift)
                              }
                              sx={{
                                mb: 0.75,
                                borderRadius: 1.5,
                                cursor: "pointer",
                                transition: "0.2s",
                                "&:hover": {
                                  boxShadow: 3,
                                  transform: "scale(1.02)",
                                },
                              }}
                            >
                              <CardContent
                                sx={{ p: 1.0, "&:last-child": { pb: 1.0 } }}
                              >
                                <Typography
                                  variant="caption"
                                  fontWeight={700}
                                  sx={{ color: "primary.main" }}
                                >
                                  {shift.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{ opacity: 0.95, color: "primary.main" }}
                                >
                                  {shift.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ opacity: 0.85, color: "primary.main" }}
                                >
                                  {shift.startTime} - {shift.endTime}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))
                        )}
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
                          {dayShifts.map((s) => (
                            <Card
                              key={s.id}
                              variant="outlined"
                              onClick={() => onEditShift?.(s.original || s)}
                              sx={{
                                borderRadius: 1.25,
                                cursor: "pointer",
                                transition: "0.2s",
                                "&:hover": {
                                  boxShadow: 3,
                                  transform: "scale(1.02)",
                                },
                              }}
                            >
                              <CardContent sx={{ p: 0.75 }}>
                                <Typography
                                  variant="caption"
                                  fontWeight={700}
                                  color="text.primary"
                                >
                                  {s.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  color="text.secondary"
                                >
                                  {s.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(s.start).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "numeric",
                                      minute: "2-digit",
                                    }
                                  )}{" "}
                                  -{" "}
                                  {new Date(s.end).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>
                      )}
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
              allowedEmployeeIds.has(s.employeeId) &&
              new Date(s.start).getFullYear() === monthDate.getFullYear() &&
              new Date(s.start).getMonth() === monthDate.getMonth()
          ).length;

          return (
            <Card
              key={monthDate.getMonth()}
              variant="outlined"
              sx={{ borderRadius: 2 }}
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
        height: "100%",
        overflow: "hidden",
        p: 0,
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
              <Tab value="week" label="Week" />
              <Tab value="month" label="Month" />
              <Tab value="year" label="Year" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, pt: 2, flex: 1, display: "flex", minHeight: 0 }}>
        {view === "week" && <WeekView />}
        {view === "month" && <MonthView />}
        {view === "year" && <YearView />}
      </Box>
    </Card>
  );
}
