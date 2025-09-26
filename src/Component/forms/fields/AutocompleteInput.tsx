"use client";

import { Autocomplete, Chip, TextField } from "@mui/material";
import * as React from "react";

import { useAutocompletedataQuery } from "../../../Api/AutocompleteApi";
import type { OptionType, QueryParamsType } from "../../../Dto/formDto";
import { defaultparams } from "../../../Constant/defaultValues";
import { ValidateParams } from "../../../Lib/utile";



function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface Props {
  value?: string | number;
  onChange: (val: string | number, e: any) => void;
  options?: OptionType[];
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "standard" | "filled" | "outlined";
  placeholder?: string;
  baseUrl?: string;
  Params?: QueryParamsType;
  size?: "small" | "medium";
  name?: string;
  valueName?: string;
  optionLabel?: (item: any, index: number) => string;
  autocompletelabel?: {
    optionlable?: string;
    optionvalue?: { id: string; value?: string };
  };
}

const FormAutocomplete: React.FC<Props> = ({
  value,
  onChange,
  fullWidth = true,
  disabled = false,
  variant,
  optionLabel,
  placeholder = "",
  baseUrl,
  size,
  Params,
  autocompletelabel,
}) => {
  const [searchParams, setSearchParams] = React.useState<string>(String(value ?? ""));

  const [skip,setskip]=React.useState(false)
  const debouncedSearch = useDebounce(searchParams, 300);

 
  React.useEffect(() => {
    setSearchParams(String(value ?? ""));
  }, [value]);


  const searchParamsObject = React.useMemo(() => {
    return {
      ...defaultparams,
      ...Params,
      SearchTerm: debouncedSearch,
    };
  }, [Params, debouncedSearch]);

  const { data = [], isFetching } = useAutocompletedataQuery({
    params: ValidateParams(searchParamsObject),
    baseurl: baseUrl || "/dictionary",
  },{skip:skip});
const skipCalling = () => {
  if(!Params&&!value&&!debouncedSearch&&data.length>0){
  return true
}
  if (!debouncedSearch && value && data.some(opt => {
    const optionId = autocompletelabel?.optionvalue?.id
      ? (opt as Record<string, any>)?.[autocompletelabel.optionvalue.id]
      : opt?.id;
    return String(optionId) === String(value);
  })) {
    return true;
  }

  
  if (debouncedSearch && data.length > 0) {
    const matchingItems = data.filter(d => 
      d.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    return matchingItems.length > 0;
  }

  return false;
};

  React.useEffect(()=>{
    setskip(skipCalling())
  },[value,searchParams,data,Params])
  // console.log(skip)
  const selectedOption = data.find((opt) => {
    const optionId = autocompletelabel?.optionvalue?.id
      ? (opt as Record<string, any>)?.[autocompletelabel.optionvalue.id]
      : opt?.id;
    return String(optionId) === String(value);
  });

  const chipLabel = optionLabel
    ? optionLabel(selectedOption, 0)
    : selectedOption?.name ?? "";

  return (
    <Autocomplete
      options={data}
      fullWidth={fullWidth}
      disabled={disabled}
      loading={isFetching}
      value={selectedOption ?? null}
      getOptionLabel={(option) =>
        optionLabel ? optionLabel(option, 0) : option?.name ?? ""
      }
      onChange={(_, newValue) => {
        const selectedId = autocompletelabel?.optionvalue?.id
          ? (newValue as Record<string, any>)?.[autocompletelabel.optionvalue.id]
          : (newValue as OptionType | null)?.id;

        const selectedLabel = autocompletelabel?.optionvalue?.value
          ? (newValue as Record<string, any>)?.[autocompletelabel.optionvalue.value]
          : (newValue as OptionType | null)?.name;

        onChange(selectedId ?? "", newValue);
        setSearchParams(String(selectedLabel ?? ""));
      }}
      renderInput={(params) => (
        <div style={{ position: "relative" }}>
          <TextField
            {...params}
            size={size}
            variant={variant}
            fullWidth={fullWidth}
            onChange={(e) => {
              setSearchParams(e.target.value);
              onChange("", null); // clear selected value
            }}
            placeholder={placeholder}
          />
          {selectedOption && (
            <Chip
              label={chipLabel}
              size="small"
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                mt: "2px",
                fontSize: "0.6rem",
                height: "auto",
                padding: "0 4px",
                zIndex: 1,
                backgroundColor: "#f0f0f0",
              }}
            />
          )}
        </div>
      )}
    />
  );
};

export default FormAutocomplete;
