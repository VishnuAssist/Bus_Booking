import React from "react";
import { Box, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface MonthFilterProps {
  /** Selected month value (1-12) */
  value: number | null;
  /** Callback function to handle month changes */
  onChange: (month: number | null) => void;
  /** Label text for the filter (default: "Select Month") */
  label?: string;
  /** Minimum width of the filter (default: 180) */
  minWidth?: number;
  /** Whether to show the label (default: true) */
  showLabel?: boolean;
  /** Additional CSS classes for styling */
  className?: string;
  /** Whether the filter should be full width */
  fullWidth?: boolean;
  /** Disable the filter */
  disabled?: boolean;
}

const MonthFilter: React.FC<MonthFilterProps> = ({
  value,
  onChange,
  label = "Select Month",
  minWidth = 180,
  showLabel = true,
  className,
  fullWidth = false,
  disabled = false,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.month() + 1); // dayjs months are 0-indexed, so add 1
    } else {
      onChange(null);
    }
  };

  const selectedDate = value ? dayjs().month(value - 1) : null; // Convert 1-indexed month to 0-indexed

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          minWidth: minWidth,
        }}
        className={className}
      >
        <Box sx={{ minWidth: minWidth, width: fullWidth ? "100%" : "auto" }}>
          {showLabel && (
            <InputLabel htmlFor="month-filter" className="label-bold">
              {label}
            </InputLabel>
          )}
          <DatePicker
            views={["month"]}
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
            disabled={disabled}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: fullWidth,
                placeholder: "All Months",
              },
              popper: {
                sx: {
                  "& .MuiDateCalendar-root": {
                    height: "282px",
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthFilter;
