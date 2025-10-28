import { Grid } from "@mui/material";
import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import HeaderCard from "./HeaderCard";
import TeamPerformance from "./TeamPerformance";
import TeamInsights from "./TeamInsights";
import Footer from "../../../Component/Footer";

const TeamOverview = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader title="Team Overview" />

        <Grid container spacing={2}>
          <Grid size={12}>
            <HeaderCard />
          </Grid>
          <Grid size={8}>
            <TeamPerformance />
          </Grid>
          <Grid size={4}>
            <TeamInsights />
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};

export default TeamOverview;
