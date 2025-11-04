import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import CommonDrawer from "../Attendance/components/CommonDrawer";
import RequestView from "./RequestView";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useState } from "react";
import CommonTable from "../../../Component/CommenTable";
import { userTableDataService } from "./services/userTableDataService";
import { CommonDialog } from "../../../Component/forms/FormDialog";
import type { Adminleaverequesttype, LeaveSummaryQueryParamsType } from "../../../model/LeaveRequest";
import {
  AdminLeaveReqFields,
  AdminLeaveReqFieldsValidationSchema,
} from "../../../feilds_validation/adminLeaveReqFields";
import { useGetSummaryLeavesQuery } from "../../../Api/LeaveRequestApi";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";

const usersData = {
  items: [
    {
      id: 1,
      userName: "Riyas Khan",
      approved: "Yes",
      remainingBalance: "5 Days",
    },
    {
      id: 2,
      userName: "Aisha Patel",
      approved: "No",
      remainingBalance: "12 Days",
    },
    {
      id: 3,
      userName: "John Mathew",
      approved: "Pending",
      remainingBalance: "8 Days",
    },
    {
      id: 4,
      userName: "Sneha Verma",
      approved: "Yes",
      remainingBalance: "2 Days",
    },
    {
      id: 5,
      userName: "Arjun Mehta",
      approved: "No",
      remainingBalance: "10 Days",
    },
  ],
};

const UserLeaveList = () => {

  const [queryParams, setQueryParams] = useState<LeaveSummaryQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: "",
    EndDate: "",
    userId:""
  });
  const { data: leaveSummary } = useGetSummaryLeavesQuery(queryParams);
  
  console.log("leaveSummary", leaveSummary);

  const [leaveRequest, setLeaveRequest] = useState(false);
  const [addTimeOffOpen, setAddTimeOffOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { columns, rows } = userTableDataService(usersData?.items);

  const adminLeaveReqFields = () => {
    const fields = [...AdminLeaveReqFields];
    return fields;
  };

  const onSubmitReq = (formData: Adminleaverequesttype) => {
    console.log("Submitted:", formData);
    setAddTimeOffOpen(false);
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Requested Leave Details"
          icon={<AccessTimeOutlinedIcon />}
          btntitle="Add Time Off"
          onActionClick={() => setAddTimeOffOpen(true)}
          btntitle2={`Pending Requests (${pendingCount})`}
          onActionClick2={() => setLeaveRequest(true)}
        />

        <CommonTable
          columns={columns}
          rows={rows}
          actions={{
            onView: (rows) => setLeaveRequest(true),
          }}
        />
      </CommisionContainer>

      <CommonDialog
        open={addTimeOffOpen}
        onClose={() => setAddTimeOffOpen(false)}
        onSubmit={onSubmitReq}
        title="Add Leave Request"
        validationSchema={AdminLeaveReqFieldsValidationSchema}
        fields={adminLeaveReqFields()}
        defaultValues={{}}
      />

      <CommonDrawer
        anchor="bottom"
        isOpen={leaveRequest}
        onClose={() => setLeaveRequest(false)}
        title="Pending Leave Request"
        children={<RequestView onPendingCountChange={setPendingCount} />}
      />
    </>
  );
};

export default UserLeaveList;
