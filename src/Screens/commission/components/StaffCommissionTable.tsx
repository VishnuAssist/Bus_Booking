import CommonTable from "../../../Component/CommenTable";
import { useGetStaffCommissionsQuery } from "../../../Api/commisionApi";
import { staffCommissionsTableDataService } from "../services/staffCommissionsTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type {
  MonthlySummarriesQueryParamsType,
  StaffCommissionResponseType,
} from "../../../model/commissionType";
import StaffCommissionFilter from "./StaffCommissionFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import ResponseViewDrawer from "../../../Component/ResponseViewDrawer";
import { StaffCommissionFormFields } from "../../../feilds_validation/staffCommissionFields_validation";

const StaffCommissionTable = () => {
  const [isResponseDrawerOpen, setResponseDrawerOpen] = useState(false);
  const [selectedStaffCommission, setSelectedStaffCommission] =
    useState<StaffCommissionResponseType | null>(null);

  const [queryParams, setQueryParams] =
    useState<MonthlySummarriesQueryParamsType>({
      ...DEFAULT_PAGINATION_OPTIONS,
      year: undefined,
      month: undefined,
    });

  const handleQueryParamsChange = (
    newQueryParams: MonthlySummarriesQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
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

      <CommonTable<StaffCommissionResponseType>
        columns={columns}
        rows={rows}
        actions={{
          onView: (row) => {
            setSelectedStaffCommission(row);
            setResponseDrawerOpen(true);
          },
        }}
      />

      {staffCommissions?.metaData && (
        <AppPagination
          metaData={staffCommissions?.metaData}
          onPageChange={(page: number) => {
            setQueryParams({ ...queryParams, PageNumber: page });
          }}
        />
      )}

      {selectedStaffCommission && (
        <ResponseViewDrawer<Partial<StaffCommissionResponseType>>
          isOpen={isResponseDrawerOpen}
          onClose={() => setResponseDrawerOpen(false)}
          data={selectedStaffCommission}
          title="Staff Commission Response"
          formFields={StaffCommissionFormFields}
        />
      )}
    </>
  );
};
export default StaffCommissionTable;
