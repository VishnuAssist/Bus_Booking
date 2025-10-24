import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { StoreMonthlyTargetDto } from "../model/storeTargetType";

export const StoreTargetFormFields: FormFieldProps<StoreMonthlyTargetDto>[] = [
  {
    name: "year",
    label: "Year",
    type: "yearpicker",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "month",
    label: "Month",
    type: "monthpicker",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Brand",
    name: "brandCode",
    type: "autocompletemultiple",
    size: { sm: 12, md: 6, lg: 6 },
    Params: { Category: "Brand" },
    autocompletelabel: {
      optionvalue: { id: "code" },
    },
  },

  {
    label: "User",
    name: "userId",
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
    name: "storeId",
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
    type: "number" as const,
    size: { sm: 12, md: 6, lg: 6 },
  },
];

export const storeTargetFormValidationSchema = yup.object({
  storeId: yup
    .array()
    .optional()
    .transform((curr, orig) => (orig === "" ? [] : curr))
    .of(yup.number()),

  year: yup.number().required("Year is required"),

  month: yup.number().required("Month is required"),

  brandCode: yup
    .array()
    .optional()
    .transform((curr, orig) => (orig === "" ? [] : curr))
    .of(yup.number()),

  targetAmount: yup
    .number()
    .required("Target amount is required")
    .min(1, "Target Amount must be positive"),
});

export const ProcessStoreTargetFormFields: FormFieldProps<StoreMonthlyTargetDto>[] =
  [
    {
      name: "year",
      label: "Year",
      type: "yearpicker",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      name: "month",
      label: "Month",
      type: "monthpicker",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Brand",
      name: "brandCode",
      type: "autocompletemultiple",
      size: { sm: 12, md: 6, lg: 6 },
      Params: { Category: "Brand" },
      autocompletelabel: {
        optionvalue: { id: "code" },
      },
    },

    {
      label: "User",
      name: "userId",
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
      name: "storeId",
      type: "autocompletemultiple",
      size: { sm: 12, md: 6, lg: 6 },
      baseurl: "Store",
      autocompletelabel: {
        optionvalue: { id: "storeId" },
      },
    },
    {
      label: "Rules to Use",
      name: "ruleIdsToUse",
      type: "autocompletemultiple",
      size: { sm: 12, md: 6, lg: 6 },
      baseurl: "Rules",
    },
    {
      label: "Additional Workflow JSON",
      name: "additionalWorkflowJson",
      type: "textarea",
      min: "10",
      size: { sm: 12, md: 12, lg: 12 },
    },
  ];

export const ProcessStoreTargetFormValidationSchema = yup.object().shape({
  storeId: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  year: yup.string().typeError("Year is required").required("Year is required"),

  month: yup
    .number()
    .typeError("Month is required")
    .required("Month is required"),

  brandCode: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  ruleIdsToUse: yup
    .array()
    .optional()
    .transform((curr, orig) => (orig === "" ? [] : curr))
    .of(yup.number()),

  additionalWorkflowJson: yup.string().optional(),
});
