import { useState } from "react";
import {
  Button,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface AnchorPosition {
  top: number;
  left: number;
}

const menuItems = [
  {
    label: "Dashboard",
    link: "/dashboards/Dashboard",
    icon: <DashboardIcon />,
    category: "main",
  },
  {
    label: "Bus & Operators",
    icon: <DashboardIcon />,
    category: "main",
    subItems: [
      { label: "Bus Management", link: "/dashboards/operatormanagemet" },
      { label: "Operator Management", link: "/dashboards/operatormanagemet" },
    ],
  },
  {
    label: "Booking Management",
    link: "/reports/operatormanagemet",
    icon: <EmojiEventsOutlinedIcon />,
    category: "main",
  },
  {
    label: "Schedule Management",
    link: "/dashboards/operatormanagemet",
    icon: <EmojiEventsOutlinedIcon />,
    category: "main",
  },
  {
    label: "Payment & Finance",
    link: "/dashboards/operatormanagemet",
    icon: <EmojiEventsOutlinedIcon />,
    category: "main",
  },
  {
    label: "Reports & Analytics",
    link: "/dashboards/operatormanagemet",
    icon: <EmojiEventsOutlinedIcon />,
    category: "reports",
  },
];

export default function TopMenu() {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ use correct type for menu anchors
  const [menuAnchors, setMenuAnchors] = useState<{
    [key: string]: AnchorPosition | null;
  }>({});

  const mainItems = menuItems.filter(
    (item) => item.category === "main" && !item.subItems
  );
  const menuWithSubItems = menuItems.filter((item) => item.subItems);

  // ✅ safer handleMenuOpen
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    menuLabel: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuAnchors((prev) => ({
      ...prev,
      [menuLabel]: {
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2,
      },
    }));
  };

  const handleMenuClose = (menuLabel: string) => {
    setMenuAnchors((prev) => ({ ...prev, [menuLabel]: null }));
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
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            {item.label}
          </Button>

          <Menu
            anchorReference="anchorPosition"
            anchorPosition={
              menuAnchors[item.label]
                ? {
                    top: menuAnchors[item.label]!.top,
                    left: menuAnchors[item.label]!.left,
                  }
                : undefined
            }
            open={Boolean(menuAnchors[item.label])}
            onClose={() => handleMenuClose(item.label)}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                transform: "translateX(-50%)",
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
    <Box
      sx={{
        position: "fixed",
        top: theme.header?.height || 0,
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
  );
}
