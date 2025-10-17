import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { Shift } from "../model/shiftType";

export const ShiftFormFields: FormFieldProps<Shift>[] = [
  {
    label: "Assign User",
    name: "userIds",
    type: "autocompletemultiple",
    required: true,
    multiple: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
  {
    label: "Assign Group",
    name: "groupIds",
    type: "autocompletemultiple",
    required: true,
    multiple: true,
    size: {  sm: 12, md: 12, lg: 12 },
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
    label: "Start Time",
    name: "startTime",
    type: "time",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "End Time",
    name: "endTime",
    type: "time",
    required: true,
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Store Id",
    name: "storeId",
    type: "number",
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
    label: "Skip Dates",
    name: "skipDates",
    type: "skipDates",
    required: true,
    multiple: true,
    size: { sm: 12, md: 12, lg: 12 },
  },
];

export const shiftFormValidationSchema = yup.object().shape({
  userIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one user must be selected")
    .required("Assign User is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  shiftType: yup.string().required("Shift type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  skipDates: yup.date().required("Skip date is required"),
  notes: yup.string().nullable(),
  storeId: yup.number().nullable(),
});