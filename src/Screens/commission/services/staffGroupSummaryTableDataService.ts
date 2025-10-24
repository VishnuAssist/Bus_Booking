import type {
  PayoutType,
  StaffGroupSummaryResponseType,
  UserSummaryType,
} from "../../../model/commissionType";

export const staffGroupSummaryTableDataService = (
  staffGroupSummaries: StaffGroupSummaryResponseType[] | undefined
) => {
  const StaffGroupSummaryColumns = [
    { id: "id", label: "ID" },
    { id: "groupName", label: "Group Name" },
    { id: "description", label: "Description" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },

    { id: "userId", label: "User ID" },
    { id: "userName", label: "User Name" },
    { id: "employeeCode", label: "Employee Code" },
    { id: "designation", label: "Designation" },
    { id: "target", label: "Target" },
    { id: "achievement", label: "Achievement" },
    { id: "totalPayout", label: "Total Payout" },
    { id: "workingDays", label: "Working Days" },
    { id: "leaveDays", label: "Leave Days" },

    { id: "commissionTypeId", label: "Commission Type ID" },
    { id: "commissionTypeName", label: "Commission Type Name" },
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "note", label: "Note" },
  ];

  const rows = staffGroupSummaries
    ? staffGroupSummaries.flatMap((summary: StaffGroupSummaryResponseType) =>
        summary.users.flatMap((user: UserSummaryType) =>
          user.payouts.length > 0
            ? user.payouts.map((payout: PayoutType) => ({
                id: summary.id,
                groupName: summary.groupName,
                description: summary.description,
                year: summary.year,
                month: summary.month,
                userId: user.userId,
                userName: user.userName,
                employeeCode: user.employeeCode,
                designation: user.designation,
                target: user.target,
                achievement: user.achievement,
                totalPayout: user.totalPayout,
                workingDays: user.workingDays,
                leaveDays: user.leaveDays,
                commissionTypeId: payout.commissionTypeId,
                commissionTypeName: payout.commissionTypeName,
                amount: payout.amount,
                date: payout.date,
                note: payout.note,
              }))
            : [
                {
                  id: summary.id,
                  groupName: summary.groupName,
                  description: summary.description,
                  year: summary.year,
                  month: summary.month,
                  userId: user.userId,
                  userName: user.userName,
                  employeeCode: user.employeeCode,
                  designation: user.designation,
                  target: user.target,
                  achievement: user.achievement,
                  totalPayout: user.totalPayout,
                  workingDays: user.workingDays,
                  leaveDays: user.leaveDays,
                  commissionTypeId: null,
                  commissionTypeName: "",
                  amount: 0,
                  date: "",
                  note: "",
                },
              ]
        )
      )
    : [];

  return { columns: StaffGroupSummaryColumns, rows };
};
