// import { CommonDialog } from "../../../Component/forms/FormDialog";
import { toast } from "react-toastify";
import type { Adminleaverequesttype } from "../../../../model/LeaveRequest";
import { CommonDialog } from "../../../../Component/forms/FormDialog";
import { LeaveRequestFormFields, leaveRequestFormValidationSchema } from "../../../../feilds_validation/leaveRequestFields";

interface StoreTargetFormDialogProps {
  open: boolean;
  onClose: () => void;
  selectedStoreTarget?: StoreTargetDto | null;
}

const LeaveRequestFormDialog = ({
  open,
  onClose,
  selectedStoreTarget,
}: StoreTargetFormDialogProps) => {
  const [addStoreTarget] = useAddStoreTargetMutation();
  const [editStoreTarget] = useEditStoreTargetMutation();
  // Field function for form dialog
  const storeTargetFields = () => {
    const fields = [...LeaveRequestFormFields];
    return fields;
  };

  const onSubmit = async (formData: Adminleaverequesttype) => {
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



  console.log("Edit Data:", editData);

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      title={selectedStoreTarget ? "Edit Store Target" : "Add Store Target"}
      validationSchema={leaveRequestFormValidationSchema}
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

export default LeaveRequestFormDialog;
