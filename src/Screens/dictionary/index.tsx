import { useState } from "react";
import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import type { dictionarytype } from "../../model/Dictionary";
import { DictionaryFormFields, dictionaryFormValidationSchema } from "../../feilds_validation/dictionaryFields_validation";

const index = () => {
    const [isModalOpen, setModalOpen] = useState(false);
      const [selectedDictionary, setSelectedDictionary] = useState<dictionarytype | null>(null);
    
      const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDictionary(null);
    };

     const getDictionaryFields = () => {
       const fields = [...DictionaryFormFields];

       const dictionaryTypeField = fields.find((f) => f.name === "categoryId");
       if (dictionaryTypeField) {
     dictionaryTypeField.options = [
       { id: "1", name: "Store" },
       { id: "2", name: "Brand" },
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
       //    try {
       //      const finalData = { ...formData, id: selectedDictionary?.id || null };
       //      await updateDictionary(createFormData(finalData)).unwrap();
       //      handleModalClose();
       //    } catch (error) {
       //      toast.error("Error saving entry");
       //    }

       console.log("formData", formData);
            handleModalClose();
     };

    return (
      <>
        <PageHeader
          title="Dictionary"
          onActionClick={() => setModalOpen(true)}
        />
        <CommisionContainer>
          <div>index</div>
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
        //   isLoading={isLoading}
        />
      </>
    );
}

export default index