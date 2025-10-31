import type { attendanceType } from "../../../../model/attendanceType";

export const adminAttendanceTableDataService = (
  attendances: attendanceType[] | undefined
) => {
  const AdminAttendanceColumns = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "First Name" },
    { id: "type", label: "Type" },
    { id: "shift", label: "Shift" },
    { id: "checkInTime", label: "Check In Time" },
    { id: "checkOutTime", label: "Check Out Time" },
    { id: "workingHours", label: "Working Hours" },
    { id: "notes", label: "Notes" },
  ];

  const rows = attendances || [];

  return { columns: AdminAttendanceColumns, rows };
};
