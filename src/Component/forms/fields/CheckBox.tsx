import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import * as React from "react";


interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
  label:any;
  tooltip?:string|null
  disable?:boolean
}

const FormCheckbox: React.FC<Props> = ({ value, onChange, label,tooltip,disable }) => (
  
  <Tooltip title={tooltip||""}>
  <FormControlLabel

  sx={{marginTop:tooltip==null?1.5:0.4, height:20}}
    control={<Checkbox size="small" sx={{p:0}} disabled={disable}   checked={value} onChange={(e) =>{ onChange(e.target.checked)}} />}
    label={label }
  />
  </Tooltip>
);

export default FormCheckbox;
