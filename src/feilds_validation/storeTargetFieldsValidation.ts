import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { StoreTargetType } from "../model/storeTargetType";


export const StoreTargetFormFields: FormFieldProps<StoreTargetType>[] = [
    {
        label: "Year",
        name: "year",
        type: "date",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Month",
        name: "month",
        type: "date",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Target Amount",
        name: "targetAmount",
        type: "number",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    }
];

export const storeTargetFormValidationSchema = yup.object().shape({
    year: yup.date().required("Year is required"),
    month: yup.date().required("Month is required"),
    targetAmount: yup.number().required("Number is required"),
});