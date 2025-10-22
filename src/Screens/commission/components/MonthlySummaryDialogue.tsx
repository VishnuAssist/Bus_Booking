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
    const [yearStr, monthStr] = formData.year.toString().split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const updatedFormData = {
      ...formData,
      year,
      month,
    };

    try {
      await monthlySummaryMutation(updatedFormData).unwrap();
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
      defaultValues={{}}
    />
  );
};

export default MonthlySummaryDialogue;
