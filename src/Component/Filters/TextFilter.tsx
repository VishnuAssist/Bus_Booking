import { Box, InputAdornment, TextField, InputLabel } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

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

  // Use ref to store the latest onSearchChange function
  const onSearchChangeRef = useRef(onSearchChange);
  onSearchChangeRef.current = onSearchChange;

  // Update local state when searchTerm prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Call onSearchChange when debounced value changes (without onSearchChange in deps)
  useEffect(() => {
    onSearchChangeRef.current(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchTerm(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
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
          sx={{
            "& .MuiInputBase-input::placeholder": {
              fontSize: "12px", // Adjust font size here
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TextFilter;
