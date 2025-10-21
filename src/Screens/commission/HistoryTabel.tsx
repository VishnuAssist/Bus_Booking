import CommonTable from "../../Component/CommenTable";
import { useState } from "react";
import {
  useGetStaffCommissionsQuery,
  useGetMonthlySummarriesQuery,
} from "../../Api/rulesApi";

const HistoryTabel = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: staffCommissions } = useGetStaffCommissionsQuery({
    year: 2025,
    month: 10,
    userId: "1",
    storeId: 1,
    userGroupId: 1,
  });

  const { data: monthlySummarries } = useGetMonthlySummarriesQuery({
    year: 2025,
    month: 10,
    userId: "1",
    storeId: 1,
    userGroupId: 1,
  });

  const HistoryColumns = [
    { id: "userId", label: "UserID" },
    { id: "username", label: "UserName" },
    { id: "position", label: "Position" },
    { id: "target", label: "Target" },
    { id: "sales", label: "Sales" },
    { id: "payout", label: "PayOut" },
    { id: "store", label: "Store" },
    { id: "targetAchivement", label: "Target Achivement" },
    { id: "storeKpi", label: "Store KPI Achivement" },
    { id: "mcDays", label: "No of MC/UPL Days" },
    { id: "workingDays", label: "Total No of Working Day" },
    { id: "date", label: "Date" },
    { id: "totalPayout", label: "Total payout" },
    { id: "remarks", label: "Remarks" },
  ];

  const HistorySampleData = [
    {
      userId: "U101",
      username: "John Doe",
      position: "Sales Executive",
      target: 50000,
      sales: 48000,
      payout: 4500,
      store: "Store A",
      targetAchivement: "96%",
      storeKpi: "92%",
      mcDays: 2,
      workingDays: 26,
      date: "2025-09-01",
      totalPayout: 4700,
      remarks: "Good performance",
    },
    {
      userId: "U102",
      username: "Jane Smith",
      position: "Store Manager",
      target: 80000,
      sales: 82000,
      payout: 7000,
      store: "Store B",
      targetAchivement: "102%",
      storeKpi: "98%",
      mcDays: 1,
      workingDays: 28,
      date: "2025-09-01",
      totalPayout: 7200,
      remarks: "Exceeded target",
    },
    {
      userId: "U103",
      username: "Michael Lee",
      position: "Assistant Manager",
      target: 60000,
      sales: 55000,
      payout: 5000,
      store: "Store C",
      targetAchivement: "91%",
      storeKpi: "89%",
      mcDays: 3,
      workingDays: 25,
      date: "2025-09-01",
      totalPayout: 5100,
      remarks: "Needs improvement",
    },
    {
      userId: "U104",
      username: "Emily Davis",
      position: "Cashier",
      target: 30000,
      sales: 31000,
      payout: 2500,
      store: "Store A",
      targetAchivement: "103%",
      storeKpi: "95%",
      mcDays: 0,
      workingDays: 27,
      date: "2025-09-01",
      totalPayout: 2600,
      remarks: "Excellent",
    },
    {
      userId: "U105",
      username: "Chris Johnson",
      position: "Sales Associate",
      target: 40000,
      sales: 35000,
      payout: 3000,
      store: "Store B",
      targetAchivement: "87%",
      storeKpi: "85%",
      mcDays: 4,
      workingDays: 24,
      date: "2025-09-01",
      totalPayout: 3100,
      remarks: "Below expectations",
    },
    {
      userId: "U106",
      username: "Sophia Martinez",
      position: "Floor Supervisor",
      target: 70000,
      sales: 69000,
      payout: 6000,
      store: "Store C",
      targetAchivement: "98%",
      storeKpi: "94%",
      mcDays: 1,
      workingDays: 26,
      date: "2025-09-01",
      totalPayout: 6100,
      remarks: "Consistent performer",
    },
  ];

  return (
    <>
      <CommonTable
        columns={HistoryColumns}
        rows={HistorySampleData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </>
  );
};
export default HistoryTabel;
