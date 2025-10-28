import { Box } from "@mui/material";
import TextFilter from "../../Component/Filters/TextFilter";
import YearFilter from "../../Component/Filters/YearFilter";
import MonthFilter from "../../Component/Filters/MonthFilter";
import type {
  MonthlySummarriesQueryParamsType,
  ShiftQueryParamsType,
} from "../../model/commissionType";
import DateFilter from "../../Component/Filters/DateFilter";

interface StaffCommissionFilterProps {
  queryParams: ShiftQueryParamsType;
  onQueryParamsChange: (queryParams: ShiftQueryParamsType) => void;
}

const ShiftFilter = ({
  queryParams,
  onQueryParamsChange,
}: StaffCommissionFilterProps) => {
  const handleStartDateChange = (StartDate: number | null) => {
    onQueryParamsChange({
      ...queryParams,
      StartDate: StartDate || undefined,
    });
  };

  const handleEndDateChange = (EndDate: number | null) => {
    onQueryParamsChange({
      ...queryParams,
      EndDate: EndDate || undefined,
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onQueryParamsChange({
      ...queryParams,
      SearchTerm: searchTerm || undefined,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        margin: 2,
      }}
    >
      {/* <TextFilter
        searchTerm={queryParams.SearchTerm || ""}
        onSearchChange={handleSearchChange}
        placeholder="Search Term"
        showLabel={false}
      /> */}

      <DateFilter
        value={queryParams.StartDate || null}
        onChange={handleStartDateChange}
        label="Start Date"
        showLabel={false}
        minWidth={150}
      />

      <DateFilter
        value={queryParams.EndDate || null}
        onChange={handleEndDateChange}
        label="End Date"
        showLabel={false}
        minWidth={180}
      />
    </Box>
  );
};

export default ShiftFilter;
