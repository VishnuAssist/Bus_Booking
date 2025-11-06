import * as yup from "yup";
import type { ProcessMonthlySummaryPayload } from "../model/commissionType";
import type { FormFieldProps } from "../model/formFeilds";

export const MonthlySummaryFormFields: FormFieldProps<ProcessMonthlySummaryPayload>[] =
  [
    {
      label: "User",
      name: "userId",
      type: "autocomplete",
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
      type: "autocomplete",

      size: { sm: 12, md: 6, lg: 6 },
      baseurl: "Store",
      autocompletelabel: {
        optionvalue: { id: "storeId" },
      },
    },
    {
      label: "User Group",
      name: "userGroupId",
      type: "autocomplete",
      size: { sm: 12, md: 6, lg: 6 },
      baseurl: "UserGroup",
      autocompletelabel: {
        optionvalue: { id: "id" },
      },
      optionLabel: (e) => {
        return e?.groupName || "";
      },
    },
    {
      label: "Year",
      name: "year",
      type: "yearpicker",
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Month",
      name: "month",
      type: "monthpicker",
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Brand",
      name: "brandId",
      type: "autocomplete",
      size: { sm: 12, md: 6, lg: 6 },
      Params: { Category: "Brand" },
    },
    {
      label: "Rules to Use",
      name: "ruleIdsToUse",
      type: "autocompletemultiple",
      size: { sm: 12, md: 6, lg: 6 },
      baseurl: "Rules",
    },
  ];

export const monthlySummaryFormValidationSchema = yup.object().shape({
  userId: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  storeId: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  userGroupId: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  year: yup.number().required("Year is required"),
  month: yup.number().required("Month is required"),

  brandId: yup
    .mixed()
    .optional()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),

  ruleIdsToUse: yup
    .array()
    .of(yup.number())
    .min(1, "At least one rule must be selected"),
});
