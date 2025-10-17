import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Bolt, CardGiftcard, Leaderboard, MilitaryTech } from "@mui/icons-material";


const QuickAction = () => {
    return (
        <>
            <Box>
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={2}>
                            {[{ icon: <Bolt />, label: "Log Sale" }, { icon: <CardGiftcard />, label: "View Rewards" }, { icon: <Leaderboard />, label: "Leaderboard" }, { icon: <MilitaryTech />, label: "Achievements" }].map((action, i) => (
                                <Grid size={{ xs: 12, md: 3 }} key={i}>
                                    <Button variant="outlined" fullWidth startIcon={action.icon} sx={{ py: 2, borderRadius: 3 }}>
                                        {action.label}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
};
export default QuickAction;