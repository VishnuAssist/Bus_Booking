import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { Adminleaverequesttype } from "../model/LeaveRequest";

export const AdminLeaveReqFieldsValidationSchema = yup.object({
  userIds: yup.string().required("Assign User is required"),
  requestType: yup.string().required("Request type is required"),
  reason: yup.string().required("Reason is required"),
  date: yup.string().required("Date is required"),
});

export const AdminLeaveReqFields: FormFieldProps<Adminleaverequesttype>[] = [
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
    name: "requestType",
    label: "Request Type",
    type: "select",
    required: true,
    options: [],
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    name: "date",
    label: "Date",
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
  }
];