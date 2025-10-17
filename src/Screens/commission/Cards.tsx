import { Box, Card, Grid, LinearProgress, styled, Typography } from "@mui/material";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';



const Cards = () => {

    const BlueProgress = styled(LinearProgress)({
        height: 8,
        borderRadius: 6,
        background: "#283556",
        "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg,#4789ff,#b2aaff 130%)",
            borderRadius: 6,
        },
    });

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Current Commission</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <TrendingUpRoundedIcon sx={{ color: "#22ff88" }} />
                                    <Typography color="#22ff88">+15.2%</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography fontSize={20} fontWeight={600} color="#22ff88">$ 8,750</Typography>
                                <Typography variant="caption">+15.2% from last month</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                                <Typography>Progress</Typography>
                                <Typography>73%</Typography>
                            </Box>
                            <BlueProgress variant="determinate" value={73} sx={{ mb: 2, mt: 1 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                                <Typography>Current: 8,750</Typography>
                                <Typography>Target: 12,000</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Base Earnings</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <TrendingUpRoundedIcon sx={{ color: "#22ff88" }} />
                                    <Typography color="#22ff88">+8.1%</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography fontSize={20} fontWeight={600} color="primary">$ 5,200</Typography>
                                <Typography variant="caption">+8.1% from last month</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Bonus Earned</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <TrendingUpRoundedIcon sx={{ color: "#22ff88" }} />
                                    <Typography color="#22ff88">+25%</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography fontSize={20} fontWeight={600} color="#22ff88">$ 2,100</Typography>
                                <Typography variant="caption">+25% from last month</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Effective Rate</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <TrendingUpRoundedIcon sx={{ color: "#22ff88" }} />
                                    <Typography color="#22ff88">+3.2%</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography fontSize={20} fontWeight={600} color="#f7d709ff">19.4%</Typography>
                                <Typography variant="caption">+3.2% from last month</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};
export default Cards;