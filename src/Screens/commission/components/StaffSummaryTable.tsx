import CommonTable from "../../../Component/CommenTable";
import { useGetMonthlySummarriesQuery } from "../../../Api/commisionApi";
import { staffMonthlySummaryTableDataService } from "../services/staffMonthlySummaryTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type { MonthlySummarriesQueryParamsType } from "../../../model/commissionType";
import StaffCommissionFilter from "./StaffCommissionFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";

const StaffSummaryTable = () => {
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
    if (
      queryParams.year !== newQueryParams.year ||
      queryParams.month !== newQueryParams.month ||
      queryParams.SearchTerm !== newQueryParams.SearchTerm
    ) {
      setQueryParams(newQueryParams);
    }
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

      <CommonTable columns={columns} rows={rows} />
      {monthlySummarries?.metaData && (
        <AppPagination
          metaData={monthlySummarries?.metaData}
          onPageChange={(page: number) =>
            setQueryParams({ ...queryParams, PageNumber: page })
          }
        />
      )}
    </>
  );
};
export default StaffSummaryTable;
