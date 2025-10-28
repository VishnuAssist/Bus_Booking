import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
} from "@mui/material";

const AttendanceRequestList = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {attendanceData?.items.map((record: attendanceType) => ( */}
          <TableRow key="1">
            <TableCell>John Doe</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason for shift request</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <ButtonGroup variant="contained" size="small">
                <Button variant="contained" color="primary" size="small">
                  Approve
                </Button>
                <Button variant="contained" color="error" size="small">
                  Reject
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>John Doe</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason for shift request</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <ButtonGroup variant="contained" size="small">
                <Button variant="contained" color="primary" size="small">
                  Approve
                </Button>
                <Button variant="contained" color="error" size="small">
                  Reject
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>John Doe</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason for shift request</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <ButtonGroup variant="contained" size="small">
                <Button variant="contained" color="primary" size="small">
                  Approve
                </Button>
                <Button variant="contained" color="error" size="small">
                  Reject
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>John Doe</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason for shift request</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <ButtonGroup variant="contained" size="small">
                <Button variant="contained" color="primary" size="small">
                  Approve
                </Button>
                <Button variant="contained" color="error" size="small">
                  Reject
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>John Doe</TableCell>
            <TableCell>Shift Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Reason for shift request</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <ButtonGroup variant="contained" size="small">
                <Button variant="contained" color="primary" size="small">
                  Approve
                </Button>
                <Button variant="contained" color="error" size="small">
                  Reject
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AttendanceRequestList;
