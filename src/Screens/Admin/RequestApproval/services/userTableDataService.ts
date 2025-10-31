import type { leaveTableType } from "../../../../model/LeaveRequest";

export const userTableDataService = (
  userLeave: leaveTableType[] | undefined
) => {
  const HistoryColumns = [
    { id: "userName", label: "User Name" },
    { id: "approved", label: "Approved" },
    { id: "remainingBalance", label: "Remaining Balance" }
  ];

  const rows = userLeave
    ? userLeave.map((leave: leaveTableType) => {
        return {
          userName: leave.userName,
          approved: leave.approved,
          remainingBalance: leave.remainingBalance,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
