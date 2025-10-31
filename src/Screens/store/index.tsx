import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import { CommonDialog } from "../../Component/forms/FormDialog";
import {
  StoreFormFields,
  storeFormValidationSchema,
} from "../../feilds_validation/storeFieldsValidation";
import PageHeader from "../../Component/commonPageHeader";
import {
  useGetAllStoresQuery,
  useAddStoreMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,
} from "../../Api/StoreApi";
import type { StoreDto } from "../../model/storeType";
import { ValidateParams } from "../../Lib/utile";
import AppPagination from "../../Component/AppPagination";
import { Paper } from "@mui/material";
import { DEFAULT_PAGINATION_OPTIONS } from "../../Constant/defaultValues";
import type { MonthlySummarriesQueryParamsType } from "../../model/commissionType";
import StoreFilter from "./StoreFilter";

const Store = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreDto | null>(null);

  // API hooks

  const [queryParams, setQueryParams] =
    useState<MonthlySummarriesQueryParamsType>({
      ...DEFAULT_PAGINATION_OPTIONS,
      PageSize: DEFAULT_PAGINATION_OPTIONS.PageSize || 5,
    });

  const handleQueryParamsChange = (
    newQueryParams: MonthlySummarriesQueryParamsType
  ) => {
    {
      setQueryParams(newQueryParams);
    }
  };
  const {
    data: storesData,
    isLoading,
    error,
  } = useGetAllStoresQuery(ValidateParams(queryParams));

  const [addStore] = useAddStoreMutation();
  const [editStore] = useEditStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();

  const StoreColumns = [
    { id: "storeId", label: "Store ID" },
    { id: "name", label: "Store Name" },
    { id: "code", label: "Store Code" },
    { id: "countryCode", label: "Country Code" },
  ];

  const onSubmit = async (formData: StoreDto) => {
    try {
      if (selectedStore?.storeId) {
        await editStore({
          ...formData,
          storeId: selectedStore.storeId,
        }).unwrap();
        console.log("Store updated successfully");
      } else {
        await addStore(formData).unwrap();
      }
      setModalOpen(false);
      setSelectedStore(null);
    } catch (err) {
      console.error("Failed to save store:", err);
    }
  };

  const handleDelete = async (row: StoreDto) => {
    if (
      row.storeId &&
      window.confirm("Are you sure you want to delete this store?")
    ) {
      try {
        await deleteStore(row.storeId).unwrap();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  const storeFields = () => {
    const fields = [...StoreFormFields];
    const countryField = fields.find((f) => f.name === "countryCode");
    if (countryField) {
      countryField.options = [
        { id: "US", name: "United States" },
        { id: "IN", name: "India" },
        { id: "JP", name: "Japan" },
        { id: "FR", name: "France" },
        { id: "DE", name: "Germany" },
        { id: "AE", name: "United Arab Emirates" },
        { id: "SG", name: "Singapore" },
        { id: "AU", name: "Australia" },
        { id: "CA", name: "Canada" },
        { id: "GB", name: "United Kingdom" },
      ];
    }
    return fields;
  };

  console.log("storesData", storesData);

  if (isLoading) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store"
          btntitle="Add Store"
          onActionClick={() => setModalOpen(true)}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>
          Loading stores...
        </div>
      </CommisionContainer>
    );
  }

  if (error) {
    return (
      <CommisionContainer>
        <PageHeader
          title="Store"
          btntitle="Add Store"
          onActionClick={() => setModalOpen(true)}
        />
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          Error loading stores. Please try again.
        </div>
      </CommisionContainer>
    );
  }

  return (
    <>
      <CommisionContainer>
        <PageHeader
          // title="Store"
          btntitle="Add Store"
          onActionClick={() => setModalOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <StoreFilter
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
          />

          <CommonTable
            columns={StoreColumns}
            rows={storesData?.items || []}
            actions={{
              // onView: handleViewTargets,
              onEdit: (row) => {
                setSelectedStore(row);
                setModalOpen(true);
              },
              onDelete: handleDelete,
            }}
          />
          {storesData?.metaData && (
            <AppPagination
              metaData={storesData?.metaData}
              onPageChange={(page: number) =>
                setQueryParams({ ...queryParams, PageNumber: page })
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      <CommonDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedStore(null);
        }}
        onSubmit={onSubmit}
        title={selectedStore ? "Edit Store" : "Add Store"}
        validationSchema={storeFormValidationSchema}
        fields={storeFields()}
        defaultValues={
          selectedStore || {
            name: "",
            code: "",
            countryCode: "",
          }
        }
      />
    </>
  );
};

export default Store;
