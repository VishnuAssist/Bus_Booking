import {
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import AddIcon from "@mui/icons-material/Add";
// import { hasPermission } from "../../../lib/auth";
// import { Pages } from "../../../models/User";
import PageTitleWrapper from "./PageTitleWrapper";
import type { Pages } from "../model/pagesModel";
interface PageHeaderProps {
  title: Pages | string;
  subtitle?: string;
  Page?: Pages;
  icon?: ReactNode;
  btntitle?: string;
  toggle?: { name: string; action?: () => void }[];
  isToggleOnlyForMobile?: boolean;
  onActionClick?: () => void;
  toggleaction?: (e: string) => void;
  renderCustomBUtton?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  subtitle,
  title,
  Page,
  icon,
  btntitle,
  onActionClick,
  toggle = [],
  toggleaction,
  isToggleOnlyForMobile,
  renderCustomBUtton,
}) => {
  const [toggle_, settoggle] = useState<any>(title);

  console.log("Page", Page);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid size={{ xs: 6, lg: "auto" }} pt={2}>
            {isToggleOnlyForMobile &&
            isMobile &&
            toggle.length > 0 &&
            toggleaction ? (
              <Tabs
                sx={{ width: "100%" }}
                value={toggle_}
                onChange={(_event, newValue) => {
                  toggleaction(newValue);
                  settoggle(newValue);
                }}
                variant="scrollable"
                scrollButtons="auto"
              >
                {toggle?.map((d) => (
                  <Tab
                    key={d.name}
                    label={d.name}
                    value={d.name}
                    sx={{ width: "50%" }}
                  />
                ))}
              </Tabs>
            ) : (
              <Box>
                <Typography variant="h3" component="h3" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h6" component="h6" gutterBottom>
                  {subtitle}
                </Typography>
              </Box>
            )}
          </Grid>
          {renderCustomBUtton
            ? renderCustomBUtton
            : onActionClick && (
                <Grid size={{ xs: "auto", lg: "auto" }}>
                  <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    startIcon={icon ? icon : <AddIcon />}
                    onClick={onActionClick}
                  >
                    {isMobile ? "Add" : btntitle ?? `Add ${title}`}
                  </Button>
                </Grid>
              )}
        </Grid>
      </PageTitleWrapper>
    </>
  );
};

export default PageHeader;
