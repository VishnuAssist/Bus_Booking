import * as yup from "yup";
import type { ProcessStaffCommissionPayload } from "../model/commissionType";
import type { FormFieldProps } from "../model/formFeilds";

export const StaffCommissionFormFields: FormFieldProps<ProcessStaffCommissionPayload>[] =
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
      label: "Year & Month",
      name: "year",
      type: "date",
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
    {
      label: "Additional Workflow JSON",
      name: "additionalWorkflowJson",
      type: "textarea",
      min: "10",
      size: { sm: 12, md: 12, lg: 12 },
    },
      {
    name: "commissionTypeId",
    label: "Type",
    type: "autocomplete",
    size: { sm: 12, md: 6, lg: 6 },
    baseurl: "/Dictionary?Category=1",
    autocompletelabel: {
      optionvalue: { id: "id" },
    },
  },
  ];

export const staffCommissionFormValidationSchema = yup.object().shape({
  userId: yup.string().trim().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),

  storeId: yup.number().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),

  year: yup.string().typeError("Year is required").required("Year is required"),

  brandId: yup.number().optional().transform((curr, orig) => orig === '' ? null : curr).nullable(),

  ruleIdsToUse: yup
    .array()
    .of(yup.number())
    .min(1, "At least one rule must be selected"),

  additionalWorkflowJson: yup.string().optional(),
});
