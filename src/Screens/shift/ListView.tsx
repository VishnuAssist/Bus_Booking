import { useState } from "react";
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
import {
  usePostShiftMutation,
  useGetallshiftQuery,
  usePutShiftMutation,
  useDeleteShiftMutation,
} from "../../Api/shiftApi";
import type { Shift } from "../../model/shiftType";
import { useGetallAccountQuery } from "../../Api/authApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CommonFormDialog } from "../../Component/forms/AssignForm";
import ShiftPreviewDialog from "./ShiftPreview";
import AppPagination from "../../Component/AppPagination";
import type {
  MonthlySummarriesQueryParamsType,
  ShiftQueryParamsType,
} from "../../model/commissionType";
import { DEFAULT_PAGINATION_OPTIONS } from "../../Constant/defaultValues";
import StaffCommissionFilter from "../commission/components/StaffCommissionFilter";
import ShiftFilter from "./ShiftFilter";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const shiftColumns = [
  { id: "startTime", label: "Start Time" },
  { id: "endTime", label: "End Time" },
  { id: "shiftType", label: "Shift Type" },
  { id: "startDate", label: "Start Date", format: formatDate },
  { id: "endDate", label: "End Date", format: formatDate },
  { id: "notes", label: "Notes" },
  { id: "storeId", label: "Store ID" },
];

