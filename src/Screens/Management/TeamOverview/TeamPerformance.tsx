import { Avatar, Box, Card, CardContent, Chip, Grid, LinearProgress, Stack, Typography } from "@mui/material";

const TeamPerformance = () => {

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
        </>
    )
};

export default TeamPerformance;