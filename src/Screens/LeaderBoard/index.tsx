import { Grid } from "@mui/material";
import LeaderBoardDetail from "./LeaderBoardDetail";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/commonPageHeader";

const Index = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Leaderboards"
          subtitle="Compete with your team and track performance"
        />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{ xs: 12 }}>
            <LeaderBoardDetail />
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};

export default Index;
