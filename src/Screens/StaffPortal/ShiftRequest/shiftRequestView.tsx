import PageHeader from "../../../Component/commonPageHeader";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import CommonTable from "../../../Component/CommenTable";
import type { leaverequesttype } from "../../../model/LeaveRequest";
import Footer from "../../../Component/Footer";
// import LeaveForm from "./LeaveForm";
import {
  useDeleteLeaveMutation,
  useGetallLeavesQuery,
} from "../../../Api/StaffservicesApi";
import AppPagination from "../../../Component/AppPagination";
import type {
  // MonthlySummarriesQueryParamsType,
  ShiftQueryParamsType,
} from "../../../model/commissionType";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import ShiftFilter from "../../shift/ShiftFilter";
import ShiftRequestDialog from "./shiftRequestForm";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ShiftRequestView = () => {
  const [LeaveRequest, setLeaveRequests] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] =
    useState<leaverequesttype | null>(null);

  const [queryParams, setQueryParams] = useState<ShiftQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
  });

  const handleQueryParamsChange = (newQueryParams: ShiftQueryParamsType) => {
    if (
      queryParams.StartDate !== newQueryParams.StartDate ||
      queryParams.EndDate !== newQueryParams.EndDate ||
      queryParams.SearchTerm !== newQueryParams.SearchTerm
    ) {
      setQueryParams(newQueryParams);
    }
  };

  const { data: leaveData } = useGetallLeavesQuery(queryParams);

  const [deleteLeave] = useDeleteLeaveMutation();
  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "leaveType", label: "Shift Type", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 100, format: formatDate },
    { id: "endDate", label: "End Date", minWidth: 100, format: formatDate },
    { id: "reason", label: "Reason", minWidth: 200 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      format: (value: string) => (
        <span
          style={{
            color:
              value === "Approved"
                ? "green"
                : value === "Rejected"
                ? "red"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleDelete = async (row: leaverequesttype) => {
    await deleteLeave(row?.id || 0);
    console.log("row", row);
  };

  const handleView = (row: leaverequesttype) => console.log("View", row);

  return (
    <>
      <PageHeader
        title="Shift Request"
        subtitle="Manage your Shift requests"
        btntitle2="Apply"
        // btntitle="Approval"
        icon={<DescriptionOutlinedIcon />}
        icon2={<AccessTimeIcon />}
        onActionClick2={() => setLeaveRequests(true)}
        // onActionClick={() => setLeaveRequests(true)}
      />

      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <ShiftFilter
                queryParams={queryParams}
                onQueryParamsChange={handleQueryParamsChange}
              />
              <CommonTable
                columns={columns as any}
                rows={leaveData?.items || []}
                actions={{
                  onView: handleView,
                  onEdit: (row) => {
                    setSelectedLeaveRequest(row);
                    setLeaveRequests(true);
                  },
                  onDelete: handleDelete,
                }}
              />
              {leaveData?.metaData && (
                <AppPagination
                  metaData={leaveData?.metaData}
                  onPageChange={(page: number) => {
                    setQueryParams({ ...queryParams, PageNumber: page });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ShiftRequestDialog
        selectedLeaveRequest={selectedLeaveRequest}
        onClose={() => setLeaveRequests(false)}
        open={LeaveRequest}
      />
      <Footer />
    </>
  );
};

export default ShiftRequestView;
