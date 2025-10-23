import { Box } from "@mui/material";
import TextFilter from "../../../Component/Filters/TextFilter";
import YearFilter from "../../../Component/Filters/YearFilter";
import MonthFilter from "../../../Component/Filters/MonthFilter";
import type { StoreTargetQueryParamsType } from "../../../model/storeTargetType";

interface StoreTargetFilterProps {
  queryParams: StoreTargetQueryParamsType;
  onQueryParamsChange: (queryParams: StoreTargetQueryParamsType) => void;
}

const StoreTargetFilter = ({
  queryParams,
  onQueryParamsChange,
}: StoreTargetFilterProps) => {
  const handleYearChange = (year: number | null) => {
    onQueryParamsChange({
      ...queryParams,
      year: year || undefined,
    });
  };

  const handleMonthChange = (month: number | null) => {
    onQueryParamsChange({
      ...queryParams,
      month: month || undefined,
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
      }}
    >
      <TextFilter
        searchTerm={queryParams.SearchTerm || ""}
        onSearchChange={handleSearchChange}
        placeholder="Search Term"
        showLabel={false}
      />

      <YearFilter
        value={queryParams.year || null}
        onChange={handleYearChange}
        label="Select Year"
        showLabel={false}
        minWidth={150}
      />

      <MonthFilter
        value={queryParams.month || null}
        onChange={handleMonthChange}
        label="Select Month"
        showLabel={false}
        minWidth={180}
      />
    </Box>
  );
};

export default StoreTargetFilter;
