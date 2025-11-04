import { Box } from "@mui/material";
import DateFilter from "../../../../Component/Filters/DateFilter";
import TextFilter from "../../../../Component/Filters/TextFilter";

interface StoreTargetFilterProps {
  queryParams: any;
  onQueryParamsChange: (queryParams: any) => void;
}

const StoreTargetFilter = ({
  queryParams,
  onQueryParamsChange,
}: StoreTargetFilterProps) => {


  
  const handleStartDateChange = (StartDate: string | number | null) => {
    onQueryParamsChange({
      ...queryParams,
      StartDate: StartDate || undefined,
    });
  };

  const handleEndDateChange = (EndDate: string | number | null) => {
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
        margin: 1.5,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextFilter
        searchTerm={queryParams.SearchTerm || ""}
        onSearchChange={handleSearchChange}
        placeholder="Search Term"
        showLabel={false}
      />

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

export default StoreTargetFilter;
