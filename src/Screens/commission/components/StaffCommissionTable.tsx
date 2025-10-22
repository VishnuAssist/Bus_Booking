import CommonTable from "../../../Component/CommenTable";
import { useGetStaffCommissionsQuery } from "../../../Api/commisionApi";
import { staffCommissionsTableDataService } from "../services/staffCommissionsTableDataService";

const StaffCommissionTable = () => {
  // const queryParams: MonthlySummarriesType = {
  //   year: 2025,
  //   month: 10,
  //   userId: "1",
  //   storeId: 1,
  //   userGroupId: 1,
  // };

  const { data: staffCommissions } = useGetStaffCommissionsQuery();
  const { columns, rows } = staffCommissionsTableDataService(staffCommissions);

  return (
    <>
      <CommonTable columns={columns} rows={rows} />
    </>
  );
};
export default StaffCommissionTable;
