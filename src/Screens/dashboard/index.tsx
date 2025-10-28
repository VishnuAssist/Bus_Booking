import { Grid } from "@mui/material";
import { Helmet } from "@dr.pogodin/react-helmet";
import DashCards from "./Cards";
import PageHeader from "./PageHeader";
import QuickAction from "./QuickAction";
import Leaderboard from "./Leaderboard.";
import Achievement from "./Achievements";
import CommisionContainer from "../../Component/container";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <CommisionContainer>
        <Grid container spacing={2}>
          <Grid size={12}>
            <PageHeader />
          </Grid>
          <Grid size={12}>
            <QuickAction />
          </Grid>
          <Grid size={12}>
            <DashCards />
          </Grid>
          <Grid size={6}>
            <Leaderboard />
          </Grid>
          <Grid size={6}>
            <Achievement />
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};
export default Dashboard;
