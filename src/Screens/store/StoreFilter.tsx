import { Box } from "@mui/material";
import TextFilter from "../../Component/Filters/TextFilter";
import type { MonthlySummarriesQueryParamsType } from "../../model/commissionType";

interface StaffCommissionFilterProps {
  queryParams: MonthlySummarriesQueryParamsType;
  onQueryParamsChange: (queryParams: MonthlySummarriesQueryParamsType) => void;
}

const StoreFilter = ({
  queryParams,
  onQueryParamsChange,
}: StaffCommissionFilterProps) => {

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
        placeholder="Search ID / Name"
        showLabel={false}
      />
    </Box>
  );
};

export default StoreFilter;
