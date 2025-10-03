import { Helmet } from "@dr.pogodin/react-helmet";
import PageHeader from "../../Component/pageHeaderAnimation";
import PageTitleWrapper from "../../Component/PageTitleWrapper";

import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

import LeaderBoardDetail from "./LeaderBoardDetail";
import Footer from "../../Component/Footer";

const Index = () => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    const [form, setForm] = useState(false);
    const openForm = () => {
      setForm(true);
    };
    const closeForm = () => {
      setForm(false);
    };
  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
         <PageTitleWrapper>
      <PageHeader title ="Leaderboards" description="Compete with your team and track performance" btntitle="" icon={""} onActionClick={openForm}/>
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
             <LeaderBoardDetail/>
        </Grid>
        </Grid>
      </Box>
      <Footer/>
      
    </div>
  )
}

export default Index
