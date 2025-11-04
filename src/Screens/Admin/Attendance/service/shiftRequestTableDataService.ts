import type { ShiftRequestType } from "../../../../model/shiftType";

export const shiftRequestTableDataService = (
  shiftRequests: ShiftRequestType[] | undefined
) => {
  const ShiftRequestColumns = [
    { id: "id", label: "ID" },
    { id: "userName", label: "User Name" },
    { id: "shiftType", label: "Shift Type" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "note", label: "Note" },
    { id: "reason", label: "Reason" },
    { id: "status", label: "Status" },
  ];

  const rows = shiftRequests || [];

  return { columns: ShiftRequestColumns, rows };
};
