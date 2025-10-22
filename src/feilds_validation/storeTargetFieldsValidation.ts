
import * as yup from "yup";

export const storeTargetFormValidationSchema = yup.object({
  storeId: yup.number().required("Store ID is required").positive("Must be positive"),
  year: yup
    .number()
    .required("Year is required")
    .min(2000, "Year must be at least 2000")
    .max(2100, "Year must be less than 2100"),
  month: yup
    .number()
    .required("Month is required")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  brandCode: yup.string().required("Brand Code is required"),
  targetAmount: yup
    .number()
    .required("Target Amount is required")
    .min(0, "Target Amount must be positive"),
});

export const StoreTargetFormFields = [
  {
    name: "year",
    label: "Year",
    type: "number" as const,
    required: true,
  },
  {
    name: "month",
    label: "Month",
    type: "number" as const,
    required: true,
  },
  {
    name: "brandCode",
    label: "Brand Code",
    type: "text" as const,
    required: true,
  },
  {
    name: "targetAmount",
    label: "Target Amount",
    type: "number" as const,
    required: true,
  },
];