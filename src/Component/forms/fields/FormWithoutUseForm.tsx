
import { FormHelperText, InputLabel } from "@mui/material"

import FormText from "./FormText"
import FormSelect from "./FormSelect"
import FormCheckbox from "./CheckBox"
import FormRadio from "./Radio"
import FormAutocomplete from "./AutocompleteInput"
import FormUpload from "./upload"


import FormUploadImage from "./uploadImage"
import type { FormFieldProps } from "../../../Dto/formDto"



const FormFieldStandalone = <T,>(props: FormFieldProps<T>) => {
  const {
    label,
    type = "text",
    name,
    required,
    disabled,
    fullWidth = true,
    variant = "outlined",
    options = [],
    multiple = false,
    placeholder,
    style,
    baseurl,
    Params,
    value,
    onChange,
    error,
    autocompletelabel,
    IsAll,
    optionLabel,
  } = props;

  return (
    <div style={{ ...style }}>
      {label && type !== "checkbox" && (
        <InputLabel sx={{fontSize: 12}} htmlFor={name}>
          <b>{label}</b>
        </InputLabel>
      )}

      {renderField({
        type,
        value,
        onChange,
        options,
        multiple,
        required,
        disabled,
        fullWidth,
        variant,
        placeholder,
        baseurl,
        Params,
        label,
        name,
        IsAll,
        optionLabel,
        autocompletelabel,
      })}

      {error && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
    </div>
  )
}


const renderField = ({
  type,
  value,
  onChange,
  options,
  multiple,
  required,
  disabled,
  fullWidth,
  variant,
  placeholder,
  baseurl,
  Params,
  label,
  name,
  IsAll,
  optionLabel,
  
  autocompletelabel,
}:any) => {
  if(onChange)
  switch (type) {
    case "select":
      return (
        <FormSelect
          value={value}
          onChange={onChange}
          options={options}
          multiple={multiple}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          size="small"
          Isall={IsAll}
          params={Params}
        />
      );
    case "checkbox":
      return (
        <FormCheckbox
          value={Boolean(value)}
          onChange={onChange}
          label={label ?? name}
        />
      );
    case "radio":
      return (
        <FormRadio
          value={value}
          onChange={onChange}
          options={options}
          disabled={disabled}
        />
      );
    case "autocomplete":
      return (
        <FormAutocomplete
          value={value}
          onChange={onChange}
          options={options}
          fullWidth={fullWidth}
          disabled={disabled}
          variant={variant}
          placeholder={placeholder}
          baseUrl={baseurl}
          Params={Params}
          size="small"
          name={name}
          autocompletelabel={autocompletelabel}
          optionLabel={optionLabel}
        />
      );
    case "D&DUpload":
      return <FormUpload onChange={onChange} />;
    case "D&DUploadImage":
      return <FormUploadImage onChange={onChange}  />;
    default:
      return (
        <FormText
          value={value}
          onChange={onChange}
          type={type}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          variant={variant}
          placeholder={placeholder}
          error={undefined}
          size="small"
        />
      );
  }
}

export default FormFieldStandalone
