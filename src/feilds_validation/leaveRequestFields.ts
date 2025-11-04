import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { leaverequesttype } from "../model/LeaveRequest";

export const leaveRequestFormValidationSchema = yup.object({
leavePolicyId: yup
    .number()
    .typeError("Leave type is required")
    .required("Leave type is required"),
    reason: yup.string().required("Reason is required"),
  startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
});
export const LeaveRequestFormFields: FormFieldProps<leaverequesttype>[] = [
  {
    name: "leavePolicyId",
    label: "Leave Type",
    type: "select",
    required: true,
    baseurl: "/LeaveRequest/my-policies",
    size: { sm: 12, md: 12, lg: 12 },
  },

  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "reason",
    label: "Reason",
    type: "textarea",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
];