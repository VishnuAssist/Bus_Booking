import { Grid } from "@mui/material";
import ProfileDetail from "./ProfileDetail";
import Footer from "../../Component/Footer";
import { AchievementDemo } from "../Acheivement";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/commonPageHeader";

const Index = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="My Profile"
          subtitle="Manage your account and preferences"
        />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{ xs: 12 }}>
            <ProfileDetail />
            <AchievementDemo />
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};

export default Index;
