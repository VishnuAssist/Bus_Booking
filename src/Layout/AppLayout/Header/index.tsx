import { useContext, useState } from "react";
import {
  Box,
  alpha,
  lighten,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Container,
  useMediaQuery,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import { useNavigate } from "react-router";


import { SidebarContext } from "../../../Context/SidebarContext";

// Styled HeaderWrapper
const HeaderWrapper = styled(Box)(({ theme }) => ({
  height: theme.header.height,
  color: theme.header.textColor,
  right: 0,
  top: 0,
  zIndex: 6,
  position: "fixed",
  width: "100%",
  display: "flex",
  alignItems: "center",
  background: "#F9FAFC",
  backgroundColor: "transparent",
  backdropFilter: "blur(1px)",
  transition: theme.transitions.create(["left", "width"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 1px 0 ${alpha(lighten(theme.colors.primary.main, 0.7), 0.15)},
         0px 2px 8px -3px rgba(0, 0, 0, 0.2),
         0px 5px 22px -4px rgba(0, 0, 0, 0.1)`
      : `0px 2px 8px -3px ${alpha(theme.colors.alpha.black[100], 0.2)},
         0px 5px 22px -4px ${alpha(theme.colors.alpha.black[100], 0.1)}`,
}));

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setShowSearchMobile((prev) => !prev);
  };

  const handleLogoClick = () => {
    navigate("/dashboards/LeaseDashboard");
  };

  return (
    <HeaderWrapper sx={{ height: isMobile ? "60px" : theme.header.height }}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: theme.header.height,
          px: 2,
        }}
      >
        {isMobile && showSearchMobile ? (
          
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          >
            <IconButton onClick={handleSearchToggle}>
              <ArrowBackIcon />
            </IconButton>
            
          </Box>
        ) : (
          
          <>
          
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ width: isMobile ? 50 : 42, cursor: "pointer" }} onClick={handleLogoClick}>
                {/* <Logo /> */}
              </Box>
            
            </Box>

           
            <Box
              sx={{
                display: {  lg: "flex" },
                alignItems: "center",
                justifyContent: "center",
                // height: "90%",
                position: "absolute",
                left: {xs:"25%", sm:"70%",md:"50%", lg:"50%"},
                transform: "translateX(-50%)",
                bgcolor:"rgb(85,105,254)",
                
                borderRadius: 1,
                px: 0.8,
                py: 0.5,
                my: 1,
                
                color: "white",
                fontWeight: "bold",
              }}
            >
             
            </Box>

            
            <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
              
            
              {!isMobile && (
                <Box
                  component="span"
                  sx={{
                    display: { xs: "inline-flex", lg: "none" },
                    ml: 1,
                  }}
                >
                  <Tooltip arrow title="Toggle Menu">
                    <IconButton color="primary" onClick={toggleSidebar}>
                      {sidebarToggle ? (
                        <CloseTwoToneIcon fontSize="small" />
                      ) : (
                        <MenuTwoToneIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </HeaderWrapper>
  );
}

export default Header;