import CommonTable from "../../../Component/CommenTable";
import { useGetStaffGroupSummariesQuery } from "../../../Api/commisionApi";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type {
  MonthlySummarriesQueryParamsType,
  StaffGroupSummaryResponseType,
  StaffGroupSummaryRowType,
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

  // Get unique groups from rows
  const uniqueGroups = Array.from(new Set(rows.map((row) => row.groupName)));

  return (
    <>
      <StaffCommissionFilter
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />
      {uniqueGroups.map((groupName, index) => (
        <div key={`${groupName}-${index}`} style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 500,
              padding: "0.5rem 1rem",
              textTransform: "uppercase",
            }}
          >
            {groupName}
          </div>

          <CommonTable<StaffGroupSummaryRowType>
            columns={columns}
            rows={rows.filter((row) => row.groupName === groupName)}
            actions={{
              onView: (row) => {
                setSelectedStaffGroupSummary(row);
                setResponseDrawerOpen(true);
              },
            }}
          />
        </div>
      ))}

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
