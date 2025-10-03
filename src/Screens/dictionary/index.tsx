import { useState } from "react";
import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import type { dictionarytype } from "../../model/Dictionary";
import {
  DictionaryFormFields,
  dictionaryFormValidationSchema,
} from "../../feilds_validation/dictionaryFields_validation";
import CommonTable from "../../Component/CommenTable";

const DictionaryPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDictionary, setSelectedDictionary] =
    useState<dictionarytype | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [dictionaries, setDictionaries] = useState<dictionarytype[]>([
    {
      id: 1,
      categoryId: 1,
      name: "Store",
      description: "Physical or online shop",
      isActive: true,
    },
    {
      id: 2,
      categoryId: 2,
      name: "Brand",
      description: "Brand information",
      isActive: true,
    },
    {
      id: 3,
      categoryId: 3,
      name: "Department",
      description: "Internal department",
      isActive: false,
    },
    {
      id: 4,
      categoryId: 4,
      name: "It",
      description: "Internal tec",
      isActive: false,
    },
    {
      id: 5,
      categoryId: 5,
      name: "mec",
      description: "Internal development",
      isActive: false,
    },
  ]);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDictionary(null);
  };

  const getDictionaryFields = () => {
    const fields = [...DictionaryFormFields];
    const categoryField = fields.find((f) => f.name === "categoryId");
    if (categoryField) {
      categoryField.options = [
        { id: "1", name: "Store" },
        { id: "2", name: "Brand" },
        { id: "3", name: "Department" },
      ];
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

  const onSubmit = async (formData: dictionarytype) => {
    console.log("formData", formData);

    if (selectedDictionary?.id) {
      setDictionaries((prev) =>
        prev.map((d) =>
          d.id === selectedDictionary.id ? { ...formData, id: d.id } : d
        )
      );
    } else {
      const newId = dictionaries.length + 1;
      setDictionaries((prev) => [...prev, { ...formData, id: newId }]);
    }

    handleModalClose();
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

  const handleView = (row: dictionarytype) => console.log("View", row);
  const handleEdit = (row: dictionarytype) => {
    setSelectedDictionary(row);
    setModalOpen(true);
  };
  const handleDelete = (row: dictionarytype) => {
    setDictionaries((prev) => prev.filter((d) => d.id !== row.id));
  };

  return (
    <>
      <PageHeader title="Dictionary" onActionClick={() => setModalOpen(true)} />

      <CommisionContainer>
        <CommonTable
          columns={columns}
          rows={dictionaries}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          actions={{
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
        />
      </CommisionContainer>

      <Footer />

      <CommonDialog
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={onSubmit}
        title={selectedDictionary ? "Edit Dictionary" : "Add Dictionary"}
        validationSchema={dictionaryFormValidationSchema}
        fields={getDictionaryFields()}
        defaultValues={
          selectedDictionary ?? {
            categoryId: "",
            name: "",
            description: "",
            isActive: true,
          }
        }
      />
    </>
  );
};

export default DictionaryPage;
