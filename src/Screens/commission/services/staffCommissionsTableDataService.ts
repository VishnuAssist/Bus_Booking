import type { StaffCommissionResponseType } from "../../../model/commissionType";

export const staffCommissionsTableDataService = (
  staffCommissions: StaffCommissionResponseType[] | undefined
) => {
  const HistoryColumns = [
    { id: "userId", label: "User ID" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
    { id: "target", label: "Target" },
    { id: "achivement", label: "Achivement" },
    { id: "totalPayout", label: "Total Payout" },
    { id: "totalWorkingDays", label: "Total Working Days" },
    { id: "leaveDays", label: "Leave Days" },
    { id: "ruleId", label: "Rule ID" },
    { id: "userGroupId", label: "User Group ID" },
    { id: "groupTargetAchieved", label: "Group Target Achieved" },
    { id: "totalGroupTarget", label: "Total Group Target" },
    { id: "status", label: "Status" },
    { id: "note", label: "Note" },
  ];

  console.log("staffCommissions", staffCommissions);

  const rows = staffCommissions
    ? staffCommissions.map((commission: StaffCommissionResponseType) => {
        return {
          userId: commission.userId,
          year: commission.year,
          month: commission.month,
          target: commission.target,
          achivement: commission.achivement,
          totalPayout: commission.totalPayout,
          totalWorkingDays: commission.totalWorkingDays,
          leaveDays: commission.leaveDays,
          ruleId: commission.ruleId,
          userGroupId: commission.userGroupId,
          groupTargetAchieved: commission.groupTargetAchieved,
          totalGroupTarget: commission.totalGroupTarget,
          status: commission.status,
          note: commission.note,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
