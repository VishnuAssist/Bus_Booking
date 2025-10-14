"use client";
import { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";

const employees = [
  { id: "1", name: "John Doe", avatar: "/default-avator.png" },
  { id: "2", name: "Jane Smith", avatar: "/default-avator.png" },
  { id: "3", name: "Mike Johnson", avatar: "/default-avator.png" },
  { id: "4", name: "Sarah Wilson", avatar: "/default-avator.png" },
];

const shifts = [
  {
    id: "1",
    title: "Morning Shift",
    start: new Date(),
    end: new Date(Date.now() + 8 * 60 * 60 * 1000),
    employeeId: "1",
    name: "John Doe",
    location: "Downtown Office",
  },
  {
    id: "2",
    title: "Evening Shift",
    start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 32 * 60 * 60 * 1000),
    employeeId: "2",
    name: "Sarah Wilson",
    location: "Warehouse",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const rightPaneRef = useRef<HTMLDivElement | null>(null);

  const handleRightScroll = () => {
    if (leftPaneRef.current && rightPaneRef.current)
      leftPaneRef.current.scrollTop = rightPaneRef.current.scrollTop;
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      week.push(d);
    }
    return week;
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());
  const weekDates = getWeekDates(currentDate);

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentWeekRange = `${weekDates[0].toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${weekDates[6].toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        p: 2,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <IconButton onClick={() => navigateWeek("prev")} size="small">
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
            <IconButton onClick={() => navigateWeek("next")} size="small">
              <ChevronRight />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            fontWeight={600}
            color="primary.main"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            {currentWeekRange}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box
          ref={rightPaneRef}
          onScroll={handleRightScroll}
          sx={{ flex: 1, overflow: "auto" }}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {weekDates.map((date, i) => {
                    const isToday =
                      date.toDateString() === new Date().toDateString();
                    return (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{
                          minWidth: 120,
                          bgcolor: "background.paper",
                          borderBottom: 2,
                          borderColor: isToday ? "primary.main" : "divider",
                          py: 1.5,
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
                          <Typography variant="body2" fontWeight={600}>
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
                  <TableRow key={emp.id} sx={{ height: 80 }}>
                    {weekDates.map((date, j) => {
                      const empShifts = shifts.filter(
                        (s) =>
                          s.employeeId === emp.id &&
                          new Date(s.start).toDateString() ===
                            date.toDateString()
                      );
                      return (
                        <TableCell
                          key={j}
                          sx={{
                            p: 0.5,
                            borderRight: j < 6 ? 1 : 0,
                            borderColor: "divider",
                          }}
                        >
                          {empShifts.map((shift) => (
                            <Card
                              key={shift.id}
                              sx={{
                                color: "white",
                                p: 0.5,
                                mb: 0.5,
                                borderRadius: 1,
                              }}
                            >
                              <CardContent
                                sx={{ p: 0.5, "&:last-child": { pb: 0.5 } }}
                              >
                                <Typography
                                  variant="caption"
                                   color="primary.main"
                                  fontWeight={600}
                                >
                                  {shift.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                   color="primary.main"
                                  display="block"
                                >
                                  {shift.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                   color="primary.main"
                                  sx={{ opacity: 0.8 }}
                                >
                                  {new Date(shift.start).toLocaleTimeString(
                                    "en-US",
                                    { hour: "numeric", minute: "2-digit" }
                                  )}{" "}
                                  -{" "}
                                  {new Date(shift.end).toLocaleTimeString(
                                    "en-US",
                                    { hour: "numeric", minute: "2-digit" }
                                  )}
                                </Typography>
                              </CardContent>
                            </Card>
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
    </Card>
  );
}
