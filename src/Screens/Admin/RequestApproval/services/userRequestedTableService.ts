import type { leaveReqTableType } from "../../../../model/LeaveRequest";

export const userRequestedTableService = (
  userLeave: leaveReqTableType[] | undefined
) => {
  const HistoryColumns = [
    { id: "userName", label: "User Name" },
    { id: "leaveType", label: "Leave Type" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "reason", label: "Reason" },
    { id: "status", label: "Status" },
  ];

  const rows = userLeave
    ? userLeave.map((leave: leaveReqTableType) => {
        return {
          userName: leave.userName,
          leaveType: leave.leaveType,
          startDate: leave.startDate,
          endDate: leave.endDate,
          reason: leave.reason,
          status: leave.status,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
