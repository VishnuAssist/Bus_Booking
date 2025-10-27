import CommonTable from "../../../Component/CommenTable";
import { useGetStaffGroupSummariesQuery } from "../../../Api/commisionApi";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type {
  MonthlySummarriesQueryParamsType,
  StaffGroupSummaryResponseType,
} from "../../../model/commissionType";
import StaffCommissionFilter from "./StaffCommissionFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import { useStaffGroupSummaryTableData } from "../services/staffGroupSummaryTableDataService";
import ResponseViewDrawer from "../../../Component/ResponseViewDrawer";

const StaffGroupSummaryTable = () => {
  const [isResponseDrawerOpen, setResponseDrawerOpen] = useState(false);
  const [selectedStaffGroupSummary, setSelectedStaffGroupSummary] =
    useState<Partial<StaffGroupSummaryResponseType> | null>(null);

  const [queryParams, setQueryParams] =
    useState<MonthlySummarriesQueryParamsType>({
      ...DEFAULT_PAGINATION_OPTIONS,
      PageSize: DEFAULT_PAGINATION_OPTIONS.PageSize || 5,
      year: undefined,
      month: undefined,
    });

  const handleQueryParamsChange = (
    newQueryParams: MonthlySummarriesQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
  };

  const { data: staffGroupSummaries } =
    useGetStaffGroupSummariesQuery(queryParams);
  
  const { columns, rows } = useStaffGroupSummaryTableData(
    staffGroupSummaries?.items
  );

  console.log("columns", columns);
  console.log("rows", rows);

  return (
    <>
      <StaffCommissionFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />

      <CommonTable<any>
        columns={columns}
        rows={rows}
        actions={{
          onView: (row) => {
            setSelectedStaffGroupSummary(row._fullData || row);
            setResponseDrawerOpen(true);
          },
        }}
      />

      {staffGroupSummaries?.metaData && (
        <AppPagination
          metaData={staffGroupSummaries?.metaData}
          onPageChange={(page: number) =>
            setQueryParams({ ...queryParams, PageNumber: page })
          }
        />
      )}

      {selectedStaffGroupSummary && (
        <ResponseViewDrawer<Partial<StaffGroupSummaryResponseType>>
          isOpen={isResponseDrawerOpen}
          onClose={() => setResponseDrawerOpen(false)}
          data={selectedStaffGroupSummary}
          title="Staff Group Summary Response"
        />
      )}
    </>
  );
};

export default StaffGroupSummaryTable;