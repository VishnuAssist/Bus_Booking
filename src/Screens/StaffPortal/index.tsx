import { Helmet } from "@dr.pogodin/react-helmet";
import PageHeader from "../../Component/pageHeaderAnimation";
import PageTitleWrapper from "../../Component/PageTitleWrapper";

import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";



import Footer from "../../Component/Footer";
import StaffPortalDetail from "./StaffPortalDetail";


const Index = () => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
         <PageTitleWrapper>
      <PageHeader title ="Staff Portal" description="Manage your attendance, requests, and work activities" btntitle="Edit Profile" icon={""} />
      </PageTitleWrapper>
    

         <Box sx={{ maxWidth: "95%", mx: isMobile ? 1 : 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{xs:12}}>
             <StaffPortalDetail/>
             
        </Grid>
        </Grid>
      </Box>
      <Footer/>
      
    </div>
  )
}

export default Index
