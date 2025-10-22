import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { ProcessStaffCommissionPayload } from "../../../model/commissionType";
import { useProcessStaffCommissionMutation } from "../../../Api/commisionApi";
import { toast } from "react-toastify";
import {
  StaffCommissionFormFields,
  staffCommissionFormValidationSchema,
} from "../../../feilds_validation/staffCommissionFields_validation";

interface StaffCommissionDialogueProps {
  open: boolean;
  onClose: () => void;
}

const StaffCommissionDialogue = ({
  open,
  onClose,
}: StaffCommissionDialogueProps) => {
  const [staffCommissionMutation] = useProcessStaffCommissionMutation();

  // Field function for form dialog
  const staffCommissionFields = () => {
    const fields = [...StaffCommissionFormFields];
    return fields;
  };

  const onSubmitStaffCommission = async (
    formData: ProcessStaffCommissionPayload
  ) => {
    const [yearStr, monthStr] = formData.year.toString().split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const updatedFormData = {
      ...formData,
      year,
      month,
    };

    try {
      await staffCommissionMutation(updatedFormData).unwrap();
      onClose();
    } catch {
      toast.error("Error saving entry");
    }
  };

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmitStaffCommission}
      title="Process Staff Commission"
      validationSchema={staffCommissionFormValidationSchema}
      fields={staffCommissionFields()}
      defaultValues={{}}
    />
  );
};

export default StaffCommissionDialogue;
