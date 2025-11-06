import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { SalesType } from "../model/salesType";

export const SalesFormFields: FormFieldProps<SalesType>[] = [
  {
    label: "Employee Code",
    name: "employeeCode",
    type: "autocomplete",
    multiple: true,
    baseurl: "Account/all",
    size: { sm: 12, md: 6, lg: 6 },
    autocompletelabel: {
      optionvalue: { id: "employeeCode" },
    },
    optionLabel: (e) => {
      return e?.userName || "";
    },
  },
  {
    label: "Store Code",
    name: "storeCode",
    type: "autocomplete",
    multiple: true,
    baseurl: "/Store",
    size: { sm: 12, md: 6, lg: 6 },
    autocompletelabel: {
      optionvalue: { id: "code" },
    },
  },
  {
    label: "Sale Amount",
    name: "saleAmount",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Brand",
    name: "brandCode",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Category",
    name: "category",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Sub Category",
    name: "subCategoryId",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Sub Sub Category",
    name: "subSubCategoryId",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Sale Type Id",
    name: "saleTypeId",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Product Price",
    name: "productPrice",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Tax",
    name: "tax",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Discount",
    name: "discount",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Quantity",
    name: "quantity",
    type: "number",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Invoice Number",
    name: "invoiceNumber",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Item Number",
    name: "itemNumber",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Notes",
    name: "notes",
    type: "textarea",
    required: false,
    size: { sm: 12, md: 12, lg: 12 },
  },
];

export const salesFormValidationSchema = yup.object().shape({
  // departmentId: yup.string().required("Department is required"),
  //   brandCode: yup.string().required("Brand is required"),
  //   category: yup.string().required("Category is required"),
  //   subCategoryId: yup.string().nullable(),
  //   subSubCategoryId: yup.string().nullable(),
  //   productPrice: yup
  //     .number()
  //     .required("Product Price is required")
  //     .min(0, "Product Price cannot be negative"),
  //   tax: yup
  //     .number()
  //     .required("Tax is required")
  //     .min(0, "Tax cannot be negative"),
  //   discount: yup
  //     .number()
  //     .required("Discount is required")
  //     .min(0, "Discount cannot be negative"),
  //   quantity: yup
  //     .number()
  //     .required("Quantity is required")
  //     .min(1, "Quantity must be at least 1"),
  //   invoiceNumber: yup.string().required("Invoice Number is required"),
  //   itemNumber: yup.string().required("Item Number is required"),
  //   notes: yup.string().nullable(),

  //   saleTypeId: yup.number().optional(),
  employeeCode: yup.string().required("Employee Code is required"),
  storeCode: yup.string().required("store Code is required"),
  saleAmount: yup
    .number()
    .required("Sale Amount is required")
    .min(0, "Sale Amount cannot be negative"),
});
