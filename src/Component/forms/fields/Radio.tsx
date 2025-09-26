import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { OptionType } from "../../../models/formFeilds";
import * as React from "react";

interface Props {
  value: string | number|boolean;
  onChange: (val: string | number|boolean) => void;
  options: OptionType[];
  disabled?: boolean;
}

const FormRadio: React.FC<Props> = ({ value, onChange, options, disabled }) => (
  <FormControl component="fieldset"  >
    <RadioGroup  value={value === true ? "true" : value === false ? "false" : ""}
                            onChange={(e) => {
                              
                             onChange(e.target.value === "true");
                            }} row>
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          value={option.value}
          control={<Radio />}
          label={option.label}
          disabled={disabled}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default FormRadio;
