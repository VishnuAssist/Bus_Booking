import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { Shift } from "../model/shiftType";

export const ShiftFormFields: FormFieldProps<Shift>[] = [
  // {
  //   label: "Assign User",
  //   name: "assignUser",
  //   type: "select",
  //   required: true,
  //   size: { sm: 12, md: 12, lg: 12 },
  // },
  // {
  //   label: "Store Name",
  //   name: "storename",
  //   type: "text",
  //   required: true,
  //   size: { sm: 12, md: 6, lg: 6 },
  // },
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
    label: "Skip Dates",
    name: "skipDates",
    type: "date",
    required: false,
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
];

export const shiftFormValidationSchema = yup.object().shape({
  // assignUser: yup.string().required("User Name is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  shiftType: yup
    .number()
    .typeError("Shift type is required")
    .required("Shift type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  skipDates: yup.date().nullable(),
  notes: yup.string().nullable(),
  storeId: yup.number().nullable(),
});