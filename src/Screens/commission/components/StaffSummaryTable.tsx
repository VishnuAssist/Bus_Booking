import CommonTable from "../../../Component/CommenTable";
import { useGetMonthlySummarriesQuery } from "../../../Api/commisionApi";
import { staffMonthlySummaryTableDataService } from "../services/staffMonthlySummaryTableDataService";

const StaffSummaryTable = () => {
  // const queryParams: MonthlySummarriesType = {
  //   year: 2025,
  //   month: 10,
  //   userId: "1",
  //   storeId: 1,
  //   userGroupId: 1,
  // };
  const { data: monthlySummarries } = useGetMonthlySummarriesQuery();
  const { columns, rows } =
    staffMonthlySummaryTableDataService(monthlySummarries);

  return (
    <>
      <CommonTable columns={columns} rows={rows} />
    </>
  );
};
export default StaffSummaryTable;
