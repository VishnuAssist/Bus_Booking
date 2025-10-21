import { Grid } from "@mui/material";
import PageFilter from "./PageFilter";
import Cards from "./Cards";
import Structure from "./Structure";
import Breakdown from "./Breakdown";
import MonthlyHistory from "./MonthlyHistory";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import PageHeader from "../../Component/commonPageHeader";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useAllCommisionDataQuery } from "../../Api/rolesApi";
import StaffCommissionTabel from "./StaffCommissionTabel";

const Commission = () => {
  const { data } = useAllCommisionDataQuery({});

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Commission"
          subtitle="Track your earnings and performance"
          btntitle="Recalculate"
          icon={<CalculateIcon />}
        />
        <Grid container spacing={2}>
          <Grid size={12}>
            <PageFilter />
          </Grid>
          <Grid size={12}>
            <Cards />
          </Grid>
          <Grid size={6}>
            <Breakdown />
          </Grid>
          <Grid size={6}>
            <MonthlyHistory />
          </Grid>
          <Grid size={12}>
            <Structure />
          </Grid>
          <Grid size={12}>
            <StaffCommissionTabel />
          </Grid>
        </Grid>
      </CommisionContainer>

      <Footer />
    </>
  );
};
export default Commission;
