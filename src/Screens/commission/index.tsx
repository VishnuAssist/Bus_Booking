import { Grid } from "@mui/material";
import PageFilter from "./PageFilter";
import Cards from "./Cards";
import Structure from "./Structure";
import Breakdown from "./Breakdown";
import MonthlyHistory from "./MonthlyHistory";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import PageHeader from "../../Component/commonPageHeader";
import CalculateIcon from "@mui/icons-material/Calculate";
import StaffSummaryTable from "./components/StaffSummaryTable";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import StaffCommissionDialogue from "./components/StaffCommissionDialogue";
import MonthlySummaryDialogue from "./components/MonthlySummaryDialogue";
import StaffCommissionTable from "./components/StaffCommissionTable";

const Commission = () => {
  const [staffCommissionModalOpen, setStaffCommissionModalOpen] =
    useState(false);
  const [monthlySummaryModalOpen, setMonthlySummaryModalOpen] = useState(false);

  const [value, setValue] = useState("staff-commission");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Commission"
          subtitle="Track your earnings and performance"
          icon={<CalculateIcon />}
          btntitle="Process Staff Commission"
          onActionClick={() => setStaffCommissionModalOpen(true)}
          icon2={<CalculateIcon />}
          btntitle2="Process Monthly Summary"
          onActionClick2={() => setMonthlySummaryModalOpen(true)}
        />

        <Grid container spacing={2}>
          <Grid size={12}>
            <PageFilter />
          </Grid>
          <Grid size={12}>
            <Cards />
          </Grid>
          <Grid size={6}>
            <Breakdown />
          </Grid>
          <Grid size={6}>
            <MonthlyHistory />
          </Grid>
          <Grid size={12}>
            <Structure />
          </Grid>
          <Grid size={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Staff Commission" value="staff-commission" />
                    <Tab
                      label="Staff Monthly Summary"
                      value="staff-monthly-summary"
                    />
                  </TabList>
                </Box>
                <TabPanel value="staff-commission" sx={{ padding: 0 }}>
                  <StaffCommissionTable />
                </TabPanel>
                <TabPanel value="staff-monthly-summary" sx={{ padding: 0 }}>
                  <StaffSummaryTable />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </CommisionContainer>

      <StaffCommissionDialogue
        open={staffCommissionModalOpen}
        onClose={() => setStaffCommissionModalOpen(false)}
      />

      <MonthlySummaryDialogue
        open={monthlySummaryModalOpen}
        onClose={() => setMonthlySummaryModalOpen(false)}
      />
    </>
  );
};
export default Commission;
