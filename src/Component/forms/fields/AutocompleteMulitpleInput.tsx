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
import type { OptionType, QueryParamsType } from "../../../Dto/formDto";
import { useAutocompletedataQuery } from "../../../Api/AutocompleteApi";
import { ValidateParams } from "../../../Lib/utile";
import { defaultparams } from "../../../Constant/defaultValues";

// Icon for the checkbox
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
  excludeValues?: string[];
  multiple?: boolean;
  readonlyallowdelete?: boolean;
}

const FormAutocompleteMulitple: React.FC<Props> = ({
  value,
  onChange,
  fullWidth = true,
  disabled = false,
  variant = "outlined",
  optionLabel,
  placeholder = "",
  baseUrl,
  size = "medium",
  Params,
  excludeValues = [],
  autocompletelabel,
  multiple = true,
  readonlyallowdelete = false,
}) => {
  const [searchParams, setSearchParams] = React.useState<string>("");
  const [cachedSelectedOptions, setCachedSelectedOptions] = React.useState<
    any[]
  >([]);

  const { data = [], isFetching } = useAutocompletedataQuery({
    params: ValidateParams({
      ...defaultparams,
      ...Params,
      SearchTerm: searchParams,

      ...(multiple && value && Array.isArray(value) ? { Ids: value } : {}),
    }),
    baseurl: baseUrl || "/dictionary",
  });

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
      const matchingOptions = data.filter((opt) => {
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
        name: `Loading... (${id})`,
        isPlaceholder: true,
      }));

      return [
        ...matchingOptions,
        ...cachedOptionsForMissingIds,
        ...placeholderOptions,
      ];
    } else if (!multiple) {
      // For single selection
      const matchInData = data.find(
        (opt) => String(getOptionId(opt)) === String(value)
      );
      if (matchInData) return matchInData;

      const matchInCached = cachedSelectedOptions.find(
        (opt) => String(getOptionId(opt)) === String(value)
      );
      if (matchInCached) return matchInCached;

      return value
        ? { id: value, name: `Loading... (${value})`, isPlaceholder: true }
        : null;
    }

    return multiple ? [] : null;
  }, [value, data, multiple, cachedSelectedOptions]);

  React.useEffect(() => {
    if (selectedValues) {
      if (multiple && Array.isArray(selectedValues)) {
        const validOptions = selectedValues.filter((opt) => !opt.isPlaceholder);

        setCachedSelectedOptions((prev) => {
          const combined = [...prev];

          let hasNew = false;

          validOptions.forEach((opt) => {
            const id = String(getOptionId(opt));
            const alreadyExists = prev.some(
              (prevOpt) => String(getOptionId(prevOpt)) === id
            );
            if (!alreadyExists) {
              hasNew = true;
              combined.push(opt);
            }
          });

          return hasNew ? combined : prev;
        });
      } else if (!multiple && selectedValues && !selectedValues.isPlaceholder) {
        const id = String(getOptionId(selectedValues));
        const alreadyExists = cachedSelectedOptions.some(
          (opt) => String(getOptionId(opt)) === id
        );

        if (!alreadyExists) {
          setCachedSelectedOptions((prev) => [...prev, selectedValues]);
        }
      }
    }
  }, [selectedValues, multiple, cachedSelectedOptions]);
  React.useEffect(() => {
    if (Params) {
      setCachedSelectedOptions([]);
    }
  }, [Params]);
  const combinedOptions = React.useMemo(() => {
    if (!multiple) {
      return (
        data?.filter((opt) => !excludeValues.includes(opt?.name ?? "")) || []
      );
    }

    const allOptions = [...(data || [])];

    cachedSelectedOptions?.forEach((cachedOpt) => {
      if (
        !allOptions.some(
          (opt) => String(getOptionId(opt)) === String(getOptionId(cachedOpt))
        )
      ) {
        allOptions.push(cachedOpt);
      }
    });

    if (readonlyallowdelete) {
      const selectedIds = Array.isArray(selectedValues)
        ? selectedValues.map((opt) => String(getOptionId(opt)))
        : [];

      return allOptions.filter((opt) => {
        const optId = String(getOptionId(opt));
        return (
          selectedIds.includes(optId) && !excludeValues.includes(opt.name ?? "")
        );
      });
    }

    return allOptions.filter((opt) => !excludeValues.includes(opt.name ?? ""));
  }, [
    data,
    cachedSelectedOptions,
    multiple,
    excludeValues,
    readonlyallowdelete,
    selectedValues,
  ]);

  return (
    <Autocomplete
      multiple={multiple}
      options={combinedOptions}
      fullWidth={fullWidth}
      disabled={disabled}
      loading={isFetching}
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
      filterOptions={(options, state) => {
        if (readonlyallowdelete) {
          return options;
        }

        const searchTerm = state.inputValue.toLowerCase().trim();

        if (!searchTerm) {
          return options;
        }

        if (
          multiple &&
          Array.isArray(selectedValues) &&
          selectedValues.length > 0
        ) {
          const selectedIds = selectedValues.map((opt) =>
            String(getOptionId(opt))
          );

          return options.filter((option) => {
            const optionId = String(getOptionId(option));
            const optionLabel = getOptionLabelFromOption(option).toLowerCase();
            const matchesSearch = optionLabel.includes(searchTerm);

            return matchesSearch || selectedIds.includes(optionId);
          });
        }

        return options.filter((option) => {
          const optionLabel = getOptionLabelFromOption(option).toLowerCase();
          return optionLabel.includes(searchTerm);
        });
      }}
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
          {option.isPlaceholder ? (
            <span style={{ color: "#666" }}>
              {getOptionLabelFromOption(option)}
            </span>
          ) : (
            getOptionLabelFromOption(option)
          )}
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

          const currentValues = Array.isArray(value)
            ? value
            : value
            ? [value]
            : [];
          const newValues = selectedId
            ? [...currentValues, selectedId]
            : currentValues;
          onChange(newValues, newValue);
          setSearchParams(String(getOptionLabelFromOption(newValue) ?? ""));
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
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default FormAutocompleteMulitple;
