import { Box, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";

const TeamInsights = () => {

    const team = [
        { label: "Team Morale", value: 85 },
        { label: "Training Progress", value: 75 },
        { label: "Goal Achievement", value: 88.5 },
        { label: "Attendance Rate", value: 96 },
    ];

    return (
        <>
            <Card sx={{ height: "100%" }}>
                <CardContent>
                    <Box>
                        <Typography variant="h6">Team Insights</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {team.map((item, i) => (
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
                </CardContent>
            </Card>
        </>
    )
};

export default TeamInsights;