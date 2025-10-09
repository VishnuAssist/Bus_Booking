import { Grid } from "@mui/material";
import ClockInButton from "./clock";
import AttendanceList from "./attendenceList";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import Footer from "../../../Component/Footer";

const Attendance = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader title="Attendance" subtitle="Manage your attendance and work activities" />

        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 4 }}>
            <ClockInButton />
          </Grid>
          <Grid size={{ sm: 12, md: 8 }}>
            <AttendanceList />
          </Grid>
        </Grid>
      </CommisionContainer>

      <Footer />
    </>
  );
};

export default Attendance;
