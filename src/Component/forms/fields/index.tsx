import { FormHelperText, InputLabel, } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import FormText from "./FormText";
import FormSelect from "./FormSelect";
import FormCheckbox from "./CheckBox";
import FormRadio from "./Radio";
import FormAutocomplete from "./AutocompleteInput";
// import FormUpload from "./upload";
import FormAutocompleteMulitple from "./AutocompleteMulitpleInput";
// import FormUploadImage from "./uploadImage";
import SkipDates from "./skipDateField";
import type { FormFieldProps } from "../../../Dto/formDto";



const FormField = <T,>(props: FormFieldProps<T>) => {
  const {
    label,
    type = "text",
    name,
    required,
    disabled,
    //allowFile,
    fullWidth = true,
    variant = "outlined",
    options = [],
    multiple = false,
    placeholder,
    style,
    inputsize = "small",
    baseurl,
    Params,
    optionLabel,
    startInput,
    endInput,
    valueName, tooltip,
    min, max, excludeValues,
  } = props;

  const { control, formState: { errors } } = useFormContext();

  const error = (errors[name]?.message ?? errors[name]?.root?.message) as string | undefined;


  return (
    <div style={{ marginBottom: "4px", ...style }}>
      {label && type !== "checkbox" && <InputLabel sx={{ fontSize: 11 }} ><b>{label}</b> {required && <span>*</span>}</InputLabel>}

      <Controller
        name={name}
        control={control}
        defaultValue={type === "checkbox" ? false : ""}
        render={({ field }) => {
          const { value, onChange } = field;

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
                  size={inputsize}
                />
              );
              
            case "checkbox":
              return (
                <FormCheckbox
                  disable={disabled}
                  value={Boolean(value)}
                  onChange={onChange}
                  tooltip={tooltip ?? null}
                  label={
                    <InputLabel sx={{ fontSize: 11 }}>
                      <b>{label}</b>
                    </InputLabel>
                  }
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

            case "skipDates":
              return <SkipDates name={name} disabled={disabled} />;

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
                  optionLabel={optionLabel}
                  valueName={valueName}
                  name={name}
                  size={inputsize}
                  autocompletelabel={props?.autocompletelabel}
                />
              );

            case "autocompletemultiple":
              return (
                <FormAutocompleteMulitple
                  value={value}
                  onChange={onChange}
                  options={options}
                  fullWidth={fullWidth}
                  disabled={disabled}
                  variant={variant}
                  placeholder={placeholder}
                  baseUrl={baseurl}
                  Params={Params}
                  optionLabel={optionLabel}
                  valueName={valueName}
                  name={name}
                  size={inputsize}
                  autocompletelabel={props?.autocompletelabel}
                  excludeValues={excludeValues}
                />
              );

            // case "D&DUpload":
            //   return <FormUpload onChange={onChange} allowFile={allowFile} />;
            // case "D&DUploadImage":
            //   return (
            //     <FormUploadImage
            //       onChange={onChange}
            //       allowFile={allowFile}
            //       value={value}
            //     />
            //   );

            default:
              const validTextTypes = ["number", "text", "password", "date", "datetime-local", "dateTime", "time"] as const;
              const safeType = validTextTypes.includes(type as any) ? (type as (typeof validTextTypes)[number]) : "text";
              return (
                <FormText
                  value={value}
                  onChange={onChange}
                  type={safeType}
                  required={required}
                  disabled={disabled}
                  fullWidth={fullWidth}
                  variant={variant}
                  placeholder={placeholder}
                  error={error}
                  size={inputsize}
                  startInput={startInput}
                  endInput={endInput}
                  min={min}
                  max={max}
                />
              );
          }

        }}
      />
      <FormHelperText sx={{ color: "red", fontSize: 11 }}>{error}</FormHelperText>
    </div>
  );
};

export default FormField;