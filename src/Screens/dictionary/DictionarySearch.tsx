import {
  Box,
  debounce,
  InputAdornment,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import type { QueryParamsType } from "../../model/common";
import type { dictionarycategoryType } from "../../model/Dictionary";


interface Props {
  params: QueryParamsType;
  setParams: (p: Partial<QueryParamsType>) => void;
  categories: dictionarycategoryType[];
}

const DictionarySearch = ({ params, setParams, categories }: Props) => {
  const [searchTerm, setSearchTerm] = useState(params.SearchTerm || "");
  const [selectedCategory, setSelectedCategory] =
    useState<dictionarycategoryType | null>(null);

  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, SearchTerm: event.target.value, PageNumber: 1 });
    },
    500
  );

  return (
    <Box margin={2} sx={{ float: "right", display: "flex", gap: 2 }}>
      <Box sx={{ minWidth: 300 }}>
        <TextField
          id="Search"
          size="small"
          fullWidth
          value={searchTerm}
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

      <Box>
        <Autocomplete
          size="small"
          sx={{ width: 200 }}
          fullWidth
          options={categories || []}
          getOptionLabel={(option) => option?.name || ""}
          value={selectedCategory}
          onChange={(_, newValue) => {
            setSelectedCategory(newValue);
            setParams({
              ...params,
              Category: newValue?.id || "",
              PageNumber: 1,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="outlined" />
          )}
        />
      </Box>
    </Box>
  );
};

export default DictionarySearch;
