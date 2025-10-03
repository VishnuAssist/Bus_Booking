import { useState } from "react";
import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import {
  ShiftFormFields,
  shiftFormValidationSchema,
} from "../../feilds_validation/shiftFields";
import CommonTable from "../../Component/CommenTable";

const sampleShifts = [
  {
    id: 1,
    startTime: "09:00",
    endTime: "17:00",
    shiftType: "Morning",
    startDate: "2025-10-05",
    endDate: "2025-10-10",
    skipDate: "2025-10-07",
    notes: "Regular shift",
    storeId: "1",
  },
  {
    id: 2,
    startTime: "12:00",
    endTime: "20:00",
    shiftType: "Evening",
    startDate: "2025-10-06",
    endDate: "2025-10-12",
    skipDate: "",
    notes: "Extra shift",
    storeId: "2",
  },
  {
    id: 3,
    startTime: "22:00",
    endTime: "06:00",
    shiftType: "Night",
    startDate: "2025-10-07",
    endDate: "2025-10-15",
    skipDate: "2025-10-10",
    notes: "Night duty",
    storeId: "3",
  },
  {
    id: 4,
    startTime: "08:00",
    endTime: "16:00",
    shiftType: "Morning",
    startDate: "2025-10-08",
    endDate: "2025-10-14",
    skipDate: "",
    notes: "Store opening",
    storeId: "1",
  },
  {
    id: 5,
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Evening",
    startDate: "2025-10-09",
    endDate: "2025-10-17",
    skipDate: "",
    notes: "Late shift",
    storeId: "2",
  },
];


const shiftColumns = [
  { id: "startTime", label: "Start Time" },
  { id: "endTime", label: "End Time" },
  { id: "shiftType", label: "Shift Type" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "skipDate", label: "Skip Date" },
  { id: "notes", label: "Notes" },
  { id: "storeId", label: "Store ID" },
];


const Shift = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const shiftFields = () => {
    const fields = [...ShiftFormFields];
    const storeField = fields.find((f) => f.name === "shiftType");
    if (storeField) {
      storeField.options = [
        { id: "1", name: "Addidas" },
        { id: "2", name: "Puma" },
        { id: "3", name: "Nike" },
      ];
    }
    return fields;
  };

  const onSubmit = async (formData: any) => {
    console.log("Shift Form Data", formData);
    setModalOpen(false);
    setSelectedShift(null);
  };

  return (
    <>
      <PageHeader
        title="Shift Management"
        onActionClick={() => setModalOpen(true)}
      />

      <CommisionContainer>
        <CommonTable
          columns={shiftColumns}
          rows={sampleShifts}
          page={page}
          rowsPerPage={rowsPerPage} 
          onPageChange={setPage} 
          onRowsPerPageChange={setRowsPerPage} 
          actions={{
            onView: (row) => console.log("view", row),
            onEdit: (row) => {
              setSelectedShift(row);
              setModalOpen(true);
            },
            onDelete: (row) => console.log("delete", row),
          }}
        />
      </CommisionContainer>

      <Footer />

      <CommonDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedShift(null);
        }}
        onSubmit={onSubmit}
        title={selectedShift ? "Edit Shift" : "Add Shift"}
        validationSchema={shiftFormValidationSchema}
        fields={shiftFields()}
        defaultValues={
          selectedShift || {
            startTime: "",
            endTime: "",
            shiftType: "",
            startDate: "",
            endDate: "",
            skipDate: "",
            notes: "",
            storeId: "",
          }
        }
      />
    </>
  );
};

export default Shift;
