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
    label: "Profile",
    link: "/dashboards/Profile",
    icon: <AccountCircleOutlinedIcon />,
    category: "main",
  },
  //   {
  //     label: "Reports",
  //     icon: <DashboardIcon />,
  //     category: "reports",
  //     subItems: [
  //       { label: "Sales Report", link: "/reports/sales" },
  //       { label: "Performance Report", link: "/reports/performance" },
  //       { label: "Analytics", link: "/reports/analytics" },
  //     ],
  //   },
  //   {
  //     label: "Management",
  //     icon: <AccountCircleOutlinedIcon />,
  //     category: "management",
  //     subItems: [
  //       { label: "User Management", link: "/management/users" },
  //       { label: "Team Management", link: "/management/teams" },
  //       { label: "Settings", link: "/management/settings" },
  //     ],
  //   },
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
          zIndex: 1200,
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
