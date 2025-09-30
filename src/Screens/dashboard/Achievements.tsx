import { Box, Grid, Card, CardContent, Typography, } from "@mui/material";


const Achievement = () => {

    const achievements = [
        { title: "Closer", desc: "10 deals closed", active: true },
        { title: "Streak Master", desc: "7 day streak", active: true },
        { title: "Top Performer", desc: "Monthly leader", active: false },
        { title: "Early Bird", desc: "First sale of day", active: true },
        { title: "Lightning", desc: "Quick response", active: false },
        { title: "Champion", desc: "Quarter winner", active: false },
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6">Achievements</Typography>
                                <Typography variant="body2" color="text.secondary">3/6</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                {achievements.map((ach, i) => (
                                    <Grid size={{ xs: 4 }} key={i}>
                                        <Card sx={{ textAlign: "center", border: ach.active ? "2px solid #2196f3" : "1px dashed #ccc", borderRadius: 3, py: 2 }}>
                                            <Typography variant="h6">{ach.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">{ach.desc}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Achievement;