import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import { History } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface AttendanceRecord {
  date: string;
  dayOfWeek: string;
  type: string;
  job: string;
  start: string;
  end: string;
  totalHours: string;
  dailyTotal: string;
  weeklyTotal?: string;
}

const EmployeeAttendanceHistory = () => {
  // Sample data based on the image
  const attendanceData: (
    | AttendanceRecord
    | { isWeekSeparator: boolean; weekRange: string }
  )[] = [
    // Week 1: Oct 27 - Oct 31
    { isWeekSeparator: true, weekRange: "Oct 27 - Oct 31" },
    {
      date: "31/10",
      dayOfWeek: "Fri",
      type: "Shift",
      job: "Select",
      start: "--",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },
    {
      date: "30/10",
      dayOfWeek: "Thu",
      type: "Shift",
      job: "Select",
      start: "09:30",
      end: "19:46",
      totalHours: "10:04",
      dailyTotal: "10:04",
    },
    {
      date: "29/10",
      dayOfWeek: "Wed",
      type: "Shift",
      job: "Select",
      start: "09:52",
      end: "20:31",
      totalHours: "11:01",
      dailyTotal: "11:01",
      weeklyTotal: "11:01",
    },
    {
      date: "28/10",
      dayOfWeek: "Tue",
      type: "Shift",
      job: "The Zo...",
      start: "09:42",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },
    {
      date: "27/10",
      dayOfWeek: "Mon",
      type: "Shift",
      job: "The Zo...",
      start: "--",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },

    // Week 2: Oct 20 - Oct 26
    { isWeekSeparator: true, weekRange: "Oct 20 - Oct 26" },
    {
      date: "26/10",
      dayOfWeek: "Sun",
      type: "Shift",
      job: "Select",
      start: "--",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },
    {
      date: "25/10",
      dayOfWeek: "Sat",
      type: "Shift",
      job: "Select",
      start: "--",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },
    {
      date: "24/10",
      dayOfWeek: "Fri",
      type: "Shift",
      job: "The Zo...",
      start: "--",
      end: "--",
      totalHours: "--",
      dailyTotal: "--",
    },
  ];

  const formatDate = (date: string, dayOfWeek: string) => {
    return `${dayOfWeek} ${date}`;
  };
  const isDarkMode = useTheme().palette.mode === "dark";

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={isDarkMode ? { bgcolor: "" } : { bgcolor: "grey.100" }}>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Total hours</TableCell>
            <TableCell>Daily total</TableCell>
            <TableCell>Weekly total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((record, index) => {
            if ("isWeekSeparator" in record && record.isWeekSeparator) {
              return (
                <TableRow
                  key={`week-${index}`}
                  sx={isDarkMode ? { bgcolor: "" } : { bgcolor: "grey.100" }}
                >
                  <TableCell
                    colSpan={8}
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {record.weekRange}
                  </TableCell>
                </TableRow>
              );
            }

            const rowData = record as AttendanceRecord;
            return (
              <TableRow
                key={`row-${index}`}
                sx={{
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <TableCell>
                  {formatDate(rowData.date, rowData.dayOfWeek)}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <History fontSize="small" color="action" />
                    <Typography>{rowData.type}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {rowData.job === "Select" ? (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Select
                    </Button>
                  ) : (
                    <Chip
                      label={rowData.job}
                      size="small"
                      color="primary"
                      sx={{
                        height: 24,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {rowData.start}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">{rowData.end}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {rowData.totalHours}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: rowData.dailyTotal !== "--" ? 500 : 400,
                    }}
                  >
                    {rowData.dailyTotal}
                  </Typography>
                </TableCell>
                <TableCell>
                  {rowData.weeklyTotal ? (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography>{rowData.weeklyTotal}</Typography>
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Typography color="text.secondary">
                      {rowData.weeklyTotal || "--"}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EmployeeAttendanceHistory;
