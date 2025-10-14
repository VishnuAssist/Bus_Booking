import { Box, Typography, Grid, LinearProgress, Button, Stack, } from "@mui/material";
import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import HeaderCard from "./HeaderCard";
import TeamPerformance from "./TeamPerformance";

const TeamOverview = () => {





    return (
        <>
            <CommisionContainer>
                <PageHeader title="Team Overview" />

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <HeaderCard />
                    </Grid>
                    <Grid size={12}>
                        <TeamPerformance />
                    </Grid>
                </Grid>



                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" color="primary">
                        Start Coaching Session
                    </Button>
                    <Button variant="outlined">Schedule Team Meeting</Button>
                    <Button variant="outlined">Generate Report</Button>
                </Stack>

                <Box mt={4}>
                    <Typography variant="h6" mb={1}>
                        Team Insights
                    </Typography>
                    {[
                        { label: "Team Morale", value: 85 },
                        { label: "Training Progress", value: 75 },
                        { label: "Goal Achievement", value: 88.5 },
                        { label: "Attendance Rate", value: 96 },
                    ].map((item, i) => (
                        <Box key={i} mb={2}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography fontSize={14}>{item.label}</Typography>
                                <Typography fontSize={14}>{item.value}%</Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{ mt: 0.5, height: 8, borderRadius: 2 }}
                            />
                        </Box>
                    ))}
                </Box>

            </CommisionContainer>
        </>
    )
};
export default TeamOverview;