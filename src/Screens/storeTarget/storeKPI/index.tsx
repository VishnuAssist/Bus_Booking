import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommisionContainer from "../../../Component/container";
import CommonTable from "../../../Component/CommenTable";
import Footer from "../../../Component/Footer";
import { CommonDialog } from "../../../Component/forms/FormDialog";
import {

  Paper,
  Alert,
 
} from "@mui/material";

import {
  useGetStoreKPIsQuery,
  useAddStoreKPIMutation,
  useEditStoreKPIMutation,
  useDeleteStoreKPIMutation,
  useProcessStoreKPIMutation,
  
} from "../../../Api/StoreApi";
import type { QueryParamsType } from "../../../Dto/formDto";
import { ValidateParams } from "../../../Lib/utile";
import AppPagination from "../../../Component/AppPagination";
import * as yup from "yup";
import PageHeader from "../../../Component/commonPageHeader";
import type { ProcessKPIRequest, StoreKPIDto } from "../../../model/storeTargetType";
import { ProcessStoreKpiFormFields, ProcessStoreKpiFormValidationSchema } from "../../../feilds_validation/storeTargetFieldsValidation";
import { toast } from "react-toastify";

const storeKPIValidationSchema = yup.object({
  kpiName: yup.string().required("KPI Name is required"),
  kpiTarget: yup.number().min(0, "Must be positive"),
  kpiAchievement: yup.number().min(0, "Must be positive"),
});

const StoreKPI = () => {
  const [searchParams] = useSearchParams();
  const storeTargetId = searchParams.get("targetId");
  const storeId = searchParams.get("storeId");

  const [params, setParams] = useState<QueryParamsType>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<StoreKPIDto | null>(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);


  const { data: kpisData, isLoading, error } = useGetStoreKPIsQuery(
    {
      storeTargetId: storeTargetId ? parseInt(storeTargetId) : 0,
      params: ValidateParams(params),
    },
    { skip: !storeTargetId }
  );

  const [addKPI] = useAddStoreKPIMutation();
  const [editKPI] = useEditStoreKPIMutation();
  const [deleteKPI] = useDeleteStoreKPIMutation();
  const [processKPI] = useProcessStoreKPIMutation();

  const KPIColumns = [
    { id: "id", label: "ID" },
    { id: "kpiName", label: "KPI Name" },
    { id: "kpiTarget", label: "Target" },
    { id: "kpiAchievement", label: "Achievement" },
    { id: "ruleId", label: "Rule ID" },
  ];

  const kpiFields = [
    {
      name: "kpiName",
      label: "KPI Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "kpiTarget",
      label: "KPI Target",
      type: "number" as const,
    },
    {
      name: "kpiAchievement",
      label: "KPI Achievement",
      type: "number" as const,
    },
  ];

  const onSubmit = async (formData: StoreKPIDto) => {
    try {
      const payload = {
        ...formData,
        storeTargetId: storeTargetId ? parseInt(storeTargetId) : formData.storeTargetId,
      };

      if (selectedKPI?.id) {
        await editKPI({ ...payload, id: selectedKPI.id }).unwrap();
        console.log("KPI updated successfully");
      } else {
        await addKPI(payload).unwrap();
        console.log("KPI added successfully");
      }
      setModalOpen(false);
      setSelectedKPI(null);
    } catch (err) {
      console.error("Failed to save KPI:", err);
    }
  };

  const handleDelete = async (row: StoreKPIDto) => {
    if (row.id && window.confirm("Are you sure you want to delete this KPI?")) {
      try {
        await deleteKPI(row.id).unwrap();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };
 

  const handleProcessKPI = async (formData:ProcessKPIRequest) => {
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
      storeId: parseInt(storeId),
  StoreTarget: parseInt(storeTargetId || "0"),
    };
console.log("Processing with data:", updatedFormData);
     const res= await processKPI(updatedFormData).unwrap();
console.log("Process result:", res);
  
      setProcessDialogOpen(false);

    } catch (err) {
      console.error("Failed to process KPI:", err);
   
    }
  };

  if (!storeTargetId) {
    return (
      <CommisionContainer>
        <Alert severity="warning">Store Target ID is required to view KPIs</Alert>
      </CommisionContainer>
    );
  }

  if (isLoading) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store KPIs"
          btntitle="Add KPI"
          onActionClick={() => setModalOpen(true)}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading KPIs...</div>
      </CommisionContainer>
    );
  }

  if (error) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store KPIs"
          btntitle="Add KPI"
          onActionClick={() => setModalOpen(true)}
        />
        <Alert severity="error">Error loading KPIs. Please try again.</Alert>
      </CommisionContainer>
    );
  }

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Store KPIs"
          btntitle="Add KPI"
          onActionClick={() => setModalOpen(true)}
          btntitle2="Process KPI"
          onActionClick2={() => setProcessDialogOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <CommonTable
            columns={KPIColumns}
            rows={kpisData?.items || []}
            actions={{
              onEdit: (row) => {
                setSelectedKPI(row);
                setModalOpen(true);
              },
              onDelete: handleDelete,
            }}
          />
          {kpisData?.metaData && (
            <AppPagination
              metaData={kpisData.metaData}
              onPageChange={(page: number) => setParams({ ...params, PageNumber: page })}
            />
          )}
        </Paper>
      </CommisionContainer>

      <Footer />


      <CommonDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedKPI(null);
        }}
        onSubmit={onSubmit}
        title={selectedKPI ? "Edit KPI" : "Add KPI"}
        validationSchema={storeKPIValidationSchema}
        fields={kpiFields}
        defaultValues={
          selectedKPI || {
            storeTargetId: storeTargetId ? parseInt(storeTargetId) : undefined,
            kpiName: "",
            kpiTarget: 0,
            kpiAchievement: 0,
          }
        }
      />
<CommonDialog
     open={processDialogOpen}
      onClose={() => setProcessDialogOpen(false)}
      onSubmit={handleProcessKPI}
      title="Store Target Process"
      validationSchema={ProcessStoreKpiFormValidationSchema}
      fields={ProcessStoreKpiFormFields}
      defaultValues={{}}
    />
      
    </>
  );
};

export default StoreKPI;