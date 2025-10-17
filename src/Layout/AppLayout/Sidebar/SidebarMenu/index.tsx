import { Fragment, useContext, useMemo } from "react";
import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Tooltip,
  tooltipClasses,
  type TooltipProps,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SellIcon from "@mui/icons-material/Sell";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

import { SidebarContext } from "../../../../Context/SidebarContext";
import { CalendarIcon, DashboardIcon } from "../../../../Assests/Icons/icons";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};
    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }
  .MuiListSubheader-root {
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.typography.pxToRem(12)};
    color: ${theme.colors.alpha.trueWhite[50]};
    padding: ${theme.spacing(0, 2.5)};
    line-height: 1.2;
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    .MuiListItem-root {
      padding: 1px 0;
      .MuiBadge-root {
        position: absolute;
        right: ${theme.spacing(3.2)};
        .MuiBadge-standard {
          background: ${theme.colors.primary.main};
          font-size: ${theme.typography.pxToRem(10)};
          font-weight: bold;
          text-transform: uppercase;
          color: ${theme.palette.primary.contrastText};
        }
      }
      .MuiButton-root {
        display: flex;
        color: ${theme.colors.alpha.trueWhite[70]};
        background-color: transparent;
        width: 100%;
        justify-content: flex-start;
        padding: ${theme.spacing(1.2, 3)};
        .MuiButton-startIcon {
          color: ${theme.colors.alpha.trueWhite[30]};
          font-size: ${theme.typography.pxToRem(20)};
          margin-right: ${theme.spacing(1)};
        }
        .MuiButton-endIcon {
          color: ${theme.colors.alpha.trueWhite[50]};
          margin-left: auto;
          opacity: .8;
          font-size: ${theme.typography.pxToRem(20)};
        }
        &.active,
        &:hover {
          background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
          color: ${theme.colors.alpha.trueWhite[100]};
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[100]};
          }
        }
      }
    }
  }
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

function SidebarMenu({
  expanded,
}: // expand,
// mobile,
{
  expanded: boolean;
  expand: () => void;
  mobile: boolean;
}) {
  const { closeSidebar } = useContext(SidebarContext);

  const sidebarItems = useMemo(() => {
    const items = [
      {
        items: [
          {
            label: "Dashboard",
            link: "/dashboards/Dashboard",
            icon: <DashboardIcon />,
            hide: true,
          },
          {
            label: "Commission",
            link: "/dashboards/Commission",
            icon: <DataUsageIcon />,
            hide: true,
          },
          {
            label: "LeaderBoard",
            link: "/dashboards/LeaderBoard",
            icon: <EmojiEventsOutlinedIcon />,
            hide: true,
          },
          {
            label: "Profile",
            link: "/dashboards/Profile",
            icon: <AccountCircleOutlinedIcon />,
            hide: true,
          },
          {
            label: "Calendar",
            link: "/dashboards/Calender",
            icon: <CalendarIcon />,
            hide: true,
          },

          {
            label: "Store",
            link: "/settings/store",
            icon: <StoreIcon />,
            hide: true,
          },
          {
            label: "Sales",
            link: "/settings/sales",
            icon: <SellIcon />,
            hide: true,
          },
        ],
      },
      {
        title: "Staff Portal",
        icon: <GroupIcon />,
        items: [
          {
            label: "Attendence",
            link: "/staff/attendence",
            icon: <AccessTimeIcon />,
            hide: true,
          },
          {
            label: "LeaveRequest",
            link: "/staff/leaveRequest",
            icon: <DescriptionOutlinedIcon />,
            hide: true,
          },
          {
            label: "Achievements",
            link: "/staff/achievements",
            icon: <GradeOutlinedIcon />,
            hide: true,
          },
        ],
      },
      {
        title: "Management",
        icon: <GroupIcon />,
        items: [
          {
            label: "Team Overview",
            link: "/management/teamOverview",
            icon: <AccessTimeIcon />,
            hide: true,
          },
          {
            label: "Shift",
            link: "/Admin/shift",
            icon: <FilterTiltShiftIcon />,
            hide: true,
          },
          {
            label: "Coaching",
            link: "/management/coaching",
            icon: <GradeOutlinedIcon />,
            hide: true,
          },
          {
            label: "Performance",
            link: "/management/performance",
            icon: <GradeOutlinedIcon />,
            hide: true,
          },
        ],
      },
      {
        title: "Admin",
        icon: <AdminPanelSettingsOutlinedIcon />,
        items: [
          {
            label: "System Overview",
            link: "/Admin/systemOverview",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
          {
            label: "Shift",
            link: "/Admin/shift",
            icon: <FilterTiltShiftIcon />,
            hide: true,
          },
          {
            label: "Attendance",
            link: "/Admin/attendance",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
          {
            label: "Achievement",
            link: "/Admin/achievement",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
          {
            label: "RuleEngine",
            link: "/Admin/ruleEngine",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
          {
            label: "RuleList",
            link: "/Admin/rulesList",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
          {
            label: "Report&Analytics",
            link: "/Admin/reportandAnalytics",
            icon: <AdminPanelSettingsIcon />,
            hide: true,
          },
        ],
      },
      {
        title: "Dictionary",
        icon: <MenuBookIcon />,
        items: [
          {
            label: "Dictionary",
            link: "/settings/Dictionary",
            icon: <MenuBookIcon />,
            hide: true,
          },
        ],
      },
    ];

    return items
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.hide),
      }))
      .filter((group) => group.items.length > 0);
  }, [Permissions]);

  const renderMenuItems = (
    items: { icon: any; label: string; link: string }[]
  ) =>
    items.map((item, index) => (
      <ListItem key={index} component="div">
        {!expanded ? (
          <TooltipWrapper title={item.label} arrow>
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to={item.link}
              startIcon={item.icon}
            />
          </TooltipWrapper>
        ) : (
          <Button
            disableRipple
            component={RouterLink}
            onClick={closeSidebar}
            to={item.link}
            startIcon={item.icon}
          >
            {item.label}
          </Button>
        )}
      </ListItem>
    ));

  return (
    <MenuWrapper>
      {/* <List component="div">
        {!mobile && (
          <ListItem component="div">
            
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
           
              <Button
                disableRipple
                component="a"
                onClick={expand}
                sx={{
                  minWidth: "auto",
                  padding: 0,
                }}
              >
                {expanded ? (
                  <ChevronLeft sx={{ color: "white" }} />
                ) : (
                  <ChevronRight sx={{ color: "white" }} />
                )}
              </Button>
            </Box>
          </ListItem>
        )}
      </List> */}

      {expanded ? (
        sidebarItems.map((group, index) => (
          <List
            key={index}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {group.title}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">{renderMenuItems(group.items)}</List>
            </SubMenuWrapper>
          </List>
        ))
      ) : (
        <Fragment>
          <SubMenuWrapper>
            <List component="div">
              {sidebarItems
                .flatMap((group) => group.items)
                .map((item, index) => (
                  <ListItem key={index} component="div">
                    <TooltipWrapper title={item.label} arrow>
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to={item.link}
                        startIcon={item.icon}
                      />
                    </TooltipWrapper>
                  </ListItem>
                ))}
            </List>
          </SubMenuWrapper>
        </Fragment>
      )}
    </MenuWrapper>
  );
}

export default SidebarMenu;
