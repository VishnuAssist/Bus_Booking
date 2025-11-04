import { Card, CardContent } from "@mui/material";
import { useGetAllAttendanceQuery } from "../../../../Api/AttendanceApi";
import type { AttendanceType } from "../../../../model/attendanceType";
import NoDataCard from "../../../../Component/NoDataCard";
import TableSkeleton from "../../../../Component/Skeletons/TableSkeleton";
import AppPagination from "../../../../Component/AppPagination";

import CommonDrawer from "./CommonDrawer";
import { useState } from "react";
import EmployeeAttendanceHistory from "./EmployeeAttendanceHistory";
import CommonTable from "../../../../Component/CommenTable";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../../Constant/defaultValues";
import { adminAttendanceTableDataService } from "../service/adminAttendanceTableDataService";
import type { AttendanceQueryParamsType } from "../../../../model/attendanceType";
import AttendenceFilterAdmin from "./AttendenceFilterAdmin";

const CurrentLoginUserList = () => {
  const [attedanceHistory, setAttedanceHistory] = useState(false);

  const [queryParams, setQueryParams] = useState<AttendanceQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
  });

  const handleQueryParamsChange = (
    newQueryParams: AttendanceQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
  };

  const { data: attendanceData, isLoading } =
    useGetAllAttendanceQuery(queryParams);

  const { columns, rows } = adminAttendanceTableDataService(
    attendanceData?.items || []
  );

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <AttendenceFilterAdmin
          queryParams={queryParams}
          onQueryParamsChange={handleQueryParamsChange}
        />
        <CardContent>
          {isLoading && <TableSkeleton />}

          <CommonTable<AttendanceType>
            columns={columns}
            rows={rows}
            actions={{
              onView: () => {
                setAttedanceHistory(true);
              },
            }}
          />
          {attendanceData?.items?.length === 0 && (
            <NoDataCard
              sx={{ height: "100%", minHeight: 100, mt: 2 }}
              text="No attendance records"
            />
          )}
        </CardContent>
        {attendanceData?.metaData && (
          <AppPagination
            metaData={attendanceData?.metaData}
            onPageChange={(page: number) =>
              setQueryParams({ ...queryParams, PageNumber: page })
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

export default CurrentLoginUserList;
