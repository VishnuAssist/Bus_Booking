import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { StoreMonthlyTargetDto } from "../../../model/storeTargetType";
import {
  useAddStoreTargetMutation,
  useEditStoreTargetMutation,
} from "../../../Api/StoreApi";
import { toast } from "react-toastify";
import {
  StoreTargetFormFields,
  storeTargetFormValidationSchema,
} from "../../../feilds_validation/storeTargetFieldsValidation";

interface StoreTargetFormDialogProps {
  open: boolean;
  onClose: () => void;
  selectedStoreTarget?: StoreMonthlyTargetDto | null;
  storeId?: string | null;
}

const StoreTargetFormDialog = ({
  open,
  onClose,
  selectedStoreTarget,
  storeId,
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
        storeId: storeId ? parseInt(storeId) : formData.storeId,
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
          storeId: [],
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          brandCode: [],
          targetAmount: 0,
        }
      }
    />
  );
};

export default StoreTargetFormDialog;
