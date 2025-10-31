import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import CommonDrawer from "../Attendance/components/CommonDrawer";
import RequestView from "./RequestView";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useState } from "react";
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserLeaveList = () => {
  const [leaveRequest, setLeaveRequest] = useState(false);

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Approved Time Off"
          subtitle="Track your earnings and performance"
          icon={<AccessTimeOutlinedIcon />}
          btntitle="Add Time Off"
          icon2={<AccessTimeOutlinedIcon />}
          btntitle2="Pending Requests"
          onActionClick2={() => setLeaveRequest(true)}
        />
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Approved</TableCell>
                    <TableCell>Remaining Balance </TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {attendanceData?.items.map((record: attendanceType) => ( */}
                  <TableRow key="1">
                    <TableCell>John Doe</TableCell>
                    <TableCell>100.00 Hours</TableCell>
                    <TableCell>196.00 hrs</TableCell>

                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setLeaveRequest(true)}
                      >
                        <VisibilityIcon color="primary" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>John Doe</TableCell>
                    <TableCell>100.00 Hours</TableCell>
                    <TableCell>196.00 hrs</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setLeaveRequest(true)}
                      >
                        <VisibilityIcon color="primary" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>John Doe</TableCell>
                    <TableCell>100.00 Hours</TableCell>
                    <TableCell>196.00 hrs</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setLeaveRequest(true)}
                      >
                        <VisibilityIcon color="primary" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>John Doe</TableCell>
                    <TableCell>100.00 Hours</TableCell>
                    <TableCell>196.00 hrs</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setLeaveRequest(true)}
                      >
                        <VisibilityIcon color="primary" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>John Doe</TableCell>
                    <TableCell>100.00 Hours</TableCell>
                    <TableCell>196.00 hrs</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setLeaveRequest(true)}
                      >
                        <VisibilityIcon color="primary" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </CommisionContainer>

      <CommonDrawer
        anchor="bottom"
        isOpen={leaveRequest}
        onClose={() => setLeaveRequest(false)}
        title="Attendance Request List"
        children={<RequestView />}
      />
    </>
  );
};

export default UserLeaveList;
