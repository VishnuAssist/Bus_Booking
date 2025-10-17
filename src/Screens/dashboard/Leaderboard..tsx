import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";

const Leaderboard = () => {

    const leaderboard = [
        { name: "Sarah Chen", role: "Elite", score: 12450, change: "+15", medal: "gold" },
        { name: "Marcus Rodriguez", role: "Senior", score: 11280, change: "+8", medal: "silver" },
        { name: "Emily Johnson", role: "Senior", score: 10950, change: "-2", medal: "bronze" },
        { name: "Alex Kim", role: "Advanced", score: 9870, change: "+12" },
        { name: "Lisa Wong", role: "Advanced", score: 9320, change: "+5" },
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Store Leaderboard
                            </Typography>
                            {leaderboard.map((user, index) => (
                                <Box key={index} display="flex" alignItems="center" justifyContent="space-between" p={1} borderRadius={2} sx={{ backgroundColor: index === 3 ? "#f0f6ff" : "transparent" }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography variant="body1" fontWeight="bold">{index + 1}</Typography>
                                        <Avatar src={`https://i.pravatar.cc/40?img=${index + 1}`} />
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">{user.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                                        </Box>
                                    </Box>
                                    <Box textAlign="right">
                                        <Typography variant="body1" fontWeight="bold">{user.score.toLocaleString()}</Typography>
                                        <Typography variant="caption" color={user.change.startsWith("-") ? "error" : "success.main"}>{user.change}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};
export default Leaderboard;