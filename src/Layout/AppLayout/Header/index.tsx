import { useContext } from "react";
import {
  Box,
  alpha,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Container,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { useNavigate } from "react-router";

import { SidebarContext } from "../../../Context/SidebarContext";
import Modechanger from "./ModeChanger";
import SignOutButton from "./SignOut";

interface HeaderProps {
  expanded: boolean;
  setExpanded: (e: boolean) => void;
}

function Header({ expanded, setExpanded }: HeaderProps) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const HeaderWrapper = styled(Box)(
    ({ theme }) => `
          right: 0;
          z-index: 6;
          background-color: ${alpha(
            theme.header.background || theme.colors.alpha.black[100],
            0.95
          )};
          backdrop-filter: blur(3px);
          position: fixed;
          justify-content: space-between;
           width: 100%;
          @media (min-width: ${theme.breakpoints.values.lg}px) {
              left: ${expanded ? theme.sidebar.width : "80px"};
              width: auto;
          }
  `
  );

  const handleExpand = () => setExpanded(!expanded);
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
        {!isMobile && (
          <Button
            disableRipple
            onClick={handleExpand}
            sx={{
              minWidth: "auto",
              padding: 0.2,
              mr: 1,
              bgcolor: theme.colors.primary.main,
            }}
          >
            {expanded ? (
              <ChevronLeft sx={{ color: "white" }} />
            ) : (
              <ChevronRight sx={{ color: "white" }} />
            )}
          </Button>
        )}

        {isMobile ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{ width: isMobile ? 50 : 42, cursor: "pointer" }}
                // onClick={handleLogoClick}
              >
                {/* <Logo /> */}
              </Box>
            </Box>

            {/* <Box
              sx={{
                display: { lg: "flex" },
                alignItems: "center",
                justifyContent: "center",
                // height: "90%",
                position: "absolute",
                left: { xs: "25%", sm: "70%", md: "50%", lg: "50%" },
                transform: "translateX(-50%)",
                bgcolor: "rgb(85,105,254)",

                borderRadius: 1,
                px: 0.8,
                py: 0.5,
                my: 1,

                color: "white",
                fontWeight: "bold",
              }}
            >

              
            </Box> */}

            <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
              <Modechanger />
              <SignOutButton />
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
