import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import { StoreFormFields, storeFormValidationSchema } from "../../feilds_validation/storeFieldsValidation";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Component/commonPageHeader";
import {
  useGetAllStoresQuery,
  useAddStoreMutation,
  useEditStoreMutation,
 
  useDeleteStoreMutation,
} from "../../Api/StoreApi";
import type { StoreDto } from "../../model/storeType";
import type { QueryParamsType } from "../../Dto/formDto";
import { ValidateParams } from "../../Lib/utile";


const Store = () => {
const [params, setParams] = useState<QueryParamsType>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreDto | null>(null);

  const navi = useNavigate();

  // API hooks
  const { data: storesData, isLoading, error } = useGetAllStoresQuery(ValidateParams(params));

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
    if (row.storeId && window.confirm("Are you sure you want to delete this store?")) {
      try {
        await deleteStore(row.storeId).unwrap();
     
      } catch (err) {
       
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

  const handleView = (row: StoreDto) => {
    navi(`/settings/storeTarget/${row.storeId}`);
  };

 console.log("storesData", storesData);


  if (isLoading) {
    return (
      <CommisionContainer>
        <PageHeader title="Store" btntitle="Add Store" onActionClick={() => setModalOpen(true)} />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading stores...</div>
      </CommisionContainer>
    );
  }

  if (error) {
    return (
      <CommisionContainer>
        <PageHeader title="Store" btntitle="Add Store" onActionClick={() => setModalOpen(true)} />
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          Error loading stores. Please try again.
        </div>
      </CommisionContainer>
    );
  }

  return (
    <>
      <CommisionContainer>
        <PageHeader title="Store" btntitle="Add Store" onActionClick={() => setModalOpen(true)} />
        <CommonTable
          columns={StoreColumns}
          rows={storesData?.items || []}
          page={storesData?.metaData.currentPage??0}
          rowsPerPage={storesData?.metaData.pageSize??0}
          onPageChange={()=>setParams((prev) => ({
            ...prev,
            pageNumber: (storesData?.metaData.currentPage??0) + 1,
          }))}
          onRowsPerPageChange={(rowPerPage) => setParams((prev) => ({
            ...prev,
            pageSize: rowPerPage,
          }))}
        //   totalCount={storesData?.metaData?.totalCount??0}
          actions={{
            onView: handleView,
            onEdit: (row) => {
              setSelectedStore(row);
              setModalOpen(true);
            },
            onDelete: handleDelete,
          }}
        />
      </CommisionContainer>

      <Footer />

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