import React from "react";
import { Box, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateFilterProps {
  /** Selected date value (ISO string or null) */
  value: string | null | number;
  /** Callback when date changes (returns ISO string or null) */
  onChange: (date: string | null | number) => void;
  /** Label text (default: "Select Date") */
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

const DateFilter: React.FC<DateFilterProps> = ({
  value,
  onChange,
  label = "Select Date",
  minWidth = 180,
  showLabel = true,
  className,
  fullWidth = false,
  disabled = false,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format("YYYY-MM-DD")); // store as ISO string
    } else {
      onChange(null);
    }
  };

  const selectedDate = value ? dayjs(value) : null;

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
            <InputLabel htmlFor="date-filter" className="label-bold">
              {label}
            </InputLabel>
          )}
          <DatePicker
            format="DD-MM-YYYY"
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
            disabled={disabled}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: fullWidth,
                placeholder: "Select Date",
              },
              popper: {
                sx: {
                  "& .MuiDateCalendar-root": {
                    height: "340px",
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

export default DateFilter;
