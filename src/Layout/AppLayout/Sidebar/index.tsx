import { useContext } from 'react';

import { NavLink as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import SidebarMenu from './SidebarMenu';

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { SidebarContext } from '../../../Context/SidebarContext';
import Scrollbar from '../../../Component/Scrollbar';
const SidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  color: theme.colors.alpha.trueWhite[70],
  background:
    theme.palette.mode === "dark"
      ? alpha(lighten(theme?.header?.background || "black", 0.1), 0.5)
      : darken(theme.colors.alpha.black[100], 0.5),
  position: "relative",
  zIndex: 7,
  height: "100%",
  width: expanded ? theme.sidebar.width : 80,
  transition: "width 0.6s ease-in-out",
  overflowX: "hidden",
  overflowY: "hidden",
  [theme.breakpoints.up("sm")]: {
    marginTop: "0px",
  },
  [theme.breakpoints.up("md")]: {
    marginTop: "0px",
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: "56px",
  },
}));


function Sidebar({ expanded, setExpanded }: { expanded: boolean, setExpanded: (e: boolean) => void }) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const handleToggle = () => setExpanded(!expanded);
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        expanded={expanded}
        sx={{
          pb: 15,
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >

        {/* <Divider /> */}
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
          <Button
            component={RouterLink}
            to="https://leasedoc.netlify.app"
            variant="contained"
            color="success"
            size="small"
            fullWidth
            endIcon={<QuestionMarkIcon sx={{ mr: 2 }} />}
          >
            {expanded && "FAQ"}
          </Button>
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
          expanded={true}
          sx={{
            pb: 16.5,
            width: theme.sidebar.width,
          }}
        >

          <Scrollbar>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu expanded={true} expand={handleToggle} mobile={true} />
          </Scrollbar>
          <Box p={2}>
            <Button
              component={RouterLink}
              to="https://leasedoc.netlify.app"
              variant="contained"
              color="success"
              size="small"
              fullWidth
              endIcon={<QuestionMarkIcon sx={{ mr: 2 }} />}
            >
              {expanded && "FAQ"}
            </Button>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
