import { Box } from "@mui/material";
import type {
  ShiftRequestQueryParamsType,
  ShiftRequestType,
} from "../../../../model/shiftType";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../../Constant/defaultValues";
import { useState } from "react";
import { shiftRequestTableDataService } from "../service/shiftRequestTableDataService";
import AppPagination from "../../../../Component/AppPagination";
import CommonTable from "../../../../Component/CommenTable";
import NoDataCard from "../../../../Component/NoDataCard";
import TableSkeleton from "../../../../Component/Skeletons/TableSkeleton";
import AttendanceFilter from "../../../StaffPortal/Attendence/component/AttendenceFilter";
import { useGetallshiftQuery } from "../../../../Api/shiftApi";

const ShiftRequestList = () => {
  const [queryParams, setQueryParams] = useState<ShiftRequestQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
  });
  const [shiftRequestHistory, setShiftRequestHistory] = useState(false);
  const handleQueryParamsChange = (
    newQueryParams: ShiftRequestQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
  };

  const { data: shiftRequestData, isLoading } =
    useGetallshiftQuery(queryParams);

  const { columns, rows } = shiftRequestTableDataService(
    shiftRequestData?.items || []
  );

   const handleApprove = (row: ShiftRequestType) => {
    
    };
  
    const handleReject = (row: ShiftRequestType) => {
     
    };

  return (
    <>
      <AttendanceFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />
      <Box>
        {isLoading && <TableSkeleton />}

        <CommonTable<ShiftRequestType>
          columns={columns}
          rows={rows}
           approval={{
            onConform: (row) => handleApprove(row),
            onReject: (row) => handleReject(row),
          }}
        />

       {shiftRequestData?.items?.length === 0 && (
          <NoDataCard
            sx={{ height: "100%", minHeight: 100, mt:2 }}
            text="No shift request records"
          />
        )}
      </Box>
      {shiftRequestData?.metaData && (
        <AppPagination
          metaData={shiftRequestData?.metaData}
          onPageChange={(page: number) =>
            setQueryParams({ ...queryParams, PageNumber: page })
          }
        />
      )}
    </>
  );
};
export default ShiftRequestList;
