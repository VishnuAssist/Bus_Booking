import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommisionContainer from "../../../Component/container";
import CommonTable from "../../../Component/CommenTable";
import Footer from "../../../Component/Footer";
import { CommonDialog } from "../../../Component/forms/FormDialog";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
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
import type { StoreKPIDto } from "../../../model/storeTargetType";

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

  // Process form state
  const [processForm, setProcessForm] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    brandCode: "",
    category: "",
    ruleIds: "",
  });

  // API hooks
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
  const [processKPI, { isLoading: isProcessing }] = useProcessStoreKPIMutation();

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

  const handleProcessKPI = async () => {
    if (!storeId) {
      alert("Store ID is required");
      return;
    }

    if (!processForm.category) {
      alert("Category is required");
      return;
    }

    try {
      const ruleIdsArray = processForm.ruleIds
        ? processForm.ruleIds.split(",").map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
        : undefined;

      await processKPI({
        year: processForm.year,
        month: processForm.month,
        storeId: parseInt(storeId),
        brandCode: processForm.brandCode,
        category: processForm.category,
        ruleIdsToUse: ruleIdsArray,
      }).unwrap();

      alert("Store KPI processed successfully!");
      setProcessDialogOpen(false);
      setProcessForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        brandCode: "",
        category: "",
        ruleIds: "",
      });
    } catch (err) {
      console.error("Failed to process KPI:", err);
      alert("Failed to process KPI");
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

      {/* Add/Edit KPI Dialog */}
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

      {/* Process KPI Dialog */}
      <Dialog open={processDialogOpen} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Process Store KPI
          </Typography>
          <Button color="error" onClick={() => setProcessDialogOpen(false)}>
            Close
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{xs:12}} >
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Year"
                  value={processForm.year}
                  onChange={(e) =>
                    setProcessForm({ ...processForm, year: parseInt(e.target.value) })
                  }
                />
              </Grid>
              <Grid size={{xs:12}} >
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Month"
                  value={processForm.month}
                  onChange={(e) =>
                    setProcessForm({ ...processForm, month: parseInt(e.target.value) })
                  }
                  inputProps={{ min: 1, max: 12 }}
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  size="small"
                  label="Brand Code"
                  value={processForm.brandCode}
                  onChange={(e) =>
                    setProcessForm({ ...processForm, brandCode: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  size="small"
                  label="Category"
                  value={processForm.category}
                  onChange={(e) =>
                    setProcessForm({ ...processForm, category: e.target.value })
                  }
                  required
                  helperText="Category to process (e.g., Electronics, Clothing)"
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  size="small"
                  label="Rule IDs (comma-separated)"
                  placeholder="e.g., 1,2,3"
                  value={processForm.ruleIds}
                  onChange={(e) =>
                    setProcessForm({ ...processForm, ruleIds: e.target.value })
                  }
                  helperText="Optional: Enter rule IDs separated by commas"
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ textAlign: "end", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleProcessKPI}
              disabled={isProcessing || !processForm.brandCode || !processForm.category}
            >
              {isProcessing ? <CircularProgress size={20} /> : "Process"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreKPI;