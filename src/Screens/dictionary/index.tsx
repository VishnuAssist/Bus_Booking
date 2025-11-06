import { useState } from "react";
//import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import { CommonDialog } from "../../Component/forms/FormDialog";
import type { DictionaryQueryParamsType, dictionarytype } from "../../model/Dictionary";
import { toast } from "react-toastify";
import {
  DictionaryFormFields,
  dictionaryFormValidationSchema,
} from "../../feilds_validation/dictionaryFields_validation";
import CommonTable from "../../Component/CommenTable";
import PageHeader from "../../Component/commonPageHeader";
import {
  useAddEditdictionaryMutation,
  useDeleteDictionaryMutation,
  useGetalldictionaryQuery,
  useGetcategoriesQuery,
} from "../../Api/dictionaryApi";
import { createFormData } from "../../Lib/ApiUtil";
import { Paper } from "@mui/material";
import AppPagination from "../../Component/AppPagination";


import { dictionaryTableDataService } from "./Services/DictionaryTableDataService";
import DictionaryFilter from "./Components/DictionaryFilter";
import { DEFAULT_PAGINATION_OPTIONS } from "../../Constant/defaultValues";


const DictionaryPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDictionary, setSelectedDictionary] = useState<dictionarytype | null>(null);
  


   const [queryParams, setQueryParams] = useState<DictionaryQueryParamsType>({
      ...DEFAULT_PAGINATION_OPTIONS,
    
    });
  
    const handleQueryParamsChange = (
      newQueryParams: DictionaryQueryParamsType
    ) => {
      setQueryParams(newQueryParams);
    };

  
  const { data: dicData } = useGetalldictionaryQuery(queryParams);
  const { data: categorys } = useGetcategoriesQuery();

  console.log("selectedDictionary", selectedDictionary);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDictionary(null);
  };

  const getDictionaryFields = () => {
    const fields = [...DictionaryFormFields];
    const categoryField = fields.find((f) => f.name === "categoryId");
    if (categoryField && categorys) {
      categoryField.options = categorys?.categories?.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    }

    const statusField = fields.find((f) => f.name === "isActive");
    if (statusField) {
      statusField.options = [
        { id: "true", name: "Active" },
        { id: "false", name: "Inactive" },
      ];
    }
    return fields;
  };
  const [addEditForm] = useAddEditdictionaryMutation();

  const [deleteDictionary] = useDeleteDictionaryMutation();

  const onSubmit = async (formData: dictionarytype) => {
    console.log("formData", formData);
    try {
      const finalData = { ...formData, id: selectedDictionary?.id || null };
      await addEditForm(createFormData(finalData)).unwrap();
      handleModalClose();
    } catch (error) {
      toast.error("Error saving entry");
      console.error(error);
    }
  };


 const { columns, rows } = dictionaryTableDataService(dicData?.items);
  // const handleView = (row: dictionarytype) => console.log("View", row);
  const handleEdit = (row: dictionarytype) => {
    setSelectedDictionary(row);
    setModalOpen(true);
  };

  const handleDelete = async (row: dictionarytype) => {
    await deleteDictionary(row?.id || 0);
    console.log("row", row);
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Dictionary"
          btntitle="Add Dictionary"
          onActionClick={() => setModalOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        
          <DictionaryFilter 
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
            categories={categorys?.categories || []}/>

          <CommonTable
            columns={columns}
            rows={rows}
            actions={{
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
          
          {dicData?.metaData && (
            <AppPagination
              metaData={dicData?.metaData}
              onPageChange={(page: number) =>
                setQueryParams({ ...queryParams, PageNumber: page })
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      <CommonDialog
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={onSubmit}
        title={selectedDictionary ? "Edit Dictionary" : "Add Dictionary"}
        validationSchema={dictionaryFormValidationSchema}
        fields={getDictionaryFields()}
        defaultValues={selectedDictionary || {}}
      />
    </>
  );
};

export default DictionaryPage;
