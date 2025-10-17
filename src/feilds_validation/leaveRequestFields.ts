import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { leaverequesttype } from "../model/LeaveRequest";

export const leaveRequestFormValidationSchema = yup.object({
  requestType: yup.string().required("Request type is required"),
  reason: yup.string().required("Reason is required"),
  date: yup.string().required("Date is required"),
  upload: yup.string().optional(),
  status: yup.string().required("Status is required"),
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
    name: "reason",
    label: "Reason",
    type: "textarea",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "upload",
    label: "Upload Document",
    type: "file",
    required: false,
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