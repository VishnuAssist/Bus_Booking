import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { ShiftType } from "../model/shiftType";

export const ShiftFormFields: FormFieldProps<ShiftType>[] = [
  {
    label: "Start Time",
    name: "startTime",
    type: "datetime-local",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "End Time",
    name: "endTime",
    type: "datetime-local",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Shift Type",
    name: "shiftType",
    type: "select",
    required: true,
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
    label: "Skip Date",
    name: "skipDate",
    type: "date",
    required: false,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Notes",
    name: "notes",
    type: "text",
    required: false,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    label: "Store ID",
    name: "storeId",
    type: "number",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
];
export const shiftFormValidationSchema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  shiftType: yup
    .number()
    .typeError("Shift type is required")
    .required("Shift type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  skipDate: yup.date().nullable(), 
  notes: yup.string().nullable(),
  storeId: yup
    .number()
    .typeError("Store ID is required")
    .required("Store ID is required"),
});
