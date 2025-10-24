import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { StoreTargetDto } from "../model/storeTargetType";

export const StoreTargetFormFields: FormFieldProps<StoreTargetDto>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "year",
    label: "Year",
    type: "yearpicker",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "month",
    label: "Month",
    type: "monthpicker",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Brand",
    name: "brandCodes",
    type: "autocompletemultiple",
    size: { sm: 12, md: 6, lg: 6 },
    Params: { Category: "Brand" },
    autocompletelabel: {
      optionvalue: { id: "code" },
    },
  },

  {
    label: "User",
    name: "userIds",
    type: "autocompletemultiple",
    size: { sm: 12, md: 6, lg: 6 },
    baseurl: "Account/all",
    autocompletelabel: {
      optionvalue: { id: "id" },
    },
    optionLabel: (e) => {
      return e?.userName || "";
    },
  },
  {
    label: "Store",
    name: "storeIds",
    type: "autocompletemultiple",
    size: { sm: 12, md: 6, lg: 6 },
    baseurl: "Store",
    autocompletelabel: {
      optionvalue: { id: "storeId" },
    },
  },
  {
    name: "targetAmount",
    label: "Target Amount",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
];

export const storeTargetFormValidationSchema = yup.object({
  storeIds: yup
    .array()
    .optional()
    .transform((curr, orig) => (orig === "" ? [] : curr))
    .of(yup.number()),

  year: yup.number().required("Year is required"),
  name: yup.string().required("Name is required"),

  month: yup.number().required("Month is required"),

  // brandCodes: yup
  //   .array()
  //   .optional()
  //   .transform((curr, orig) => (orig === "" ? [] : curr))
  //   .of(yup.number()),

  targetAmount: yup
    .number()
    .required("Target amount is required")
    .min(1, "Target Amount must be positive"),
});
