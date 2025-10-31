import { useState } from "react";
import CommisionContainer from "../../Component/container";
import CommonTable from "../../Component/CommenTable";
import StoreTargetFormDialog from "./components/StoreTargetFormDialog";
import StoreTargetProcessDialogue from "./components/StoreTargetProcessDialogue";
import { Typography, Paper, Alert, CircularProgress } from "@mui/material";
import PageHeader from "../../Component/commonPageHeader";
import {
  useGetAllStoreTargetsQuery,
  useDeleteStoreTargetMutation,
} from "../../Api/storeTargetApi";
import AppPagination from "../../Component/AppPagination";
import type {
  StoreTargetDto,
  StoreTargetQueryParamsType,
} from "../../model/storeTargetType";
import { storeTargetTableDataService } from "./services/storeTargetTableDataService";
import StoreTargetFilter from "./components/StoreTargetFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../Constant/defaultValues";
import ResponseViewDrawer from "../../Component/ResponseViewDrawer";
import { StoreTargetFormFields } from "../../feilds_validation/storeTargetFormFieldsValidation";

const StoreTarget = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResponseDrawerOpen, setResponseDrawerOpen] = useState(false);
  const [selectedStoreTarget, setSelectedStoreTarget] =
    useState<StoreTargetDto | null>(null);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);

  const [queryParams, setQueryParams] = useState<StoreTargetQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    year: undefined,
    month: undefined,
  });

  const handleQueryParamsChange = (
    newQueryParams: StoreTargetQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
  };

  const {
    data: targetsData,
    isLoading,
    error,
  } = useGetAllStoreTargetsQuery(queryParams);

  const { columns, rows } = storeTargetTableDataService(targetsData?.items);

  const [deleteStoreTarget] = useDeleteStoreTargetMutation();

  const handleCloseDialog = () => {
    setModalOpen(false);
    setSelectedStoreTarget(null);
  };

  const handleDelete = async (row: StoreTargetDto) => {
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
          // title={`Target`}
          btntitle="Add Store Target"
          onActionClick={() => setModalOpen(true)}
          btntitle2="Process Target"
          onActionClick2={() => setProcessDialogOpen(true)}
        />

        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <StoreTargetFilter
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
          />

          <CommonTable<StoreTargetDto>
            columns={columns}
            rows={rows}
            actions={{
              onView: (row) => {
                setSelectedStoreTarget(row);
                setResponseDrawerOpen(true);
              },
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
                setQueryParams({ ...queryParams, PageNumber: page })
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      {/* Add/Edit Store Target Dialog */}
      <StoreTargetFormDialog
        open={isModalOpen}
        onClose={handleCloseDialog}
        selectedStoreTarget={selectedStoreTarget}
      />

      <StoreTargetProcessDialogue
        open={processDialogOpen}
        onClose={handleCloseProcessDialog}
      />

      {selectedStoreTarget && (
        <ResponseViewDrawer<StoreTargetDto>
          isOpen={isResponseDrawerOpen}
          onClose={() => setResponseDrawerOpen(false)}
          data={selectedStoreTarget}
          title="Store Target Response"
          formFields={StoreTargetFormFields}
        />
      )}
    </>
  );
};

export default StoreTarget;
