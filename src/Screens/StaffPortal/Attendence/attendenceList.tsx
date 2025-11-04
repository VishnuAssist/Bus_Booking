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
import { useGetAllAttendanceQuery } from "../../../Api/AttendanceApi";
import NoDataCard from "../../../Component/NoDataCard";
import TableSkeleton from "../../../Component/Skeletons/TableSkeleton";
import { useAppDispatch, useAppSelector } from "../../../Store/StoreConfig";
import AppPagination from "../../../Component/AppPagination";
import { setAttendanceParams } from "../../../Store/slice/ParamsSlice";
import { getAxiosParamsA } from "../../../Api/util";
import AttendenceFilter from "./component/AttendenceFilter";
import type { AttendanceType } from "../../../model/attendanceType";

const AttendanceList = () => {
  const dispatch = useAppDispatch();

  const attendanceParams = useAppSelector(
    (state) => state.auth.Params.AttendanceParams
  );

  const { data: attendanceData, isLoading } = useGetAllAttendanceQuery(
    getAxiosParamsA({ ...attendanceParams, PageSize: 5 })
  );
  console.log("attendance", attendanceData);

  return (
    <Card sx={{ height: "100%" }}>
      <AttendenceFilter
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
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData?.items.map((record: AttendanceType) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                    <TableCell>{record.notes}</TableCell>
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
  );
};

export default AttendanceList;
