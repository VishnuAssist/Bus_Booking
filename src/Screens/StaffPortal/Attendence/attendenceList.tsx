import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Typography } from "@mui/material";
import { useGetAllAttendanceQuery } from "../../../Api/AttendanceApi"; 
import type { attendanceType } from "../../../model/attendanceType";
import NoDataCard from "../../../Component/NoDataCard";
import TableSkeleton from "../../../Component/Skeletons/TableSkeleton";

const AttendanceList = () => {
  const { data, isLoading } = useGetAllAttendanceQuery({}); 
console.log("attendance",data)
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        {isLoading &&
        <TableSkeleton/>}
        
        
        {data?.items?.length === 0 && <NoDataCard sx={{ height: "100%", minHeight: 100 ,}} text="No attendance records"/>}
        { data?.items && data?.items?.length > 0 && (
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
                {data?.items.map((record: attendanceType) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                    <TableCell>{record.shiftId}</TableCell>
                    <TableCell>{record.notes}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
      </CardContent>
    </Card>
  );
};

export default AttendanceList;