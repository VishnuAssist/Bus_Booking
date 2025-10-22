import CommonTable from "../../../Component/CommenTable";
import { useGetMonthlySummarriesQuery } from "../../../Api/commisionApi";
import { staffMonthlySummaryTableDataService } from "../services/staffMonthlySummaryTableDataService";
import AppPagination from "../../../Component/AppPagination";
import { useState } from "react";
import type { QueryParamsType } from "../../../Dto/formDto";
import type { MonthlySummarriesQueryParamsType } from "../../../model/commissionType";
import MonthFilter from "../../../Component/Filters/MonthFilter";
import YearFilter from "../../../Component/Filters/YearFilter";

const StaffSummaryTable = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>();
  const [selectedMonth, setSelectedMonth] = useState<number | null>();
  const [params, setParams] = useState<QueryParamsType>({});

  const queryParams: MonthlySummarriesQueryParamsType = {
    year: selectedYear || undefined,
    month: selectedMonth || undefined,
  };
  const { data: monthlySummarries } = useGetMonthlySummarriesQuery(queryParams);
  const { columns, rows } = staffMonthlySummaryTableDataService(
    monthlySummarries?.items
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
      {monthlySummarries?.metaData && (
        <AppPagination
          metaData={monthlySummarries?.metaData}
          onPageChange={(page: number) =>
            setParams({ ...params, PageNumber: page })
          }
        />
      )}
    </>
  );
};
export default StaffSummaryTable;
