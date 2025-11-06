import CommonTable from "../../../Component/CommenTable";
import { useGetMonthlySummarriesQuery } from "../../../Api/commisionApi";
import { staffMonthlySummaryTableDataService } from "../services/staffMonthlySummaryTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type {
  MonthlySummarriesQueryParamsType,
  StaffMonthlySummaryResponseType,
} from "../../../model/commissionType";
import StaffCommissionFilter from "./StaffCommissionFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import ResponseViewDrawer from "../../../Component/ResponseViewDrawer";

const StaffSummaryTable = () => {
  const [isResponseDrawerOpen, setResponseDrawerOpen] = useState(false);
  const [selectedStaffSummary, setSelectedStaffSummary] =
    useState<StaffMonthlySummaryResponseType | null>(null);

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

  const { data: monthlySummarries } = useGetMonthlySummarriesQuery(queryParams);
  const { columns, rows } = staffMonthlySummaryTableDataService(
    monthlySummarries?.items
  );

  return (
    <>
      <StaffCommissionFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />

      <CommonTable<StaffMonthlySummaryResponseType>
        columns={columns}
        rows={rows}
        actions={{
          onView: (row) => {
            setSelectedStaffSummary(row);
            setResponseDrawerOpen(true);
          },
        }}
      />

      {monthlySummarries?.metaData && (
        <AppPagination
          metaData={monthlySummarries?.metaData}
          onPageChange={(page: number) =>
            setQueryParams({ ...queryParams, PageNumber: page })
          }
        />
      )}

      {selectedStaffSummary && (
        <ResponseViewDrawer<Partial<StaffMonthlySummaryResponseType>>
          isOpen={isResponseDrawerOpen}
          onClose={() => setResponseDrawerOpen(false)}
          data={selectedStaffSummary}
          title="Staff Summary Response"
        />
      )}
    </>
  );
};
export default StaffSummaryTable;
