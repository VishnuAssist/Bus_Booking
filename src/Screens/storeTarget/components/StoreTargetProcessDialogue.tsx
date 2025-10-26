import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { ProcessStoreTargetRequest } from "../../../model/storeTargetType";
import { useProcessStoreTargetMutation } from "../../../Api/storeTargetApi";
import { toast } from "react-toastify";
import {
  ProcessStoreTargetFormFields,
  ProcessStoreTargetFormValidationSchema,
} from "../../../feilds_validation/processStoreTargetFormFields";

interface StoreTargetProcessDialogueProps {
  open: boolean;
  onClose: () => void;
}

const StoreTargetProcessDialogue = ({
  open,
  onClose,
}: StoreTargetProcessDialogueProps) => {
  const [processStoreTarget] = useProcessStoreTargetMutation();

  const handleProcessTarget = async (formData: ProcessStoreTargetRequest) => {
    try {
      console.log(formData);
      await processStoreTarget(formData).unwrap();
      toast.success("Store target processed successfully");
      onClose();
    } catch (err) {
      console.error("Failed to process store target:", err);
      toast.error("Failed to process store target");
    }
  };

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={handleProcessTarget}
      title="Store Target Process"
      validationSchema={ProcessStoreTargetFormValidationSchema}
      fields={ProcessStoreTargetFormFields}
      defaultValues={{
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        type: 0,
      }}
    />
  );
};

export default StoreTargetProcessDialogue;
