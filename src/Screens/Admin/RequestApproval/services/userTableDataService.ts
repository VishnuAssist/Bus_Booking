import type { leaveTableType } from "../../../../model/LeaveRequest";

export const userTableDataService = (
  userLeave: leaveTableType[] | undefined
) => {
  const HistoryColumns = [
    { id: "userName", label: "User Name" },
    { id: "totalLeaveDays", label: "Remaining Balance" },
    { id: "totalLeaveRequests", label: "Requested Leaves" },
    { id: "approvedLeaveDays", label: "Approved" },
    { id: "rejectedLeaveDays", label: "Rejected" },
  ];

  const rows = userLeave
    ? userLeave.map((leave: leaveTableType) => {
        return {
          userName: leave.userName,
          approvedLeaveDays: leave.approvedLeaveDays,
          totalLeaveRequests: leave.totalLeaveRequests,
          totalLeaveDays: leave.totalLeaveDays,
          rejectedLeaveDays: leave.rejectedLeaveDays,
          pendingCount: leave.pendingCount,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
