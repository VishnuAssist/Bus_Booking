import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  InputLabel,
  debounce,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import type { QueryParamsType } from "../../model/common";

interface Props {
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const UserGroupSearch: React.FC<Props> = ({ params, setParams }) => {
  const [searchTerm, setSearchTerm] = useState(params.SearchTerm ?? "");

  // Debounced search to avoid frequent API calls
  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams({
        ...params,
        SearchTerm: event.target.value,
        PageNumber: 1, // reset pagination on search
      });
    },
    500
  );

  return (
    <Box
      margin={2}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box width={{ xs: "100%", sm: 300 }}>
        <InputLabel htmlFor="Search" className="label-bold" sx={{ mb: 0.5 }}>
          Search
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          value={searchTerm}
          placeholder="Search user groups..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
            debouncedSearch(event);
          }}
        />
      </Box>
    </Box>
  );
};

export default UserGroupSearch;
