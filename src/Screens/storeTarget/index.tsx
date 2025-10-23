import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CommisionContainer from "../../Component/container";
import CommonTable from "../../Component/CommenTable";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import {

  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import PageHeader from "../../Component/commonPageHeader";
import {
  ProcessStoreTargetFormFields,
  ProcessStoreTargetFormValidationSchema,
  StoreTargetFormFields,
  storeTargetFormValidationSchema,
} from "../../feilds_validation/storeTargetFieldsValidation";
import {
  useGetAllStoreTargetsQuery,
  useAddStoreTargetMutation,
  useEditStoreTargetMutation,
  useDeleteStoreTargetMutation,
  useProcessStoreTargetMutation,

} from "../../Api/StoreApi";
import type { QueryParamsType } from "../../Dto/formDto";
import { ValidateParams } from "../../Lib/utile";
import AppPagination from "../../Component/AppPagination";
import type { ProcessStoreTargetRequest, StoreMonthlyTargetDto } from "../../model/storeTargetType";
import { toast } from "react-toastify";

const StoreTarget = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const storeId = searchParams.get("id");
 

  const [params, setParams] = useState<QueryParamsType>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStoreTarget, setSelectedStoreTarget] = useState<StoreMonthlyTargetDto | null>(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);



  
  const { data: targetsData, isLoading, error } = useGetAllStoreTargetsQuery({
    ...ValidateParams(params),
    StoreId: storeId ? parseInt(storeId) : undefined,
  });

  const [addStoreTarget] = useAddStoreTargetMutation();
  const [editStoreTarget] = useEditStoreTargetMutation();
  const [deleteStoreTarget] = useDeleteStoreTargetMutation();
  const [processStoreTarget] = useProcessStoreTargetMutation();

  const StoreTargetColumns = [
    { id: "id", label: "ID" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
    { id: "brandCode", label: "Brand Code" },
    { id: "targetAmount", label: "Target Amount", format: (value: number) => `₹${value.toLocaleString()}` },
  ];

  const onSubmit = async (formData: StoreMonthlyTargetDto) => {
    try {
      const payload = {
        ...formData,
        storeId: storeId ? parseInt(storeId) : formData.storeId,
      };

      if (selectedStoreTarget?.id) {
        await editStoreTarget({ ...payload, id: selectedStoreTarget.id }).unwrap();
        alert("Store Target updated successfully");
      } else {
        await addStoreTarget(payload).unwrap();
        alert("Store Target added successfully");
      }
      setModalOpen(false);
      setSelectedStoreTarget(null);
    } catch (err) {
      console.error("Failed to save store target:", err);
      alert("Failed to save store target");
    }
  };

  const handleDelete = async (row: StoreMonthlyTargetDto) => {
    if (row.id && window.confirm("Are you sure you want to delete this store target?")) {
      try {
        await deleteStoreTarget(row.id).unwrap();
        alert("Store Target deleted successfully");
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete store target");
      }
    }
  };

  const handleViewKPIs = (row: StoreMonthlyTargetDto) => {
    navigate(`/settings/storeKPI?targetId=${row.id}&storeId=${storeId}`);
  };

  const handleProcessTarget = async (formData:ProcessStoreTargetRequest) => {
    if (!storeId) {
      toast.error("Store ID is required");
      return;
    }

  
    try {
      const [yearStr, monthStr] = formData.year.toString().split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const updatedFormData = {
      ...formData,
      year,
      month,
      storeId: parseInt(storeId)
    

    };
    console.log("Processing with data:", updatedFormData);

  const res=    await processStoreTarget(updatedFormData).unwrap();
console.log("Process result:", res);
   
      setProcessDialogOpen(false);
   
    } catch (err) {
      console.error("Failed to process store target:", err);
      
    }
  };

  const storeTargetFields = () => {
    const fields = [...StoreTargetFormFields];
    // Add storeId if not in URL
    if (!storeId) {
      fields.unshift({
        name: "storeId",
        label: "Store ID",
        type: "number",
        required: true,
      });
    }
    return fields;
  };

  if (isLoading) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store Target"
          btntitle="Add Store Target"
          onActionClick={() => setModalOpen(true)}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading store targets...</Typography>
        </div>
      </CommisionContainer>
    );
  }

  if (error) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store Target"
          btntitle="Add Store Target"
          onActionClick={() => setModalOpen(true)}
        />
        <Alert severity="error">Error loading store targets. Please try again.</Alert>
      </CommisionContainer>
    );
  }

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title={`Store Target ${storeId ? `- Store #${storeId}` : ''}`}
          btntitle="Add Store Target"
          onActionClick={() => setModalOpen(true)}
          btntitle2="Process Target"
          onActionClick2={() => setProcessDialogOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <CommonTable
            columns={StoreTargetColumns}
            rows={targetsData?.items || []}
            actions={{
              onView: handleViewKPIs,
              onEdit: (row) => {
                setSelectedStoreTarget(row);
                setModalOpen(true);
              },
              onDelete: handleDelete,
            }}
          />
          {targetsData?.metaData && (
            <AppPagination
              metaData={targetsData.metaData}
              onPageChange={(page: number) => setParams({ ...params, PageNumber: page })}
            />
          )}
        </Paper>
      </CommisionContainer>

      <Footer />

      {/* Add/Edit Store Target Dialog */}
      <CommonDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedStoreTarget(null);
        }}
        onSubmit={onSubmit}
        title={selectedStoreTarget ? "Edit Store Target" : "Add Store Target"}
        validationSchema={storeTargetFormValidationSchema}
        fields={storeTargetFields()}
        defaultValues={
          selectedStoreTarget || {
            storeId: storeId ? parseInt(storeId) : undefined,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            brandCode: "",
            targetAmount: 0,
          }
        }
      />
  <CommonDialog
     open={processDialogOpen}
      onClose={() => setProcessDialogOpen(false)}
      onSubmit={handleProcessTarget}
      title="Store Target Process"
      validationSchema={ProcessStoreTargetFormValidationSchema}
      fields={ProcessStoreTargetFormFields}
      defaultValues={{}}
    />
      
  
    </>
  );
};

export default StoreTarget;