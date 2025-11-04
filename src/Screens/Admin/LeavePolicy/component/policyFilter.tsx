import { Box } from "@mui/material";
import TextFilter from "../../../../Component/Filters/TextFilter";
import type { PolicyQueryParamsType } from "../../../../model/policyType";

interface StaffCommissionFilterProps {
  queryParams: PolicyQueryParamsType;
  onQueryParamsChange: (queryParams: PolicyQueryParamsType) => void;
}

const PolicyFilter = ({
  queryParams,
  onQueryParamsChange,
}: StaffCommissionFilterProps) => {
  //   const handleYearChange = (year: number | null) => {
  //     onQueryParamsChange({
  //       ...queryParams,
  //       year: year || undefined,
  //     });
  //   };

  //   const handleMonthChange = (month: number | null) => {
  //     onQueryParamsChange({
  //       ...queryParams,
  //       month: month || undefined,
  //     });
  //   };

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
      <TextFilter
        searchTerm={queryParams.SearchTerm || ""}
        onSearchChange={handleSearchChange}
        placeholder="Search Term"
        showLabel={false}
      />
    </Box>
  );
};

export default PolicyFilter;
