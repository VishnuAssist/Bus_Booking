import { Autocomplete, Box, TextField } from "@mui/material";
import TextFilter from "../../../Component/Filters/TextFilter";

import type {
  dictionarycategoryType,
  DictionaryQueryParamsType,
} from "../../../model/Dictionary";

import { useState } from "react";

interface DictionaryFilterProps {
  params: DictionaryQueryParamsType;
  onQueryParamsChange: (queryParams: DictionaryQueryParamsType) => void;
  categories: dictionarycategoryType[];
}

const DictionaryFilter = ({
  params,
  onQueryParamsChange,
  categories,
}: DictionaryFilterProps) => {
  const handleSearchChange = (searchTerm: string) => {
    onQueryParamsChange({
      ...params,
      SearchTerm: searchTerm || undefined,
      PageNumber: 1,
    });
  };

  const [selectedCategory, setSelectedCategory] =
    useState<dictionarycategoryType | null>(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          margin: 2,
        }}
      >
        {/* 🔍 Search Filter */}
        <TextFilter
          searchTerm={params?.SearchTerm || ""}
          onSearchChange={handleSearchChange}
          placeholder="Search Dictionary..."
          showLabel={false}
        />

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
              onQueryParamsChange({
                ...params,
                category: newValue?.id,
                PageNumber: 1,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select User" variant="outlined" />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

export default DictionaryFilter;
