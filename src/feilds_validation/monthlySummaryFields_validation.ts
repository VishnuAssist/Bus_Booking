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
      label: "Year & Month",
      name: "year",
      type: "date",
      required: true,
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
  ];

export const monthlySummaryFormValidationSchema = yup.object().shape({
  userId: yup.string().trim().required("User is required"),

  storeId: yup.number().typeError("Store is required"),

  userGroupId: yup.number(),

  year: yup.string().typeError("Year is required").required("Year is required"),

  brandId: yup.number().typeError("Brand is required"),

  ruleIdsToUse: yup
    .array()
    .of(yup.number())
    .min(1, "At least one rule must be selected"),

  additionalWorkflowJson: yup.string().optional(),
});
