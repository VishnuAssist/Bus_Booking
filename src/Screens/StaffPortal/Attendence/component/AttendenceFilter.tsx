import { Box, TextField, debounce } from "@mui/material";

import type { QueryParamsType } from "../../../../model/common";
import { useState } from "react";

interface Props {
  params: QueryParamsType;
  setParams: (p: Partial<QueryParamsType>) => void;
}

const AttendenceFilter = ({ params, setParams }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchDebounce = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("value", event.target.value);

      setParams({ ...params, SearchTerm: searchTerm, PageNumber: 1 });
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
          value={params?.StartDate || ""}
          onChange={(e) => {
            setParams({ ...params, StartDate: e.target.value, PageNumber: 1 });
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
          value={params?.EndDate || ""}
          inputProps={{
            min: params?.StartDate,
          }}
          onChange={(e) => {
            setParams({ ...params, EndDate: e.target.value, PageNumber: 1 });
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendenceFilter;
