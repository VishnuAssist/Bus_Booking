import React from "react";
import { Box, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface YearFilterProps {
  /** Selected year value */
  value: number | null;
  /** Callback function to handle year changes */
  onChange: (year: number | null) => void;
  /** Label text for the filter (default: "Select Year") */
  label?: string;
  /** Minimum width of the filter (default: 150) */
  minWidth?: number;
  /** Whether to show the label (default: true) */
  showLabel?: boolean;
  /** Additional CSS classes for styling */
  className?: string;
  /** Whether the filter should be full width */
  fullWidth?: boolean;
  /** Disable the filter */
  disabled?: boolean;
  /** Start year for the range (default: current year - 10) */
  startYear?: number;
  /** End year for the range (default: current year + 5) */
  endYear?: number;
}

const YearFilter: React.FC<YearFilterProps> = ({
  value,
  onChange,
  label = "Select Year",
  minWidth = 150,
  showLabel = true,
  className,
  fullWidth = false,
  disabled = false,
  startYear = new Date().getFullYear() - 10,
  endYear = new Date().getFullYear() + 5,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.year());
    } else {
      onChange(null);
    }
  };

  const selectedDate = value ? dayjs().year(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <InputLabel htmlFor="year-filter" className="label-bold">
              {label}
            </InputLabel>
          )}
          <DatePicker
            views={["year"]}
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
            disabled={disabled}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: fullWidth,
                placeholder: "All Years",
              },
            }}
            minDate={dayjs().year(startYear)}
            maxDate={dayjs().year(endYear)}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default YearFilter;
