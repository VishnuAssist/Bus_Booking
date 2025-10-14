import { Box, Grid } from "@mui/material";
import React from "react";
import CommonHeader from "./CommonHeader";
import HeaderCardView from "./HeaderCardView";
import TeamPerformance from "./TeamPerformance";
import SystemActivity from "./SystemActivity";
import CommisionContainer from "../../../Component/container";

const Index = () => {
  return (
    <>
      <CommisionContainer>
        <Box sx={{ mb: 2 }}>
          <CommonHeader />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <HeaderCardView />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TeamPerformance />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SystemActivity />
            </Grid>
          </Grid>
        </Box>
      </CommisionContainer>
    </>
  );
};

export default Index;
