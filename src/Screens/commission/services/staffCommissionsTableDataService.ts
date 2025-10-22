import type { StaffCommissionResponseType } from "../../../model/commissionType";

export const staffCommissionsTableDataService = (
  staffCommissions: StaffCommissionResponseType[] | undefined
) => {
  const HistoryColumns = [
    { id: "username", label: "UserName" },
    { id: "payout", label: "PayOut" },
    { id: "store", label: "Store" },
    { id: "sales", label: "Sales" },
    { id: "workingDays", label: "Total No of Working Day" },
    { id: "date", label: "Date" },
    { id: "remarks", label: "Remarks" },
  ];

  const rows = staffCommissions
    ? staffCommissions.map((commission: StaffCommissionResponseType) => {
        const workingDaysMatch = commission.note.match(/Working Days: (\d+)/);
        const salesMatch = commission.note.match(/Total Sales: \$([\d.]+)/);

        return {
          username: commission.userName,
          position: null,
          target: null,
          sales: salesMatch ? parseFloat(salesMatch[1]) : 0,
          payout: commission.payout,
          store: commission.storeName || commission.storeId || null,
          targetAchivement: null,
          storeKpi: null,
          mcDays: null,
          workingDays: workingDaysMatch ? parseInt(workingDaysMatch[1]) : 0,
          date: commission.commissinDate,
          totalPayout: commission.payout,
          remarks: commission.note,
        };
      })
    : [];

  return { columns: HistoryColumns, rows };
};
