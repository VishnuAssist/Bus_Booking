import { Container, Grid } from "@mui/material";
import { Helmet } from "@dr.pogodin/react-helmet";
import DashCards from "./Cards";


const Dashboard = () => {

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container>
        <Grid container spacing={2}>
          <Grid size={12}>
            <DashCards />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Dashboard;