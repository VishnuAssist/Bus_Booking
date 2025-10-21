import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { StoreDto } from "../model/storeType";

export const StoreFormFields: FormFieldProps<StoreDto>[] = [
    {
        label: "Store Name",
        name: "name",
        type: "text",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
    {
        label: "Store Code",
        name: "code",
        type: "text",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
    {
        label: "Country Code",
        name: "countryCode",
        type: "autocomplete",
        baseurl: "/Common/GetCountries",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
];

export const storeFormValidationSchema = yup.object().shape({
    name: yup.string().required("Store Name is required"),
    code: yup.string().required("Store Code is required"),
    countryCode: yup.string().required("Country Code is required"),
});