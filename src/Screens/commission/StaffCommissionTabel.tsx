import CommonTable from "../../Component/CommenTable";
import { useState } from "react";
import {
  useGetStaffCommissionsQuery,
  // useGetMonthlySummarriesQuery,
} from "../../Api/rulesApi";
// import type { MonthlySummarriesType } from "../../model/rulesType";
import { getTableData } from "./services/staffCommissionsService";

const StaffCommissionTabel = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const queryParams: MonthlySummarriesType = {
  //   year: 2025,
  //   month: 10,
  //   userId: "1",
  //   storeId: 1,
  //   userGroupId: 1,
  // };

  const { data: staffCommissions } = useGetStaffCommissionsQuery();

  const { columns, rows } = getTableData(staffCommissions);

  // const { data: monthlySummarries } = useGetMonthlySummarriesQuery({
  //   year: 2025,
  //   month: 10,
  //   userId: "1",
  //   storeId: 1,
  //   userGroupId: 1,
  // });

  return (
    <>
      <CommonTable columns={columns} rows={rows} />
    </>
  );
};
export default StaffCommissionTabel;
