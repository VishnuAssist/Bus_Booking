import { useState } from "react";
import {
  Button,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const menuItems = [
  {
    label: "Dashboard",
    link: "/dashboards/Dashboard",
    icon: <DashboardIcon />,
    category: "main",
  },
  {
    label: "LeaderBoard",
    link: "/dashboards/LeaderBoard",
    icon: <EmojiEventsOutlinedIcon />,
    category: "main",
  },
  {
    label: "Employee",
    icon: <DashboardIcon />,
    category: "reports",
    subItems: [
      { label: "Employee Management", link: "/reports/sales" },
      { label: "Sync Employee", link: "/reports/performance" },
      { label: "Group Management", link: "/reports/analytics" },
    ],
  },
  {
    label: "Zone",
    link: "/dashboards/Profile",
    icon: <AccountCircleOutlinedIcon />,
    category: "main",
  },
  {
    label: "SOP",
    link: "/dashboards/Profile",
    icon: <AccountCircleOutlinedIcon />,
    category: "main",
  },
  {
    label: "POS",
    link: "/dashboards/Profile",
    icon: <AccountCircleOutlinedIcon />,
    category: "main",
  },
  {
    label: "Vouchers",
    icon: <AccountCircleOutlinedIcon />,
    category: "management",
    subItems: [
      { label: "Vouchers Management", link: "/management/users" },
      { label: "My Vouchers", link: "/management/teams" },
      { label: "Valiram Vouchers", link: "/management/settings" },
      { label: "Transaction History", link: "/management/settings" },
    ],
  },
  {
    label: "Activities",
    icon: <AccountCircleOutlinedIcon />,
    category: "management",
    subItems: [
      { label: "Task", link: "/management/users" },
      { label: "Survey", link: "/management/teams" },
      { label: "Challenges", link: "/management/settings" },
      { label: "Tutorial", link: "/management/settings" },
    ],
  },
  {
    label: "Settings",
    icon: <AccountCircleOutlinedIcon />,
    category: "management",
    subItems: [
      { label: "Dictionary", link: "/settings/dictionary" },
      { label: "Store Directory", link: "/management/teams" },
      { label: "Store Users", link: "/management/settings" },
    ],
  },
];

export default function TopMenu() {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Create separate state for each dropdown menu
  const [menuAnchors, setMenuAnchors] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const mainItems = menuItems.filter((item) => item.category === "main");
  const menuWithSubItems = menuItems.filter((item) => item.subItems);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    menuLabel: string
  ) => {
    setMenuAnchors((prev) => ({
      ...prev,
      [menuLabel]: event.currentTarget,
    }));
  };

  const handleMenuClose = (menuLabel: string) => {
    setMenuAnchors((prev) => ({
      ...prev,
      [menuLabel]: null,
    }));
  };

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(
      (item) =>
        item.link === currentPath ||
        item.subItems?.some((subItem) => subItem.link === currentPath)
    );
    return activeItem ? activeItem.label : false;
  };

  const DesktopNavigation = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {mainItems.map((item) => (
        <Button
          key={item.label}
          component={RouterLink as any}
          to={item.link}
          startIcon={item.icon}
          sx={{
            color:
              location.pathname === item.link ? "primary.main" : "text.primary",
            fontWeight: location.pathname === item.link ? 600 : 400,
            minWidth: "auto",
            px: 2,
            py: 1,
            borderRadius: 2,
          }}
        >
          {item.label}
        </Button>
      ))}

      {menuWithSubItems.map((item) => (
        <Box key={item.label} sx={{ display: "inline-flex" }}>
          <Button
            startIcon={item.icon}
            endIcon={<ExpandMoreIcon />}
            onClick={(e) => handleMenuOpen(e, item.label)}
            sx={{
              color: "text.primary",
              fontWeight: 400,
              minWidth: "auto",
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            {item.label}
          </Button>

          <Menu
            anchorEl={menuAnchors[item.label]}
            open={Boolean(menuAnchors[item.label])}
            onClose={() => handleMenuClose(item.label)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {item.subItems?.map((subItem) => (
              <MenuItem
                key={subItem.label}
                component={RouterLink}
                to={subItem.link}
                onClick={() => handleMenuClose(item.label)}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: theme.header.height,
          left: 0,
          right: 0,
          height: 60,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 3 },
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: 100,
        }}
      >
        {!isMobile ? (
          <DesktopNavigation />
        ) : (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1" fontWeight={500}>
              {getActiveTab() || "Menu"}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
