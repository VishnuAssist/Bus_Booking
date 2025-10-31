import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SellIcon from "@mui/icons-material/Sell";
import TabLayout from "../../Layout/TabLayout";

const index = () => {
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

  return <TabLayout tabs={tabs}></TabLayout>;
};

export default index;
