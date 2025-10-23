import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommisionContainer from "../../Component/container";
import CommonTable from "../../Component/CommenTable";
import Footer from "../../Component/Footer";
import StoreTargetFormDialog from "./components/StoreTargetFormDialog";
import StoreTargetProcessDialogue from "./components/StoreTargetProcessDialogue";
import { Typography, Paper, Alert, CircularProgress } from "@mui/material";
import PageHeader from "../../Component/commonPageHeader";
import {
  useGetAllStoreTargetsQuery,
  useDeleteStoreTargetMutation,
} from "../../Api/StoreApi";
import type { QueryParamsType } from "../../Dto/formDto";
import { ValidateParams } from "../../Lib/utile";
import AppPagination from "../../Component/AppPagination";
import type { StoreMonthlyTargetDto } from "../../model/storeTargetType";
import { storeTargetTableDataService } from "./services/storeTargetTableDataService";

const StoreTarget = () => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("id");

  const [params, setParams] = useState<QueryParamsType>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStoreTarget, setSelectedStoreTarget] =
    useState<StoreMonthlyTargetDto | null>(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);

  const {
    data: targetsData,
    isLoading,
    error,
  } = useGetAllStoreTargetsQuery({
    ...ValidateParams(params),
    StoreId: storeId ? parseInt(storeId) : undefined,
  });

  const { columns, rows } = storeTargetTableDataService(targetsData?.items);

  const [deleteStoreTarget] = useDeleteStoreTargetMutation();

  const handleCloseDialog = () => {
    setModalOpen(false);
    setSelectedStoreTarget(null);
  };

  const handleDelete = async (row: StoreMonthlyTargetDto) => {
    if (
      row.id &&
      window.confirm("Are you sure you want to delete this store target?")
    ) {
      try {
        await deleteStoreTarget(row.id).unwrap();
        alert("Store Target deleted successfully");
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete store target");
      }
    }
  };

  const handleCloseProcessDialog = () => {
    setProcessDialogOpen(false);
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
        <Alert severity="error">
          Error loading store targets. Please try again.
        </Alert>
      </CommisionContainer>
    );
  }

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title={`Store Target ${storeId ? `- Store #${storeId}` : ""}`}
          btntitle="Add Store Target"
          onActionClick={() => setModalOpen(true)}
          btntitle2="Process Target"
          onActionClick2={() => setProcessDialogOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <CommonTable<StoreMonthlyTargetDto>
            columns={columns}
            rows={rows}
            actions={{
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
              onPageChange={(page: number) =>
                setParams({ ...params, PageNumber: page })
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      <Footer />

      {/* Add/Edit Store Target Dialog */}
      <StoreTargetFormDialog
        open={isModalOpen}
        onClose={handleCloseDialog}
        selectedStoreTarget={selectedStoreTarget}
        storeId={storeId}
      />

      <StoreTargetProcessDialogue
        open={processDialogOpen}
        onClose={handleCloseProcessDialog}
      />
    </>
  );
};

export default StoreTarget;
