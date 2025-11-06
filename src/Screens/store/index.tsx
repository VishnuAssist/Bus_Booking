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
import { userTableDataService } from "./services/StoreTableData";
import StoreFilter from "./components/StoreFilter";
import { useGetCountriesQuery } from "../../Api/rulesApi";

const Store = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreDto | null>(null);

  console.log("selectedStore",selectedStore)

  // API hooks

  const { data: countrys } = useGetCountriesQuery({})

  console.log("countrys", countrys);

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

  const { columns, rows } = userTableDataService(storesData?.items);

  const [addStore] = useAddStoreMutation();
  const [editStore] = useEditStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();

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
    // const countryField = fields.find((f) => f.name === "countryCode");
    // if (countryField) {
    //   countryField.options = countrys?.map((data) => ({
    //     id: data?.code,
    //     name: data?.name,
    //   })) || []
    // }
    return fields;
  };

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
          title="Store"
          subtitle="Manage your stores"
          btntitle="Add Store"
          onActionClick={() => setModalOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <StoreFilter
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
          />

          <CommonTable
            columns={columns}
            rows={rows}
            actions={{
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
        defaultValues={selectedStore || {}}
      />
    </>
  );
};

export default Store;
