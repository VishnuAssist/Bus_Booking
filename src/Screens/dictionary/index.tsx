import { useState } from "react";
//import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import type { dictionarytype } from "../../model/Dictionary";
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
import { setDictionaryParams } from "../../Store/slice/ParamsSlice";
import { getAxiosParamsA } from "../../Api/util";
import { useAppDispatch, useAppSelector } from "../../Store/StoreConfig";
import DictionarySearch from "./DictionarySearch";

const DictionaryPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDictionary, setSelectedDictionary] =
    useState<dictionarytype | null>(null);
  const dispatch = useAppDispatch();
  const DictionaryParams = useAppSelector(
    (state) => state.auth.Params.DictionaryParams
  );

  // const { data: dicData } = useGetalldictionaryQuery({});
  const { data: dicData } = useGetalldictionaryQuery(
    getAxiosParamsA({ ...DictionaryParams, PageSize: 5 })
  );
  const { data: categorys } = useGetcategoriesQuery();

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
    }
  };

  const columns = [
    { id: "categoryId", label: "Category ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 150 },
    {
      id: "isActive",
      label: "Status",
      minWidth: 80,
      format: (value: boolean) => (value ? "Active" : "Inactive"),
    },
  ];

  console.log("select", selectedDictionary);
  const handleView = (row: dictionarytype) => console.log("View", row);
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
          <DictionarySearch
            params={DictionaryParams}
            setParams={(p) => dispatch(setDictionaryParams(p))}
          />
          <CommonTable
            columns={columns}
            rows={dicData?.items || []}
            actions={{
              onView: handleView,
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
          {dicData?.metaData && (
            <AppPagination
              metaData={dicData?.metaData}
              onPageChange={(page: number) =>
                dispatch(setDictionaryParams({ PageNumber: page }))
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      <Footer />

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
