import { Helmet } from "@dr.pogodin/react-helmet";
import { Grid } from "@mui/material";
import PageHeader from "./PageHeader";
import PageFilter from "./PageFilter";
import Cards from "./Cards";
import Structure from "./Structure";
import Breakdown from "./Breakdown";
import MonthlyHistory from "./MonthlyHistory";
import CommisionContainer from "../../Component/container";
import HistoryTabel from "./HistoryTabel";
import Footer from "../../Component/Footer";

const Commission = () => {
    return (
        <>
            <Helmet>
                <title>Commission</title>
            </Helmet>
            <CommisionContainer>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <PageHeader />
                    </Grid>
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
                        <HistoryTabel />
                    </Grid>
                </Grid>
            </CommisionContainer>

            <Footer />
        </>
    )
};
export default Commission;