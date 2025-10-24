import * as Yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { attendanceType } from "../model/attendanceType";
import { useGetAllStoresQuery } from "../Api/StoreApi";

interface Store {
  storeId: number;
  name: string;
  code: string;
  countryCode: string;
}

export const AttendanceFormFields = (): FormFieldProps<attendanceType>[] => {
  const { data: stores } = useGetAllStoresQuery({});

  return [
    {
      label: "Clock In",
      name: "checkInTime",
      type: "time",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Clock Out",
      name: "checkOutTime",
      type: "time",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Working Hours",
      name: "workingHours",
      type: "text",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Attendance Status",
      name: "attendanceStatus",
      type: "number",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Shift ID",
      name: "shiftId",
      type: "number",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
    },
    {
      label: "Note",
 name: "notes",
      type: "textarea",
      required: true,
      size: { sm: 12, md: 12, lg: 12 },
    },
    {
      label: "Store",
      name: "storeId",
      type: "select",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
     
    },
    {
      label: "User ID",
      name: "userId",
      type: "text",
      required: true,
      size: { sm: 12, md: 6, lg: 6 },
      disabled: true, // User ID is typically non-editable
    },
  ];
};

export const attendanceFormValidationSchema = Yup.object().shape({
  checkInTime: Yup.string()
    .required("Clock In time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Clock In time must be in HH:mm:ss format"
    ),
  checkOutTime: Yup.string()
    .required("Clock Out time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Clock Out time must be in HH:mm:ss format"
    )
    .test(
      "checkOutAfterCheckIn",
      "Clock Out time must be after Clock In time",
      function (value) {
        const { checkInTime } = this.parent;
        if (!checkInTime || !value) return true;
        return value > checkInTime;
      }
    ),
  workingHours: Yup.string()
    .required("Working Hours is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Working Hours must be in HH:mm:ss format"
    ),
  attendanceStatus: Yup.number()
    .required("Attendance Status is required")
    .min(0, "Attendance Status must be a valid number"),    
  shiftId: Yup.number()
    .required("Shift ID is required")
    .min(1, "Shift ID must be a positive number"),
  notes: Yup.string().required("Note is required"),
  storeId: Yup.number()
    .required("Store is required")
    .min(1, "Please select a store"),
  userId: Yup.string().required("User ID is required"),
});