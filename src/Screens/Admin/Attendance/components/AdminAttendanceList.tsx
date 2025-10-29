import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useGetAllAttendanceQuery } from "../../../../Api/AttendanceApi";
import type { attendanceType } from "../../../../model/attendanceType";
import NoDataCard from "../../../../Component/NoDataCard";
import TableSkeleton from "../../../../Component/Skeletons/TableSkeleton";
import { useAppDispatch, useAppSelector } from "../../../../Store/StoreConfig";
import AppPagination from "../../../../Component/AppPagination";
import { setAttendanceParams } from "../../../../Store/slice/ParamsSlice";
import { getAxiosParamsA } from "../../../../Api/util";
import AttendanceSearch from "../../../StaffPortal/Attendence/AttendenceSearch";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CommonDrawer from "./CommonDrawer";
import { useState } from "react";
import EmployeeAttendanceHistory from "./EmployeeAttendanceHistory";

const AdminAttendanceList = () => {
  const dispatch = useAppDispatch();
  const [attedanceHistory, setAttedanceHistory] = useState(false);

  const attendanceParams = useAppSelector(
    (state) => state.auth.Params.AttendanceParams
  );

  const { data: attendanceData, isLoading } = useGetAllAttendanceQuery(
    getAxiosParamsA({ ...attendanceParams, PageSize: 5 })
  );

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <AttendanceSearch
          params={attendanceParams}
          setParams={(p) => dispatch(setAttendanceParams(p))}
        />
        <CardContent>
          {isLoading && <TableSkeleton />}

          {attendanceData?.items?.length === 0 && (
            <NoDataCard
              sx={{ height: "100%", minHeight: 100 }}
              text="No attendance records"
            />
          )}
          {attendanceData?.items && attendanceData?.items?.length > 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Clock Out</TableCell>
                    <TableCell>Shift ID</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData?.items.map((record: attendanceType) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.checkInTime}</TableCell>
                      <TableCell>{record.checkOutTime}</TableCell>
                      <TableCell>{record.shiftId}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setAttedanceHistory(true)}
                        >
                          <VisibilityIcon color="primary" fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
        {attendanceData?.metaData && (
          <AppPagination
            metaData={attendanceData?.metaData}
            onPageChange={(page: number) =>
              dispatch(setAttendanceParams({ PageNumber: page }))
            }
          />
        )}
      </Card>

      <CommonDrawer
        anchor="bottom"
        isOpen={attedanceHistory}
        onClose={() => setAttedanceHistory(false)}
        title="Attendance History"
        children={<EmployeeAttendanceHistory />}
      />
    </>
  );
};

export default AdminAttendanceList;
