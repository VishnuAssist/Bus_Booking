import { FormControl, MenuItem, Select } from "@mui/material";
import * as React from "react";
import type { OptionType, QueryParamsType } from "../../../Dto/formDto";
//import { defaultparams } from "../../../Constant/defaultValues";
//import { ValidateParams } from "../../../Lib/utile";
//import { useAutocompletedataQuery } from "../../../Api/AutocompleteApi";

interface Props {
  value: string | number | string[] | number[];
  onChange: (val: string | number | string[] | number[]) => void;
  options?: OptionType[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  params?: QueryParamsType;
  Isall?: boolean;
  baseUrl?: string
}

const FormSelect: React.FC<Props> = ({ value, onChange, options, multiple, required, disabled, fullWidth, size, params, Isall, baseUrl }) => {


  // const { data = [] } = useAutocompletedataQuery({
  //     params: ValidateParams({ ...defaultparams, ...params}),
  //     baseurl: baseUrl??"/dictionary",
  //   } ,{skip:!params})

  const resolvedOptions = options?.length !== 0 ? options : [];

  const isValueValid = multiple
    ? Array.isArray(value) &&
    value.every((v) =>
      resolvedOptions?.some((opt) => String(opt.id) === String(v))
    )
    : resolvedOptions?.some((opt) => String(opt.id) === String(value));

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}

      size={size}
      variant="outlined"
    >
      <Select
        value={isValueValid ? value : multiple ? [] : ""}

        onChange={(e) => {
          onChange(e.target.value);

        }}
        multiple={multiple}
      >
        {Isall && <MenuItem value={""}>All</MenuItem>}

        {resolvedOptions?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

}
export default FormSelect;
