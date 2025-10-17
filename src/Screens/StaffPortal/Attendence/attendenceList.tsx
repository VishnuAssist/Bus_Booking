import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";

interface AttendanceRecord {
  id: number;
  clockIn: string;
  clockOut: string;
  shiftId: string;
  note: string;
  date: string;
}


const dummyRecords: AttendanceRecord[] = [
  {
    id: 1,
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    shiftId: "Shift-101",
    note: "Morning shift",
    date: "2025-10-03",
  },
  {
    id: 2,
    clockIn: "10:00 AM",
    clockOut: "07:00 PM",
    shiftId: "Shift-102",
    note: "Late shift",
    date: "2025-10-04",
  },
  {
    id: 3,
    clockIn: "10:00 AM",
    clockOut: "07:00 PM",
    shiftId: "Shift-103",
    note: "mide shift",
    date: "2025-10-05",
  },

];

const AttendanceList = () => {
  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Clock In</TableCell>
                  <TableCell>Clock Out</TableCell>
                  <TableCell>Shift ID</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.clockIn}</TableCell>
                    <TableCell>{record.clockOut}</TableCell>
                    <TableCell>{record.shiftId}</TableCell>
                    <TableCell>{record.note}</TableCell>
                    <TableCell>{record.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default AttendanceList;
