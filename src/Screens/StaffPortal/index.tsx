import { Grid } from "@mui/material";
import Footer from "../../Component/Footer";
import StaffPortalDetail from "./StaffPortalDetail";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/commonPageHeader";


const Index = () => {

  return (
    <>
      <CommisionContainer>
        <PageHeader title="Staff Portal" subtitle="Manage your attendance, requests, and work activities" btntitle="Edit Profile" />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{ xs: 12 }}>
            <StaffPortalDetail />

          </Grid>
        </Grid>
      </CommisionContainer>

      <Footer />

    </>
  )
}

export default Index;