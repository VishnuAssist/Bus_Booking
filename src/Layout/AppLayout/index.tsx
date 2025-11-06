import { FC } from "react";
import { Box, alpha, lighten, useTheme, useMediaQuery, Card } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "../../Component/Footer";
import TopMenu from "./Topbar";

const SidebarLayout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const topBarHeight = 50; // height for TopMenu

  return (
    <Box sx={{ flex: 1, height: "100%" }}>
      {/* Fixed Header */}
      <Header />
<Card >
      <TopMenu />
</Card>
      {/* Page Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          pt: `calc(${theme.header.height} + ${topBarHeight}px)`,
        }}
      >
        <Box display="block" sx={{ pb: isMobile ? "56px" : 0 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default SidebarLayout;
