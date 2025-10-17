"use client";

import {
  Autocomplete,
  TextField,
  Checkbox,
  Chip,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as React from "react";
import type { OptionType } from "../../../Dto/formDto";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  value?: (string | number)[] | string | number;
  onChange: (val: string[] | number[] | string | number, e: any) => void;
  options?: OptionType[];
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "standard" | "filled" | "outlined";
  placeholder?: string;
  size?: "small" | "medium";
  multiple?: boolean;
  excludeValues?: string[];
  readonlyallowdelete?: boolean;
  optionLabel?: (item: any, index: number) => string;
  autocompletelabel?: {
    optionlable?: string;
    optionvalue?: { id: string; value?: string };
  };
}

const FormAutocompleteMultiple: React.FC<Props> = ({
  value,
  onChange,
  options = [],
  fullWidth = true,
  disabled = false,
  variant = "outlined",
  placeholder = "",
  size = "medium",
  excludeValues = [],
  multiple = true,
  readonlyallowdelete = false,
  optionLabel,
  autocompletelabel,
}) => {
  const [searchParams, setSearchParams] = React.useState<string>("");
  const [cachedSelectedOptions, setCachedSelectedOptions] = React.useState<any[]>(
    []
  );

  const getOptionId = (opt: any) =>
    autocompletelabel?.optionvalue?.id
      ? opt?.[autocompletelabel.optionvalue.id]
      : opt?.id;

  const getOptionLabelFromOption = (opt: any) =>
    optionLabel
      ? optionLabel(opt, 0)
      : opt?.[autocompletelabel?.optionlable ?? "name"] ?? opt?.name ?? "";

  const selectedValues = React.useMemo(() => {
    if (!value) return multiple ? [] : null;

    if (multiple && Array.isArray(value)) {
      const matchingOptions = options.filter((opt) => {
        const optId = getOptionId(opt);
        return value.some((v) => String(v) === String(optId));
      });

      const missingIds = value.filter(
        (v) =>
          !matchingOptions.some((opt) => String(getOptionId(opt)) === String(v))
      );

      const cachedOptionsForMissingIds = cachedSelectedOptions.filter((opt) =>
        missingIds.some((id) => String(getOptionId(opt)) === String(id))
      );

      const remainingMissingIds = missingIds.filter(
        (id) =>
          !cachedOptionsForMissingIds.some(
            (opt) => String(getOptionId(opt)) === String(id)
          )
      );

      const placeholderOptions = remainingMissingIds.map((id) => ({
        id,
        name: `(${id})`,
        isPlaceholder: true,
      }));

      return [
        ...matchingOptions,
        ...cachedOptionsForMissingIds,
        ...placeholderOptions,
      ];
    } else if (!multiple) {
      const matchInOptions = options.find(
        (opt) => String(getOptionId(opt)) === String(value)
      );
      if (matchInOptions) return matchInOptions;

      const matchInCached = cachedSelectedOptions.find(
        (opt) => String(getOptionId(opt)) === String(value)
      );
      if (matchInCached) return matchInCached;

      return value
        ? { id: value, name: `(${value})`, isPlaceholder: true }
        : null;
    }

    return multiple ? [] : null;
  }, [value, options, multiple, cachedSelectedOptions]);

  React.useEffect(() => {
    if (selectedValues) {
      if (multiple && Array.isArray(selectedValues)) {
        const validOptions = selectedValues.filter((opt) => !opt.isPlaceholder);
        setCachedSelectedOptions((prev) => {
          const combined = [...prev];
          validOptions.forEach((opt) => {
            const id = String(getOptionId(opt));
            if (
              !prev.some((prevOpt) => String(getOptionId(prevOpt)) === id)
            ) {
              combined.push(opt);
            }
          });
          return combined;
        });
      } else if (!multiple && selectedValues && !selectedValues.isPlaceholder) {
        const id = String(getOptionId(selectedValues));
        if (
          !cachedSelectedOptions.some(
            (opt) => String(getOptionId(opt)) === id
          )
        ) {
          setCachedSelectedOptions((prev) => [...prev, selectedValues]);
        }
      }
    }
  }, [selectedValues, multiple, cachedSelectedOptions]);

  const combinedOptions = React.useMemo(() => {
    const filteredOptions = options.filter(
      (opt) => !excludeValues.includes(opt?.name || "")
    );

    if (readonlyallowdelete && multiple) {
      const selectedIds = Array.isArray(selectedValues)
        ? selectedValues.map((opt) => String(getOptionId(opt)))
        : [];
      return filteredOptions.filter((opt) =>
        selectedIds.includes(String(getOptionId(opt)))
      );
    }

    return filteredOptions;
  }, [options, excludeValues, readonlyallowdelete, selectedValues, multiple]);

  return (
    <Autocomplete
      multiple={multiple}
      options={combinedOptions}
      fullWidth={fullWidth}
      disabled={disabled}
      value={selectedValues}
      inputValue={searchParams}
      onInputChange={(_, newValue, reason) => {
        if (reason === "input" && !readonlyallowdelete) {
          setSearchParams(newValue || "");
        }
      }}
      disableCloseOnSelect={multiple}
      getOptionLabel={getOptionLabelFromOption}
      isOptionEqualToValue={(option, value) =>
        String(getOptionId(option)) === String(getOptionId(value))
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {multiple && (
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          )}
          {getOptionLabelFromOption(option)}
        </li>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const tagProps = getTagProps({ index });
          return (
            <Chip
              {...tagProps}
              label={getOptionLabelFromOption(option)}
              size="small"
              color={option.isPlaceholder ? "default" : "primary"}
            />
          );
        })
      }
      onChange={(_, newValue) => {
        if (multiple) {
          const selectedArray = (newValue as any[]).map((val) =>
            getOptionId(val)
          );
          onChange(selectedArray, newValue);
        } else {
          const selectedId = newValue ? getOptionId(newValue) : "";
          onChange(selectedId, newValue);
          setSearchParams(
            String(getOptionLabelFromOption(newValue) ?? "")
          );
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          placeholder={
            readonlyallowdelete ? "Only deletion allowed" : placeholder
          }
          InputProps={{
            ...params.InputProps,
            readOnly: readonlyallowdelete,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default FormAutocompleteMultiple;
