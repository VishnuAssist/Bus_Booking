import type { AttendanceType } from "../../../../model/attendanceType";

export const adminAttendanceTableDataService = (
  attendances: AttendanceType[] | undefined
) => {
  const AdminAttendanceColumns = [
    { id: "id", label: "ID" },
    { id: "userName", label: "User Name" },
    // { id: "shiftType", label: "Type" },
    { id: "checkInTime", label: "Check In Time" },
    { id: "checkOutTime", label: "Check Out Time" },
    { id: "workingHours", label: "Working Hours" },
    { id: "notes", label: "Notes" },
    { id: "status", label: "Status" },

  ];

  const rows = attendances || [];

  return { columns: AdminAttendanceColumns, rows };
};
