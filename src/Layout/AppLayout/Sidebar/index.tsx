import { useContext } from "react";
// import Scrollbar from "../../../components/Scrollbar";
// import { SidebarContext } from "../../../contexts/sidebarContext";
import { Link } from "react-router-dom";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import SidebarMenu from "./SidebarMenu";
// import Logo from "../../../components/LogoSign";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Scrollbar from "../../../Component/Scrollbar";
import { SidebarContext } from "../../../Context/SidebarContext";

function Sidebar({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (e: boolean) => void;
}) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const handleToggle = () => setExpanded(!expanded);
  const theme = useTheme();

  const SidebarWrapper = styled(Box)(
    ({ theme }) => `
  
     
          color: ${theme.colors.alpha.trueWhite[70]};
          position: relative;
          z-index: 7;
          height: 100%;
         
  `
  );
  return (
    <>
      <SidebarWrapper
        sx={{
          pb: expanded ? 16 : 14,
          width: expanded ? theme.sidebar.width : 80,
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(
                  lighten(
                    theme.header.background || theme.colors.alpha.black[100],
                    0.1
                  ),
                  0.5
                )
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Box
          width={"100%"}
          mt={expanded ? 0 : 1.2}
          display={"flex"}
          mx={expanded ? 1 : 1}
        >
          <Box
            pb={expanded ? 1.7 : 0.5}
            pr={expanded ? 1.7 : 1.4}
            sx={{
              width: "100%",
            }}
          >
            {expanded ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                <IconButton sx={{bgcolor: "secondary.main", borderRadius: "4px" }}>
                  <FilterTiltShiftIcon />
                </IconButton>
                <Box>
                  <Typography fontSize={16} fontWeight={700}>
                    Zone Commission
                  </Typography>
                  <Typography fontSize={12}>Performance Platform</Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton sx={{ bgcolor: "secondary.main", borderRadius: "4px" }}>
                  <FilterTiltShiftIcon />
                </IconButton>
              </Box>
            )}

            {/* <Logo size={expanded ? 85 : 70} /> */}
          </Box>
        </Box>
        <Divider
          sx={{
            // mt: theme.spacing(1),
            mx: theme.spacing(2),
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Scrollbar>
          <SidebarMenu
            expanded={expanded}
            expand={handleToggle}
            mobile={false}
          />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box p={1}>
          {expanded ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                AK
              </Avatar>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} color="white">
                  Super Admin
                </Typography>
                <Typography variant="body2" color="white">
                  Admin
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
                    <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                AK
              </Avatar>
            </Box>
          )}
          {/* <Link
            to="https://claims-assist-docs.vercel.app/"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <Button
              variant="contained"
              color="success"
              size="small"
              fullWidth
              startIcon={<LiveHelpIcon sx={{ ml: 1 }} />}
            >
              {expanded && "FAQ123"}
            </Button>
          </Link> */}
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            pb: 7.5,
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
            width: theme.sidebar.width,
          }}
        >
          <Scrollbar>
            <SidebarMenu expanded={true} expand={handleToggle} mobile={true} />
          </Scrollbar>
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <Box p={2}>
            <Link
              to="https://claims-assist-docs.vercel.app/"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                fullWidth
                startIcon={<LiveHelpIcon />}
              >
                FAQ
              </Button>
            </Link>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
