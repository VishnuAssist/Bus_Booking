import TabLayout from "../../Layout/TabLayout";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SellIcon from "@mui/icons-material/Sell";

const STS = () => {
  const tabs = [
    { label: "Sales", path: "/sts/sales", icon: <SellIcon /> },
    { label: "Target", path: "/sts/target", icon: <AdminPanelSettingsIcon /> },
    { label: "Store", path: "/sts/store", icon: <StoreIcon /> },
  ];

  return <TabLayout tabs={tabs}></TabLayout>;
};
export default STS;
