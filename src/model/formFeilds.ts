// import { QueryParamsType } from "./common";

import type { JSX } from "react";
import type { QueryParamsType } from "./common";

export interface OptionType {
  id?: string | number;
  name?: string;
  label?: string;
  value?: string | number | boolean;
}
type AllowedType =
  | "pdf"
  | "image"
  | "word"
  | "excel"
  | "ppt"
  | "text"
  | "csv"
  | "zip"
  | "video"
  | "audio"
  | "all";
export interface FormFieldProps<T> {
  valueName?: string;
  allowFile?: AllowedType[];
  label?: string;
  tooltip?: string;
  type?:
  | "text"
  | "textarea"
  | "number"
  | "password"
  | "select"
  | "checkbox"
  | "radio"
  | "autocomplete"
  | "D&DUpload"
  | "file"
  | "date"
  | "time"
  | "TimePicker"
  | "datetime-local"
  | "map"
  | "autocompletemultiple"
  | "D&DUploadImage"
  | "skipDates";

  skipDates?: Array<{ startDate: string; endDate: string }>;

  baseurl?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  hide?: boolean;
  variant?: "standard" | "filled" | "outlined";
  options?: OptionType[];
  multiple?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  renderComponent?: (props: any) => JSX.Element;
  Params?: QueryParamsType;
  error?: string;
  size?: { sm: number; md: number; lg: number };
  inputsize?: "small" | "medium";
  optionLabel?: (e: any, i: number) => string;
  autocompletelabel?: {
    optionlable?: string;
    optionvalue?: { id: string; value?: string };
  };
  value?: T;
  onChange?: (val: string | number | boolean) => void;
  group?: FormFieldProps<T>[];
  startInput?: React.ReactNode;
  endInput?: React.ReactNode;
  min?: string;
  max?: string;
  IsAll?: boolean;
  excludeValues?: string[];
}
