import CommonTable from "../../../Component/CommenTable";
import { useGetStaffCommissionsQuery } from "../../../Api/commisionApi";
import { staffCommissionsTableDataService } from "../services/staffCommissionsTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type { MonthlySummarriesQueryParamsType } from "../../../model/commissionType";
import StaffCommissionFilter from "./StaffCommissionFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";

const StaffCommissionTable = () => {
  const [queryParams, setQueryParams] =
    useState<MonthlySummarriesQueryParamsType>({
      ...DEFAULT_PAGINATION_OPTIONS,
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

  const { data: staffCommissions } = useGetStaffCommissionsQuery(queryParams);
  const { columns, rows } = staffCommissionsTableDataService(
    staffCommissions?.items
  );

  return (
    <>
      <StaffCommissionFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />

      <CommonTable columns={columns} rows={rows} />

      {staffCommissions?.metaData && (
        <AppPagination
          metaData={staffCommissions?.metaData}
          onPageChange={(page: number) => {
            setQueryParams({ ...queryParams, PageNumber: page });
          }}
        />
      )}
    </>
  );
};
export default StaffCommissionTable;
