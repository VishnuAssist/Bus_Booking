import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/material";
import type { FC, ReactNode } from "react";

interface TabItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface TabLayoutProps {
  tabs: TabItem[];
  children?: ReactNode;
}

const TabLayout: FC<TabLayoutProps> = ({ tabs, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  return (
    <>
      <ButtonGroup
        variant="text"
        sx={{
          display: "flex",
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 0,
          mx: 3,
          mt: 3,
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            currentPath === tab.path || currentPath.startsWith(tab.path);

          return (
            <Button
              key={tab.path}
              sx={{
                mt: { xs: 2, md: 0 },
                fontWeight: isActive ? 600 : 400,
                bgcolor: isActive ? "primary.light" : "",
                // display: "flex",
                // flexGrow: 1,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              variant="contained"
              startIcon={tab.icon ? tab.icon : null}
              size="small"
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </Button>
          );
        })}
      </ButtonGroup>
      <Box>{children || <Outlet />}</Box>
    </>
  );
};

export default TabLayout;
