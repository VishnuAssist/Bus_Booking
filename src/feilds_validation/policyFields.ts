import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { PolicyData } from "../model/policyType";

export const PolicyFormFields: FormFieldProps<PolicyData>[] = [

     {
    label: "Assign User",
    name: "userIds",
    type: "autocompletemultiple",
    required: true,
    multiple: true,
    baseurl: "Account/all",
    size: { sm: 12, md: 12, lg: 12 },
     optionLabel: (e) => {
        return e?.userName || "";
      },
  },
  {
    label: "Assign Group",
    name: "groupIds",
    type: "autocompletemultiple",
    required: true,
    multiple: true,
    baseurl: "/UserGroup",
    size: {  sm: 12, md: 12, lg: 12 },
     optionLabel: (e) => {
        return e?.groupName || "";
      },
  },
  {
    label: "Policy Name",
    name: "name",
    type: "textarea",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
   {
    label: "Maximum Leave Days",
    name: "maxDays",
    type: "number",
    required: false,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Start Date",
    name: "startDate",
    type: "date",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "End Date",
    name: "endDate",
    type: "date",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    required: false,
    size: { sm: 12, md: 12, lg: 12 },
  },
];

export const policyFormValidationSchema = yup.object().shape({
  userIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one user must be selected")
    .required("Assign User is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  description: yup.string().nullable(),
  maxDays: yup.number().nullable(),
});