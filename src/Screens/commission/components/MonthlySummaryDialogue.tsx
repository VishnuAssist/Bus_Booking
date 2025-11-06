import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { ProcessMonthlySummaryPayload } from "../../../model/commissionType";
import { useProcessMonthlySummaryMutation } from "../../../Api/commisionApi";
import { toast } from "react-toastify";
import {
  MonthlySummaryFormFields,
  monthlySummaryFormValidationSchema,
} from "../../../feilds_validation/monthlySummaryFields_validation";

interface MonthlySummaryDialogueProps {
  open: boolean;
  onClose: () => void;
}

const MonthlySummaryDialogue = ({
  open,
  onClose,
}: MonthlySummaryDialogueProps) => {
  const [monthlySummaryMutation] = useProcessMonthlySummaryMutation();

  // Field function for form dialog
  const monthlySummaryFields = () => {
    const fields = [...MonthlySummaryFormFields];
    return fields;
  };

  const onSubmitMonthlySummary = async (
    formData: ProcessMonthlySummaryPayload
  ) => {
    try {
      await monthlySummaryMutation(formData).unwrap();
      onClose();
    } catch {
      toast.error("Error saving entry");
    }
  };

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmitMonthlySummary}
      title="Process Monthly Summary"
      validationSchema={monthlySummaryFormValidationSchema}
      fields={monthlySummaryFields()}
      defaultValues={{
        storeId: 0,
        userGroupId: 0,
        brandId: 0,
      }}
    />
  );
};

export default MonthlySummaryDialogue;
