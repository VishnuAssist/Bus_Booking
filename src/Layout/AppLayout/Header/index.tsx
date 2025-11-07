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

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: alpha(
    theme.header?.background || theme.palette.background.paper,
    0.95
  ),
  backdropFilter: "blur(6px)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
}));
interface HeaderProps {
  expanded: boolean;
  setExpanded: (e: boolean) => void;
}

function Header({ expanded, setExpanded }: HeaderProps) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleExpand = () => setExpanded(!expanded);

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
