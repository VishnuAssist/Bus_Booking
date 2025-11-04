import type { AttendanceType } from "../../../../model/attendanceType";

export const attendanceRequestTableDataService = (
  attendanceRequests: AttendanceType[] | undefined
) => {
  const AttendanceRequestColumns = [
    { id: "id", label: "ID" },
    { id: "userName", label: "User Name" },
    { id: "createdOn", label: "Created Date" },
    { id: "workingHours", label: "working Hours" },
    { id: "checkInTime", label: "Check In" },
    { id: "checkOutTime", label: "Check Out" },
    { id: "notes", label: "Note" },
    { id: "status", label: "Status" },
  ];

  const rows = attendanceRequests || [];

  return { columns: AttendanceRequestColumns, rows };
};
