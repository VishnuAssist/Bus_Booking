import CommonTable from "../../../Component/CommenTable";
import { useGetStaffCommissionsQuery } from "../../../Api/commisionApi";
import { staffCommissionsTableDataService } from "../services/staffCommissionsTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type { MonthlySummarriesQueryParamsType } from "../../../model/commissionType";
import YearFilter from "../../../Component/Filters/YearFilter";
import MonthFilter from "../../../Component/Filters/MonthFilter";

const StaffCommissionTable = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>();
  const [selectedMonth, setSelectedMonth] = useState<number | null>();

  const queryParams: MonthlySummarriesQueryParamsType = {
    year: selectedYear || undefined,
    month: selectedMonth || undefined,
  };

  const { data: staffCommissions } = useGetStaffCommissionsQuery(queryParams);
  const { columns, rows } = staffCommissionsTableDataService(
    staffCommissions?.items
  );

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: number | null) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <YearFilter
        value={selectedYear || null}
        onChange={handleYearChange}
        label="Select Year"
        showLabel={false}
        // minWidth={150}
      />

      <MonthFilter
        value={selectedMonth || null}
        onChange={handleMonthChange}
        label="Select Month"
        showLabel={false}
        // minWidth={180}
      />

      <CommonTable columns={columns} rows={rows} />
      {staffCommissions?.metaData && (
        <AppPagination
          metaData={staffCommissions?.metaData}
          onPageChange={(page: number) => {
            // Handle pagination if needed
            console.log("Page changed to:", page);
          }}
        />
      )}
    </>
  );
};
export default StaffCommissionTable;
