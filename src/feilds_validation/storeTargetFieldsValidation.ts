
import * as yup from "yup";

export const storeTargetFormValidationSchema = yup.object({
  storeId: yup.number().required("Store ID is required").positive("Must be positive"),
  year: yup
    .number()
    .required("Year is required")
    .min(2000, "Year must be at least 2000")
    .max(2100, "Year must be less than 2100"),
  month: yup
    .number()
    .required("Month is required")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  brandCode: yup.string().required("Brand Code is required"),
  targetAmount: yup
    .number()
    .required("Target Amount is required")
    .min(0, "Target Amount must be positive"),
});


import type { FormFieldProps } from "../model/formFeilds";
import type { ProcessKPIRequest, StoreMonthlyTargetDto } from "../model/storeTargetType";


export const StoreTargetFormFields = [
  {
    name: "year",
    label: "Year",
    type: "number" as const,
    required: true,
  },
  {
    name: "month",
    label: "Month",
    type: "number" as const,
    required: true,
  },
     {
      label: "Brand",
      name: "brandCode",
      type: "autocomplete",
      size: { sm: 12, md: 6, lg: 6 },
      Params: { Category: "Brand" },
      autocompletelabel:{
        optionvalue: { id: "code"  },
      }
    },
  {
    name: "targetAmount",
    label: "Target Amount",
    type: "number" as const,
    required: true,
  },
];


export const ProcessStoreTargetFormFields: FormFieldProps<StoreMonthlyTargetDto>[] =
  [
    
  

    {
      label: "Year & Month",
      name: "year",
      type: "date",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Brand",
      name: "brandCode",
      type: "autocomplete",
      size: { sm: 12, md: 6, lg: 6 },
      Params: { Category: "Brand" },
      autocompletelabel:{
        optionvalue: { id: "code"  },
      }
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
 

  storeId: yup.mixed().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),



  year: yup.string().typeError("Year is required").required("Year is required"),

  brandCode: yup.mixed().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),

  ruleIdsToUse: yup
    .array()
    .of(yup.number())
    .min(1, "At least one rule must be selected"),

  additionalWorkflowJson: yup.string().optional(),
});


export const ProcessStoreKpiFormFields: FormFieldProps<ProcessKPIRequest>[] = [
  {
      label: "Year & Month",
      name: "year",
      type: "date",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
  

     {
      label: "Brand",
      name: "brandCode",
      type: "autocomplete",
      size: { sm: 12, md: 6, lg: 6 },
      Params: { Category: "Brand" },
      autocompletelabel:{
        optionvalue: { id: "code"  },
      }
    },
  {
    label: "Category",
    name: "category",
    type: "text",
    required: true,


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

export const ProcessStoreKpiFormValidationSchema = yup.object().shape({
  storeId: yup.mixed().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),



  year: yup.string().typeError("Year is required").required("Year is required"),

  brandCode: yup.mixed().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),

 

  category: yup
    .string()
    .required("Category is required")
    .trim(),

  ruleIdsToUse: yup
    .array()
    .of(yup.number())
    .min(1, "At least one rule must be selected"),

  additionalWorkflowJson: yup.string().optional(),
});