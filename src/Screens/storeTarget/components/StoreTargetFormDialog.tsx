import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { StoreMonthlyTargetDto } from "../../../model/storeTargetType";
import {
  useAddStoreTargetMutation,
  useEditStoreTargetMutation,
} from "../../../Api/storeTargetApi";
import { toast } from "react-toastify";
import {
  StoreTargetFormFields,
  storeTargetFormValidationSchema,
} from "../../../feilds_validation/storeTargetFormFieldsValidation";

interface StoreTargetFormDialogProps {
  open: boolean;
  onClose: () => void;
  selectedStoreTarget?: StoreMonthlyTargetDto | null;
}

const StoreTargetFormDialog = ({
  open,
  onClose,
  selectedStoreTarget,
}: StoreTargetFormDialogProps) => {
  const [addStoreTarget] = useAddStoreTargetMutation();
  const [editStoreTarget] = useEditStoreTargetMutation();
  // Field function for form dialog
  const storeTargetFields = () => {
    const fields = [...StoreTargetFormFields];
    return fields;
  };

  const onSubmit = async (formData: StoreMonthlyTargetDto) => {
    try {
      const payload = {
        ...formData,
      };

      if (selectedStoreTarget?.id) {
        await editStoreTarget({
          ...payload,
          id: selectedStoreTarget.id,
        }).unwrap();
        toast.success("Store Target updated successfully");
      } else {
        await addStoreTarget(payload).unwrap();
        toast.success("Store Target added successfully");
      }
      onClose();
    } catch (err) {
      console.error("Failed to save store target:", err);
      toast.error("Failed to save store target");
    }
  };

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      title={selectedStoreTarget ? "Edit Store Target" : "Add Store Target"}
      validationSchema={storeTargetFormValidationSchema}
      fields={storeTargetFields()}
      defaultValues={
        selectedStoreTarget || {
          storeIds: [],
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          brandCodes: [],
          targetAmount: 0,
          userIds: [],
        }
      }
    />
  );
};

export default StoreTargetFormDialog;
