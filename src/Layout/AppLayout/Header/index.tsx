import {
  Box,
  styled,
  alpha,
  useTheme,
  Container,
  useMediaQuery,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
import Modechanger from "./ModeChanger";
import SignOutButton from "./SignOut";
import Logo from "../../../Assests/Icons/valiram2.png";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccessibilityNewSharpIcon from "@mui/icons-material/AccessibilityNewSharp";
import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { SidebarContext } from "../../../Context/SidebarContext";

interface HeaderProps {
  expanded: boolean;
  setExpanded: (e: boolean) => void;
}

function Header({ expanded, setExpanded }: HeaderProps) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  console.log("sidebarToggle", sidebarToggle);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleExpand = () => setExpanded(!expanded);

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
  
  return (
    <HeaderWrapper sx={{ height: isMobile ? 60 : theme.header.height }}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          position: "relative",
        }}
      >
        {!isMobile && (
          <Button
            disableRipple
            onClick={() => {
              if (window.innerWidth < theme.breakpoints.values.lg) {
                toggleSidebar();
              } else {
                handleExpand();
              }
            }}
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
        <Box display="flex" alignItems="center" gap={1}>
          {!isMobile && (
            <Paper
              sx={{
                px: 1.5,
                py: 0.2,
                display: "flex",
                alignItems: "center",
                borderRadius: 3,
              }}
            >
              <SearchIcon fontSize="small" />
              <InputBase placeholder="Search..." sx={{ ml: 1, fontSize: 14 }} />
            </Paper>
          )}
        </Box>

        {!isMobile && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <img src={Logo} alt="Logo" style={{ height: 40 }} />
          </Box>
        )}

        <Box display="flex" alignItems="center" gap={1} ml="auto">
          <Tooltip title="Notification">
            <IconButton>
              <NotificationsActiveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Accessibility">
            <IconButton>
              <AccessibilityNewSharpIcon />
            </IconButton>
          </Tooltip>
          <Modechanger />
          <Tooltip title="Profile">
            <IconButton>
              <AssignmentIndIcon />
            </IconButton>
          </Tooltip>
          <SignOutButton />
        </Box>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
