import {  Box, TextField } from "@mui/material";
import * as React from "react";


interface Props {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  fullWidth: boolean;
  variant: "standard" | "filled" | "outlined";
  placeholder?: string;
  type: "text" | "number" | "password"|"date" |"dateTime"|"datetime-local" | "time";
  error?: string;
  size?:"small"|"medium",
  startInput?:React.ReactNode,
  min?:string,
  max?:string
  endInput?: React.ReactNode;
}

const FormText: React.FC<Props> = ({ value, onChange, required, disabled, fullWidth, variant, placeholder, type ,size,startInput,min,max,endInput}) => (
  <TextField
    type={type}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    required={required}
    disabled={disabled}
    fullWidth={fullWidth}
    variant={variant}
    placeholder={placeholder}
    size={size}

    inputProps={{
            min: (type === "date" || type === "dateTime" || type === "datetime-local") ? min : undefined,
            max: (type === "date" || type === "dateTime" || type === "datetime-local" )? max : undefined,
          }}
      
    slotProps={{
      input: {
        startAdornment: (startInput&&<Box sx={{pl:1 }}>
       { startInput}
        </Box>
        ),
        endAdornment: (endInput&&<Box sx={{ }}>
       { endInput}
       </Box>)
      },
    }}
   
  />
);

export default FormText;
