import * as yup from "yup";

export const leaveRequestFormValidationSchema = yup.object({
  requestType: yup.string().required("Request type is required"),
  reason: yup.string().required("Reason is required"),
  date: yup.string().required("Date is required"),
  upload: yup.string().optional(),
  status: yup.string().required("Status is required"),
});

export const LeaveRequestFormFields = [
  {
    name: "requestType",
    label: "Request Type",
    type: "select" as const,
    required: true,
    options: [],
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "reason",
    label: "Reason",
    type: "textarea" as const,
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "date",
    label: "Date",
    type: "date" as const,
    required: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    name: "upload",
    label: "Upload Document",
    type: "file" as const,
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