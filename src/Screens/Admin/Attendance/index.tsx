import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import AdminAttendanceList from "./components/AdminAttendanceList";
// import AttendanceDashboard from "./components/AttendanceDashboard";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CommonDrawer from "./components/CommonDrawer";
import { useState } from "react";
import { ViewIcon } from "../../../Assests/Icons/icons";
import ShiftRequestList from "./components/ShiftRequestList";
import AttendanceRequestList from "./components/AttendanceRequestList";

const AdminAttendance = () => {
  const [attendanceRequests, setAttendanceRequests] = useState(false);
  const [shiftRequests, setShiftRequests] = useState(false);
  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Attendance"
          subtitle="Track your earnings and performance"
          icon={<AccessTimeOutlinedIcon />}
          btntitle="Attendance Requests"
          onActionClick={() => setAttendanceRequests(true)}
          icon2={<ViewIcon />}
          btntitle2="Shift Requests"
          onActionClick2={() => setShiftRequests(true)}
        />

        {/* <AttendanceDashboard /> */}
        <AdminAttendanceList />
      </CommisionContainer>

      <CommonDrawer
        anchor="bottom"
        isOpen={attendanceRequests}
        onClose={() => setAttendanceRequests(false)}
        title="Attendance Request List"
        children={<AttendanceRequestList />}
      />

      <CommonDrawer
        anchor="bottom"
        isOpen={shiftRequests}
        onClose={() => setShiftRequests(false)}
        title="Shift Request List"
        children={<ShiftRequestList />}
      />
    </>
  );
};
export default AdminAttendance;
