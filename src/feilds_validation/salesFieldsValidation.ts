import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { SalesType } from "../model/salesType";

export const SalesFormFields: FormFieldProps<SalesType>[] = [
    {
        label: "Commision Category",
        name: "category",
        type: "select",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Employee Role",
        name: "role",
        type: "select",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Employee Code",
        name: "code",
        type: "text",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Sales Date",
        name: "date",
        type: "date",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Store",
        name: "store",
        type: "select",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Brand",
        name: "brand",
        type: "select",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Product Name",
        name: "product",
        type: "select",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
    {
        label: "Product Type",
        name: "productType",
        type: "text",
        required: true,
        size: { sm: 12, md: 6, lg: 6 },
    },
];

export const salesFormValidationSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
    name: yup.string().required("Employee Name is required"),
    role: yup.string().required("Employee Role is required"),
    code: yup.string().required("Employee Code is required"),
    date: yup.date().required("Sales Date is required"),
    store: yup.string().required("Store is required"),
    brand: yup.string().required("Brand is required"),
    product: yup.string().required("Product is required"),
    productType: yup.string().required("Product Type is required"),
});