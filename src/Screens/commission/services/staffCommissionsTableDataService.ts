import type { StaffCommissionResponseType } from "../../../model/commissionType";

export const staffCommissionsTableDataService = (
  staffCommissions: StaffCommissionResponseType[] | undefined
) => {
  const HistoryColumns = [
    { id: "id", label: "ID" },
    { id: "userId", label: "User ID" },
    { id: "payout", label: "PayOut" },
    { id: "note", label: "Note" },
    { id: "commissionTypeId", label: "Commission Type ID" },
    { id: "ruleId", label: "Rule ID" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
  ];

  const rows = staffCommissions
    ? staffCommissions.map((commission: StaffCommissionResponseType) => {
        return {
          id: commission.id,
          userId: commission.userId,
          payout: commission.payout,
          note: commission.note,
          commissionTypeId: commission.commissionTypeId,
          ruleId: commission.ruleId,
          year: commission.year,
          month: commission.month,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
