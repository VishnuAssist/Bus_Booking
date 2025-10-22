import { Box, InputAdornment, TextField, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useDebounce } from "../../hooks/useDebounce";

interface TextFilterProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  debounceDelay?: number;
  placeholder?: string;
  label?: string;
  minWidth?: number;
  showLabel?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const TextFilter = ({
  searchTerm,
  onSearchChange,
  debounceDelay = 500,
  placeholder = "Search...",
  label = "Search",
  minWidth = 300,
  showLabel = true,
  className,
  fullWidth = true,
}: TextFilterProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, debounceDelay);

  // Update local state when searchTerm prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Call onSearchChange when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchTerm(value);
  };

  return (
    <Box
      margin={2}
      sx={{
        float: "right",
        display: "flex",
        gap: 2,
        minWidth: minWidth,
      }}
      className={className}
    >
      <Box sx={{ minWidth: minWidth, width: fullWidth ? "100%" : "auto" }}>
        {showLabel && (
          <InputLabel htmlFor="search-input" className="label-bold">
            {label}
          </InputLabel>
        )}
        <TextField
          id="search-input"
          size="small"
          fullWidth={fullWidth}
          value={localSearchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};

export default TextFilter;
