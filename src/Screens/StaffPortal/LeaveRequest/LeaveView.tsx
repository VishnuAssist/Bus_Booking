import PageHeader from "../../../Component/commonPageHeader";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import CommonTable from "../../../Component/CommenTable";
import type {
  leaveReqTableType,
  leaverequesttype,
  StatusItem,
} from "../../../model/LeaveRequest";
import AppPagination from "../../../Component/AppPagination";
import type { ShiftQueryParamsType } from "../../../model/commissionType";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import ShiftFilter from "../../shift/ShiftFilter";
// import LeaveRequestDialog from "./LeaveForm";
import CommisionContainer from "../../../Component/container";
import { useGetstatusQuery } from "../../../Api/dictionaryApi";
import { CommonDialog } from "../../../Component/forms/FormDialog";
import {
  LeaveRequestFormFields,
  leaveRequestFormValidationSchema,
} from "../../../feilds_validation/leaveRequestFields";
import {
  useDeleteLeaveMutation,
  useGetallLeavesQuery,
  useGetLeavePolicyQuery,
  usePostLeaveMutation,
  usePutLeavesMutation,
} from "../../../Api/leaveRequestApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Store/StoreConfig";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const LeaveView = () => {
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

  const { data: policyData } = useGetLeavePolicyQuery({});
  const { data: leaveData } = useGetallLeavesQuery(queryParams);
  const { data: statusData } = useGetstatusQuery({});
  const [postLeave] = usePostLeaveMutation();
  const [updateLeave] = usePutLeavesMutation();

  const [deleteLeave] = useDeleteLeaveMutation();

  const getLeaveFields = () => {
    const fields = [...LeaveRequestFormFields];

    const policyField = fields.find((f) => f.name === "leavePolicyId");
    if (policyField && policyData) {
      policyField.options = policyData?.items?.map((policy: any) => ({
        id: policy.id,
        name: policy?.name,
      }));
    }

    return fields;
  };
  const getStatusName = (id: number | string) => {
    const numericId = Number(id);
    const status = statusData?.statuses?.find(
      (s: StatusItem) => s.id === numericId
    );
    return status ? status.name : "Unknown";
  };

  const getStatusColor = (
    id: number
  ): "success" | "error" | "warning" | "default" => {
    const name = getStatusName(id).toLowerCase();
    switch (name) {
      case "approved":
        return "success";
      case "rejected":
      case "reject":
        return "error";
      case "waiting":
        return "warning";
      default:
        return "default";
    }
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "leavePolicyId", label: "Leave Policy", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 100, format: formatDate },
    { id: "endDate", label: "End Date", minWidth: 100, format: formatDate },
    { id: "reason", label: "Reason", minWidth: 200 },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      format: (value: number) => {
        const statusName = getStatusName(value);
        const color = getStatusColor(value);
        return (
          <span
            style={{
              color:
                color === "success"
                  ? "green"
                  : color === "error"
                  ? "red"
                  : color === "warning"
                  ? "orange"
                  : "gray",
              fontWeight: "bold",
            }}
          >
            {statusName}
          </span>
        );
      },
    },
  ];

  const onSubmit = async (formData: leaveReqTableType) => {
    console.log("formData", formData);
    try {
      const start = new Date(formData.startDate || "");
      const end = new Date(formData.endDate || "");

      const diffTime = end.getTime() - start.getTime();
      const leaveDays =
        diffTime >= 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 0;

      const payload = {
        leavePolicyId: formData.leavePolicyId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 1,
        leaveDays: leaveDays,
        reason: formData.reason,
      };

      if (selectedLeaveRequest?.id) {
        const response = await updateLeave({
          id: selectedLeaveRequest.id,
          ...payload,
        }).unwrap();
        console.log("Leave updated:", response);
      } else {
        const response = await postLeave(payload).unwrap();
        console.log("Leave submitted:", response);
      }
      setLeaveRequests(false);
    } catch (err) {
      console.error("Error submitting leave:", err);
    }
  };
  const handleDelete = async (row: leaverequesttype) => {
    await deleteLeave(row?.id || 0);
    console.log("row", row);
  };

  // const handleView = (row: leaverequesttype) => console.log("View", row);

  return (
    <CommisionContainer>
      <PageHeader
        title="Leave Request"
        subtitle="Manage your Leave requests"
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
      {/* <LeaveRequestDialog
        selectedLeaveRequest={selectedLeaveRequest}
        onClose={() => setLeaveRequests(false)}
        open={LeaveRequest}
      /> */}
      <CommonDialog
        open={LeaveRequest}
        onClose={() => setLeaveRequests(false)}
        onSubmit={onSubmit}
        title={
          selectedLeaveRequest ? "Edit Leave Request" : "Add Leave Request"
        }
        validationSchema={leaveRequestFormValidationSchema}
        fields={getLeaveFields()}
        defaultValues={selectedLeaveRequest || {}}
      />
    </CommisionContainer>
  );
};

export default LeaveView;
