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
    try {
      await staffCommissionMutation(formData).unwrap();
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
      defaultValues={{
        commissionTypeId: 0,
        ruleId: 0,
        payout: 0,
      }}
    />
  );
};

export default StaffCommissionDialogue;
