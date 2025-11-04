import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { leaverequesttype } from "../model/LeaveRequest";

export const leaveRequestFormValidationSchema = yup.object({
  requestType: yup.string().required("Request type is required"),
  reason: yup.string().required("Reason is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
});
export const LeaveRequestFormFields: FormFieldProps<leaverequesttype>[] = [
  {
    name: "requestType",
    label: "Request Type",
    type: "select",
    required: true,
    options: [],
    size: { sm: 12, md: 12, lg: 12 },
  },

  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "reason",
    label: "Reason",
    type: "textarea",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  //   {
  //     name: "status",
  //     label: "Status",
  //     type: "select" as const,
  //     required: true,
  //     options: [],
  //     size: { sm: 12, md: 6, lg: 6 },
  //   },
];