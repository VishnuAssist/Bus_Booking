import { useState } from "react";
//import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import {
  ShiftFormFields,
  shiftFormValidationSchema,
} from "../../feilds_validation/shiftFields";
import CommonTable from "../../Component/CommenTable";
import PageHeader from "../../Component/commonPageHeader";
import { Box, Tab, Tabs } from "@mui/material";
import CalendarView from "./CalendarView";
import { usePostShiftMutation,useGetallshiftQuery } from "../../Api/shiftApi";
import type { Shift } from "../../model/shiftType";
import { useGetallAccountQuery } from "../../Api/authApi";
import { createFormData } from "../../Lib/ApiUtil";
import type { UserList, UserType } from "../../model/userType";

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
  const [shifts, setShifts] = useState(sampleShifts);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [tabValue, setTabValue] = useState(0);

  const [postShift] = usePostShiftMutation();
  const { data:shiftData }= useGetallshiftQuery({});
  const { data:userData }= useGetallAccountQuery({});
  console.log("userData",userData)
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  
  const shiftFields = () => {
    const fields = [...ShiftFormFields];

    const userField = fields.find((f) => f.name === "userIds");
  if (userField && userData) {
  userField.options = userData?.items?.map((user: any) => ({
    id: user.id,
    name: user?.userName,
  }));
}

    const storeField = fields.find((f) => f.name === "shiftType");
    if (storeField) {
      storeField.options = [
        { id: "1", name: "Morning" },
        { id: "2", name: "After Noon" },
        { id: "3", name: "Night" },
      ];
    }
    return fields;
  };

  const onSubmit = async (formData: Shift) => {
    console.log("formData",formData)
    try {
      const finalData = { ...formData, id: selectedShift?.id || null };
      await postShift(finalData).unwrap();
      setModalOpen(false);
      setSelectedShift(null);
    } catch (error) {
      console.error("Error creating shift:", error);
    }
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Shift Management"
          btntitle="Add Shift"
          onActionClick={() => setModalOpen(true)}
        />

        <Box sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="List View" />
            <Tab label="Calendar View" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box>
            <CommonTable
              columns={shiftColumns}
              rows={shiftData?.items || []}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
              // actions={{
              //   onView: (row) => console.log("view", row),
              //   onEdit: (row) => {
              //     setSelectedShift(row);
              //     setModalOpen(true);
              //   },
              //   onDelete: (row) =>
              //     setShifts((prev) => prev.filter((s) => s.id !== row.id)),
              // }}
            />
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <CalendarView
              shifts={shifts.map((s) => ({
                id: s.id,
                title: s.shiftType,
                name: `Store ${s.storeId}`,
                start: new Date(s.startDate),
                end: new Date(s.endDate),
                startTime: s.startTime,
                endTime: s.endTime,
                location: `Store ${s.storeId}`,
                employeeId: s.storeId,
                original: s,
              }))}
              onEditShift={(shift) => {
                setSelectedShift(shift);
                setModalOpen(true);
              }}
            />
          </Box>
        )}
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
        defaultValues={selectedShift || {}}
      />
    </>
  );
};

export default Shift;
