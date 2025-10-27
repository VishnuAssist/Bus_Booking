import React from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  value: number | null;
  onChange: (year: number | null) => void;
  minWidth?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const YearPicker: React.FC<Props> = ({
  value,
  onChange,
  minWidth = 150,
  fullWidth = false,
  disabled = false,
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
      <Box sx={{ minWidth: minWidth, width: fullWidth ? "100%" : "auto" }}>
        {/* {showLabel && (
            <InputLabel htmlFor="year-filter" className="label-bold">
              {label}
            </InputLabel>
          )} */}
        <DatePicker
          views={["year"]}
          // label={label}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: fullWidth,
              placeholder: "Selact Year",
            },
            popper: {
              sx: {
                "& .MuiDateCalendar-root": {
                  height: "282px",
                },
              },
            },
          }}
          openTo="year"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default YearPicker;
