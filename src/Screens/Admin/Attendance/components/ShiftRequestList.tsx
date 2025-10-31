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

  return (
    <>
      <AttendanceFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />
      <Box>
        {isLoading && <TableSkeleton />}

        {shiftRequestData?.items?.length === 0 && (
          <NoDataCard
            sx={{ height: "100%", minHeight: 100 }}
            text="No shift request records"
          />
        )}

        <CommonTable<ShiftRequestType>
          columns={columns}
          rows={rows}
          // actions={{
          //   onView: () => {
          //     setShiftRequestHistory(true);
          //   },
          // }}

          // <TableCell>
          //       <ButtonGroup variant="contained" size="small">
          //         <Button variant="contained" color="primary" size="small">
          //           Approve
          //         </Button>
          //         <Button variant="contained" color="error" size="small">
          //           Reject
          //         </Button>
          //       </ButtonGroup>
          //     </TableCell>
        />
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
