import { Box, useTheme, useMediaQuery, Card } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "../../Component/Footer";
import TopMenu from "./Topbar";
import { useState, type FC } from "react";

const TopBarLayout: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const topBarHeight = 50;

  return (
    <Box sx={{ flex: 1, height: "100%" }}>
      <Header
        expanded={expanded}
        setExpanded={setExpanded}
        showSidebarToggle={false}
        isSidebarLayout={false}
      />

      <Card>
        <TopMenu />
      </Card>
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

export default TopBarLayout;
