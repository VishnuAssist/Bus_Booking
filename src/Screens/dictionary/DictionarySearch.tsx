import {
  Box,
  debounce,
  InputAdornment,
  TextField,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import type { QueryParamsType } from "../../model/common";

interface prop {
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const DictionarySearch = ({ params, setParams }: prop) => {
  const [searchterm, setSearchTerm] = useState(params.SearchTerm);

  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, SearchTerm: event.target.value, PageNumber: 1 });
    },
    500
  );

  return (
    <Box margin={2} sx={{float:"right", display: "flex", gap: 2 }}>
      <Box sx={{ minWidth: 300 }}>
        <InputLabel htmlFor="Search" className="label-bold">
          Search 
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          value={searchterm}
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
          placeholder="Search..."
        />
      </Box>
    </Box>
  );
};

export default DictionarySearch;