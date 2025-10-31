import { Box, TextField, debounce } from "@mui/material";
import { useState } from "react";
import type { AttendanceQueryParamsType } from "../../../../model/attendanceType";

interface Props {
  queryParams: AttendanceQueryParamsType;
  onQueryParamsChange: (queryParams: AttendanceQueryParamsType) => void;
}

const AttendenceFilter = ({ queryParams, onQueryParamsChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchDebounce = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("value", event.target.value);

      onQueryParamsChange({
        ...queryParams,
        SearchTerm: searchTerm,
        PageNumber: 1,
      });
    },
    500
  );

  return (
    <Box margin={2} sx={{ float: "right", display: "flex", gap: 2 }}>
      <Box>
        <TextField
          size="small"
          placeholder="Search..."
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
            searchDebounce(event);
          }}
        />
      </Box>
      <Box>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          placeholder="Start Date"
          value={queryParams?.StartDate || ""}
          onChange={(e) => {
            onQueryParamsChange({
              ...queryParams,
              StartDate: e.target.value,
              PageNumber: 1,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          placeholder="End Date"
          value={queryParams?.EndDate || ""}
          inputProps={{
            min: queryParams?.StartDate,
          }}
          onChange={(e) => {
            onQueryParamsChange({
              ...queryParams,
              EndDate: e.target.value,
              PageNumber: 1,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendenceFilter;
