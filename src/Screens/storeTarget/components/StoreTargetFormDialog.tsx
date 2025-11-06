import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { StoreTargetDto } from "../../../model/storeTargetType";
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
  selectedStoreTarget?: StoreTargetDto | null;
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

  const onSubmit = async (formData: StoreTargetDto) => {
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

  // Transform response data to form data
  const transformResponseToFormData = (responseData: StoreTargetDto) => {
    if (!responseData) return null;

    const { stores, users, ...restData } = responseData;

    return {
      ...restData,
      storeIds: stores ? stores.map((store) => store.id) : [],
      userIds: users ? users.map((user) => user.id) : [],
    };
  };


  const editData = selectedStoreTarget
    ? transformResponseToFormData(selectedStoreTarget)
    : null;

  console.log("Edit Data:", editData);

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      title={selectedStoreTarget ? "Edit Store Target" : "Add Store Target"}
      validationSchema={storeTargetFormValidationSchema}
      fields={storeTargetFields()}
      defaultValues={
        editData || {
          storeIds: [],
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          brandCodes: [],
          targetAmount: 0,
          userIds: [],
          type: null,
        }
      }
    />
  );
};

export default StoreTargetFormDialog;
