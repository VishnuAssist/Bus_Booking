import React from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface MonthPickerProps {
  value: number | null;
  onChange: (month: number | null) => void;
  minWidth?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onChange,
  minWidth = 180,
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
      <Box sx={{ minWidth: minWidth, width: fullWidth ? "100%" : "auto" }}>
        <DatePicker
          views={["month"]}
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
    </LocalizationProvider>
  );
};

export default MonthPicker;
