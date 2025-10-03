import { Grid } from "@mui/material";
// import CommisionContainer from "../../../Component/container";
import ClockInButton from "./clock";
import AttendanceList from "./attendenceList";

const Attendance = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, md: 4 }}>
          <ClockInButton />
        </Grid>
        <Grid size={{ sm: 12, md: 8 }}>
          <AttendanceList />
        </Grid>
      </Grid>
    </>
  );
};

export default Attendance;
