import { Grid } from "@mui/material";
import ReportDetails from "./ReportDetails";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/commonPageHeader";

const Index = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Reports"
          subtitle="Manage system configuration and data"
          btntitle="Generate Report"
        />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{ xs: 12 }}>
            <ReportDetails />
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};
export default Index;