const ListView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any | null>(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [postShift] = usePostShiftMutation();
  const [updateShift] = usePutShiftMutation();
  const [deleteShift] = useDeleteShiftMutation();

  const [queryParams, setQueryParams] = useState<ShiftQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
    IsAll: "true",
  });

  const handleQueryParamsChange = (newQueryParams: ShiftQueryParamsType) => {
    if (
      queryParams.StartDate !== newQueryParams.StartDate ||
      queryParams.EndDate !== newQueryParams.EndDate ||
      queryParams.SearchTerm !== newQueryParams.SearchTerm
    ) {
      setQueryParams(newQueryParams);
    }
  };
  const { data: shiftData } = useGetallshiftQuery(queryParams);
  const { data: userData } = useGetallAccountQuery({});

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
    const groupField = fields.find((f) => f.name === "groupIds");
    if (groupField) {
      groupField.options = [
        { id: "1", name: "Group 1" },
        { id: "2", name: "Group 2" },
        { id: "3", name: "Group 3" },
      ];
    }
    return fields;
  };

  const getDefaultValues = (shift: Shift) => {
    if (!shift) return {};

    const defaultValues = {
      ...shift,
      startDate: shift.startDate
        ? new Date(shift.startDate).toISOString().split("T")[0]
        : "",
      endDate: shift.endDate
        ? new Date(shift.endDate).toISOString().split("T")[0]
        : "",
      startTime: shift.startTime ? shift.startTime.slice(0, 5) : "",
      endTime: shift.endTime ? shift.endTime.slice(0, 5) : "",
      shiftType:
        shift.shiftType === "Morning"
          ? "1"
          : shift.shiftType === "After Noon"
          ? "2"
          : shift.shiftType === "Night"
          ? "3"
          : shift.shiftType,
      skipDates: [],
    };

    if (shift.skipDates) {
      try {
        const parsedSkipDates = JSON.parse(shift.skipDates);
        if (Array.isArray(parsedSkipDates)) {
          defaultValues.skipDates = parsedSkipDates.map((dateRange: any) => ({
            startDate: dateRange.startDate
              ? new Date(dateRange.startDate).toISOString().split("T")[0]
              : "",
            endDate: dateRange.endDate
              ? new Date(dateRange.endDate).toISOString().split("T")[0]
              : "",
          }));
        }
      } catch (error) {
        console.error("Error parsing skipDates:", error);
        defaultValues.skipDates = [];
      }
    }

    if (shift.users && Array.isArray(shift.users) && shift.users.length > 0) {
      defaultValues.userIds = shift.users.map((user: any) => ({
        id: user.id,
        name:
          user.userName ||
          user.fullName ||
          `${user.firstName} ${user.lastName}`.trim(),
      }));
    } else {
      defaultValues.userIds = [];
    }

    if (
      shift.groupIds &&
      Array.isArray(shift.groupIds) &&
      shift.groupIds.length > 0
    ) {
      defaultValues.groupIds = shift.groupIds.map((id: string) => ({
        id,
        name: `Group ${id}`,
      }));
    } else {
      defaultValues.groupIds = [];
    }

    return defaultValues;
  };
  const onSubmit = async (formData: Shift) => {
    console.log("formData", formData);
    try {
      const formatTime = (time: string) => {
        if (!time) return "00:00:00";
        return time.length === 5 ? time + ":00" : time;
      };

      const finalData = {
        ...formData,
        shiftType:
          formData.shiftType === "1"
            ? "Morning"
            : formData.shiftType === "2"
            ? "After Noon"
            : formData.shiftType === "3"
            ? "Night"
            : formData.shiftType,
        reason: "Peak hour coverage",
        status: 3,
        duration: "04:00:00",
        skipDates: Array.isArray(formData.skipDates)
          ? JSON.stringify(
              formData.skipDates.map((data: any) => ({
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
              }))
            )
          : "[]",
        startTime: formatTime(formData.startTime),
        endTime: formatTime(formData.endTime),
      };
      if (Array.isArray(formData.userIds) && formData.userIds.length > 0) {
        delete finalData.groupIds;
      } else if (
        Array.isArray(formData.groupIds) &&
        formData.groupIds.length > 0
      ) {
        delete finalData.userIds;
      }

      if (selectedShift) {
        const updatedData = { ...finalData, id: selectedShift.id };
        await updateShift(updatedData).unwrap();
      } else {
        await postShift(finalData).unwrap();
      }
      setModalOpen(false);
      setSelectedShift(null);
    } catch (error) {
      console.error("Error creating/updating shift:", error);
    }
  };

  const handleDropShift = (
    shiftId: number,
    newDate: Date,
    employeeId?: string
  ) => {
    const shift = shiftData?.items.find((s) => s.id === shiftId);
    if (shift) {
      const originalStartDate = new Date(shift.startDate);
      const originalEndDate = new Date(shift.endDate);

      const timeDiff = originalEndDate.getTime() - originalStartDate.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      const newStartDate = new Date(newDate);
      newStartDate.setHours(0, 0, 0, 0);

      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newStartDate.getDate() + dayDiff);

      const formattedStartDate = newStartDate.toISOString().split("T")[0];
      const formattedEndDate = newEndDate.toISOString().split("T")[0];

      const updatedShift = {
        ...shift,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        ...(employeeId && { userIds: [employeeId] }),
      };

      setSelectedShift(updatedShift);
      setModalOpen(true);
    }
  };

  const handleDelete = async (row: Shift) => {
    await deleteShift(row?.id || 0);
    console.log("row", row);
  };

  const handlePreview = (row: Shift) => {
    setSelectedShift(row);
    setPreviewOpen(true);
  };

  return (
    <>
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
          <ShiftFilter
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
          />

          <CommonTable
            columns={shiftColumns}
            rows={shiftData?.items || []}
            actions={{
              onView: handlePreview,
              onEdit: (row) => {
                console.log("edit", row);
                setSelectedShift(row);
                setModalOpen(true);
              },
              onDelete: handleDelete,
            }}
          />
          {shiftData?.metaData && (
            <AppPagination
              metaData={shiftData?.metaData}
              onPageChange={(page: number) => {
                setQueryParams({ ...queryParams, PageNumber: page });
              }}
            />
          )}
        </Box>
      )}

      {tabValue === 1 && shiftData?.items && (
        <DndProvider backend={HTML5Backend}>
          <Box sx={{ mt: 2 }}>
            <CalendarView
              shifts={shiftData?.items}
              onEditShift={(shift) => {
                setSelectedShift(shift);
                setModalOpen(true);
              }}
              onDropShift={handleDropShift}
            />
          </Box>
        </DndProvider>
      )}

      <CommonFormDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedShift(null);
        }}
        onSubmit={onSubmit}
        title={selectedShift ? "Edit Shift" : "Add Shift"}
        validationSchema={shiftFormValidationSchema}
        fields={shiftFields()}
        defaultValues={getDefaultValues(selectedShift)}
        showAssignmentType={true}
        mode={selectedShift ? "edit" : "create"}
      />

      <ShiftPreviewDialog
        open={isPreviewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedShift(null);
        }}
        shift={selectedShift}
      />
    </>
  );
};

export default ListView;
