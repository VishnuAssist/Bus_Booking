import * as yup from "yup";
import type { FormFieldProps } from "../model/formFeilds";
import type { staffAchivement } from "../model/staffAchivement";


export const StaffAchivement : FormFieldProps<staffAchivement>[] = [
    {
        label: "Achivement Type",
        name: "achivementType",
        type: "select",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
    {
        label: "Activity Type",
        name: "activityType",
        type: "select",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
    {
        label: "Activity Description",
        name: "activitydescriptation",
        type: "textarea",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
    {
        label: "File Upload",
        name: "fileUpload",
        type: "D&DUpload",
        required: true,
        size: { sm: 12, md: 12, lg: 12 },
    },
];

export const staffAchivementFormValidationSchema = yup.object().shape({
    achievementType: yup.string().required("Achivement Type is required"),
    activityType: yup.string().required("Acvitity Type is required"),
    activityDescprition: yup.string().required("Activity Descpririon is required"),
});