import * as yup from "yup";
import type { dictionarytype } from "../model/Dictionary";
import type { FormFieldProps } from "../model/formFeilds";
//
export const DictionaryFormFields: FormFieldProps<dictionarytype>[] = [
  {
    label: "Category",
    name: "categoryId",
    type: "select",
    Params: { Category: "category" },
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Name",
    name: "name",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Code",
    name: "code",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    size: { sm: 12, md: 6, lg: 6 },
  },

  {
    label: "Status",
    name: "isActive",
    type: "select",
    size: { sm: 12, md: 6, lg: 6 },
  },
];

export const dictionaryFormValidationSchema = yup.object().shape({
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required"),

  name: yup.string().trim().required("Name is required"),
  code: yup
    .string()
    .trim()
    .required("Code is required")
    .max(10, "Code must be less than 10 characters"),

  description: yup.string().trim().required("Description is required"),

  isActive: yup
    .boolean()
    .typeError("Status is required")
    .required("Status is required"),
});
