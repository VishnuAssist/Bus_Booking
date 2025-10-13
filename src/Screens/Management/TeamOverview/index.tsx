import { Box, Card, CardContent, Typography, Grid, LinearProgress, Avatar, Button, Stack, Chip } from "@mui/material";
import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";

const TeamOverview = () => {



    const performanceData = [
        {
            name: "Sarah Chen",
            level: "Elite",
            status: "Excellent",
            sales: 125000,
            target: 100000,
            streak: 15,
            commission: 12500,
            badges: 8,
            lastSale: "2 hours ago",
        },
        {
            name: "Alex Kim",
            level: "Advanced",
            status: "Good",
            sales: 87000,
            target: 90000,
            streak: 7,
            commission: 8700,
            badges: 5,
            lastSale: "1 day ago",
        },
        {
            name: "Marcus Rodriguez",
            level: "Senior",
            status: "Needs Attention",
            sales: 65000,
            target: 80000,
            streak: 3,
            commission: 6500,
            badges: 6,
            lastSale: "3 days ago",
        },
        {
            name: "Emily Johnson",
            level: "Standard",
            status: "Critical",
            sales: 35000,
            target: 70000,
            streak: 0,
            commission: 3500,
            badges: 2,
            lastSale: "1 week ago",
        },
    ];

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Team Overview" />

                <Box p={3} sx={{ backgroundColor: "#f9fafc", minHeight: "100vh" }}>
                    {/* Top Summary Cards */}
                    <Grid container spacing={2} mb={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Card sx={{ background: "#E9F9EE" }}>
                                <CardContent>
                                    <Typography variant="subtitle2">Store Sales</Typography>
                                    <Typography variant="h5" fontWeight={600}>
                                        $487K
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={89}
                                        sx={{ mt: 1, height: 8, borderRadius: 2 }}
                                    />
                                    <Typography variant="body2" mt={1}>
                                        89% Target Achieved
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Card>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="subtitle2">Avg Performance</Typography>
                                        <Typography variant="caption">8 Active</Typography>
                                    </Stack>
                                    <Typography variant="h5" fontWeight={600}>
                                        88.5%
                                    </Typography>
                                    <Typography color="success.main" fontSize={13}>
                                        +5.2% this week
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Card sx={{ background: "#FFF8E7" }}>
                                <CardContent>
                                    <Typography variant="subtitle2">Top Performer</Typography>
                                    <Typography variant="h6">Sarah Chen</Typography>
                                    <Chip label="Elite Tier" size="small" sx={{ mt: 1 }} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Card sx={{ background: "#FEECEC" }}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="error">
                                        Need Coaching
                                    </Typography>
                                    <Typography variant="h4" color="error">
                                        2
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    >
                                        Review Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" mb={1}>
                        Team Performance Overview
                    </Typography>
                    <Grid container spacing={2}>
                        {performanceData.map((member, index) => {
                            const percent = Math.round((member.sales / member.target) * 100);
                            return (
                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar src="" />
                                                <Box>
                                                    <Typography fontWeight={600}>{member.name}</Typography>
                                                    <Stack direction="row" spacing={1}>
                                                        <Chip label={member.level} size="small" />
                                                        <Typography variant="caption">
                                                            {member.status}
                                                        </Typography>
                                                    </Stack>
                                                </Box>
                                                <Box ml="auto" width={60}>

                                                </Box>
                                            </Stack>
                                            <Box mt={2}>
                                                <Typography fontSize={13}>
                                                    Sales Progress (${member.sales.toLocaleString()} / $
                                                    {member.target.toLocaleString()})
                                                </Typography>
                                                <LinearProgress
                                                    value={percent}
                                                    variant="determinate"
                                                    sx={{ mt: 1, height: 8, borderRadius: 2 }}
                                                />
                                            </Box>
                                            <Stack direction="row" spacing={2} mt={1}>
                                                <Typography fontSize={12}>{member.streak} Day Streak</Typography>
                                                <Typography fontSize={12}>
                                                    ${member.commission} Commission
                                                </Typography>
                                                <Typography fontSize={12}>{member.badges} Badges</Typography>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary">
                                                Last sale: {member.lastSale}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
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
                </Box>
            </CommisionContainer>
        </>
    )
};
export default TeamOverview;