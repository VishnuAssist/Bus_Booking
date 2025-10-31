import { Box, Tab } from "@mui/material";
// import LeaveView from "./LeaveView";
// import CommisionContainer from "../../../Component/container";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import StaffCommissionTable from "../../commission/components/StaffCommissionTable";
// import StaffGroupSummaryTable from "../../commission/components/StaffGroupSummaryTable";
// import StaffSummaryTable from "../../commission/components/StaffSummaryTable";
import { useState } from "react";
import CommisionContainer from "../../Component/container";
import Attendance from "./Attendence";
import ShiftRequestindex from "./ShiftRequest";
import LeaveView from "./LeaveRequest/LeaveView";
// import Attendance from "../Attendence";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SellIcon from "@mui/icons-material/Sell";
import TabLayout from "../../Layout/TabLayout";

const index = () => {
  const [value, setValue] = useState("attendance");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Attendance",
      path: "/staff-service/attendance",
      icon: <SellIcon />,
    },
    {
      label: "Shift Request",
      path: "/staff-service/shift-request",
      icon: <AdminPanelSettingsIcon />,
    },
    {
      label: "Leave Request",
      path: "/staff-service/leave-request",
      icon: <StoreIcon />,
    },
  ];

  // return (
  //   // <CommisionContainer>
  //   <TabContext value={value}>
  //     <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
  //       <TabList onChange={handleChange} aria-label="lab API tabs example">
  //         <Tab label="Attendence" value="attendance" />
  //         <Tab label="Shift Request" value="shift-Request" />
  //         <Tab label="Leave Request" value="leave-Request" />
  //       </TabList>
  //     </Box>
  //     <TabPanel value="attendance" sx={{ padding: 0 }}>
  //       <Attendance />
  //     </TabPanel>
  //     <TabPanel value="shift-Request" sx={{ padding: 0 }}>
  //       <ShiftRequestindex />
  //     </TabPanel>
  //     <TabPanel value="leave-Request" sx={{ padding: 0 }}>
  //       <LeaveView />
  //     </TabPanel>
  //   </TabContext>
  // );

  return <TabLayout tabs={tabs}></TabLayout>;
};

export default index;
