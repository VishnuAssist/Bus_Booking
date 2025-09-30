import { Box, Button, Card, Chip, CircularProgress, Grid, LinearProgress, Stack, styled, Typography } from "@mui/material";
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";



const DashCards = () => {

    const GreenProgress = styled(LinearProgress)({
        height: 8,
        borderRadius: 6,
        background: "#2e3b55",
        "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg,#42ea65,#8df2bb 110%)",
            borderRadius: 6,
        },
    });

    const BlueProgress = styled(LinearProgress)({
        height: 8,
        borderRadius: 6,
        background: "#283556",
        "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg,#4789ff,#b2aaff 130%)",
            borderRadius: 6,
        },
    });

    const YellowProgress = styled(LinearProgress)({
        height: 8,
        borderRadius: 6,
        background: "#3b3730",
        "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg,#ffd760,#ffb76b 120%)",
            borderRadius: 6,
        },
    });

    function CircleProgress({ value, color, size }: { value: number, color: string, size: number }) {
        return (
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        color: color,
                        borderRadius: "50%",
                    }}
                    thickness={5}
                    size={size}
                />
                <Box
                    sx={{
                        top: 3,
                        left: 2,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="primary"
                        fontWeight={600}
                    >{`${Math.round(value)}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 1 }}>
                {/* Top Cards */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Monthly Sales */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <TrendingUpRoundedIcon sx={{ color: "#22ff88" }} />
                                    <Typography color="#22ff88" fontSize={18} fontWeight={600}>
                                        Monthly Sales
                                    </Typography>
                                </Box>
                                <CircleProgress value={84} color="#4fffba" size={45} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: "#66e098",
                                    mt: 1,
                                    mb: 0.5,
                                    fontFeatureSettings: "'ss01'",
                                }}
                            >
                                $1,25,420
                            </Typography>
                            <Typography color="#7bbfd6" sx={{ fontSize: 15 }}>
                                Target: $1,50,000
                            </Typography>
                            <BlueProgress variant="determinate" value={84} sx={{ mb: 2, mt: 1 }} />
                            <Chip
                                icon={<CheckCircleRoundedIcon />}
                                label="Almost to Elite tier!"
                                size="small"
                                color="primary"
                            />
                        </Card>
                    </Grid>

                    {/* Current Tier */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <StarBorderIcon sx={{ color: "#9eafff" }} />
                                    <Typography color="#9eafff" fontSize={18} fontWeight={600}>
                                        Current Tier
                                    </Typography>
                                </Box>
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Elite"
                                    sx={{ color: "#6e93ff", borderColor: "#4966f5", fontWeight: 600 }}
                                    icon={<EmojiEventsOutlinedIcon sx={{ color: "#42a5f5" }} />}
                                />
                            </Box>
                            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "#9eafff" }}>
                                3 more sales needed
                            </Typography>
                            <BlueProgress variant="determinate" value={85} sx={{ my: 2.5 }} />
                            <Chip
                                label="3 more sales to Elite"
                                size="small"
                                color="primary"
                            />
                        </Card>
                    </Grid>

                    {/* Daily Streak */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }} >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <LocalFireDepartmentIcon sx={{ color: "#ffc466" }} />
                                    <Typography color="#fae564" fontSize={18} fontWeight={600}>
                                        Daily Streak
                                    </Typography>
                                </Box>
                                <CircleProgress value={43} color="#ffb971" size={45} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: "#ffe066",
                                    mt: 1,
                                    mb: 0.5,
                                    fontFeatureSettings: "'ss01'",
                                }}
                            >
                                12 days
                            </Typography>
                            <Typography color="#f4e0a2" sx={{ fontSize: 15 }}>
                                Best: 28 days
                            </Typography>
                            <YellowProgress variant="determinate" value={43} sx={{ mb: 2, mt: 1 }} />
                            <Chip
                                icon={<LocalFireDepartmentIcon sx={{ color: "#ffc466" }} />}
                                label="Getting hot!"
                                color="primary"
                                size="small"
                            />
                        </Card>
                    </Grid>

                    {/* Achievement Score */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card sx={{ height: "100%", p: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <CheckCircleRoundedIcon sx={{ color: "#90fca6" }} />
                                    <Typography color="#90fca6" fontWeight={600}>
                                        Achievement Score
                                    </Typography>
                                </Box>
                                <CircleProgress value={68} color="#85e499" size={45} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: "#c5ef91",
                                    mt: 2,
                                    mb: 1,
                                    fontFeatureSettings: "'ss01'",
                                }}
                            >
                                2450
                                <span
                                    style={{
                                        fontSize: 15,
                                        color: "#9cf87d",
                                        fontWeight: 700,
                                        marginLeft: 8,
                                    }}
                                >
                                    Level 7
                                </span>
                            </Typography>
                            <GreenProgress
                                variant="determinate"
                                value={68}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <Chip
                                label="550 XP to level up"
                                color="primary"
                                size="small"
                            />
                        </Card>
                    </Grid>
                </Grid>

                {/* center Cards */}
                <Grid container spacing={2}>
                    {/* Tier, Commission, Sales, Streak (main card) */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Card sx={{ p: 1, height: "100%", px: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Current Tier</Typography>
                                    <Chip
                                        label="Tier 3 - Senior"
                                        size="small"
                                        sx={{
                                            background: "linear-gradient(90deg,#6e7dd3 60%,#b9bcff 100%)",
                                            color: "#fff",
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>
                                <CircleProgress value={82} color="#85b9ff" size={60} />
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 32,
                                    mt: 1,
                                    fontFeatureSettings: "'ss01'",
                                }}
                            >
                                $8,750
                            </Typography>
                            <Typography color="#b8c9e0" sx={{ fontSize: 15 }}>
                                This month's commission
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 8, mt: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <CrisisAlertRoundedIcon sx={{ color: "blue", fontSize: 25 }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>3 More Sales</Typography>
                                        <Typography variant="caption">to Tire 4 - Elite</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <CalendarTodayOutlinedIcon sx={{ color: "#ffc466", fontSize: 25 }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>12 days left</Typography>
                                        <Typography variant="caption">this month</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 1,
                                    background: "#cfcfef1a",
                                    borderRadius: 2,
                                    display: "inline-block",
                                }}
                            >
                                <Typography color="#58d57c" fontWeight={600}>
                                    $3,250 to unlock Tier 4 - Elite
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* XP Streak */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card
                            sx={{
                                height: "100%",
                                p: 1,
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <LocalFireDepartmentIcon sx={{ fontSize: 35, color: "#ffc54d" }} />
                                    <Box>
                                        <Typography fontSize={18} fontWeight={600} color="#ffcf9d">
                                            12 days
                                        </Typography>
                                        <Typography sx={{ color: "#bbcbdb" }}>
                                            Current streak
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ color: "#69aafb", fontWeight: 500 }}>
                                    Best: 28 days
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                <CalendarTodayOutlinedIcon />
                                <Typography fontSize={16}>This Week</Typography>
                            </Box>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                    <Box
                                        key={d}
                                        sx={{
                                            width: 30,
                                            height: 32,
                                            borderRadius: 6,
                                            bgcolor: i < 3 ? "#3570fa" : "#222b3c",
                                            color: "#e1fdff",
                                            fontWeight: 700,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 17,
                                        }}
                                    >
                                        {d}
                                    </Box>
                                ))}
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bottom Cards */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* Power Hour Challenge */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                p: 1,
                                height: "100%",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <CallMadeOutlinedIcon sx={{ color: "#8cf7ff" }} />
                                <Typography fontWeight={600} color="#60d2ec">
                                    Power Hour Challenge
                                </Typography>
                                <Chip
                                    label="Daily"
                                    size="small"
                                    color="primary"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                                <Box>
                                    <Typography variant="caption">Complete 5 sales calls before 2 PM today</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Typography fontWeight={600} color="#a6f9b7">
                                            +150 XP
                                        </Typography>
                                        <Typography color="#bdbbdf">
                                            3/5 completed
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            bgcolor: "linear-gradient(93deg,#4789ff 55%,#b093fb 100%)",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Box>
                            <BlueProgress variant="determinate" value={60} sx={{ mt: 2 }} />
                        </Card>
                    </Grid>
                    {/* Weekend Bonus */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                p: 1,
                                height: "100%",
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmojiEventsOutlinedIcon sx={{ color: "#ffe066", fontSize: 35 }} />
                                    <Box>
                                        <Typography fontWeight={600} color="#ffe497">
                                            Weekend Bonus
                                        </Typography>
                                        <Typography color="#d5c9b1">
                                            Double XP active!
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label="2x XP"
                                    sx={{
                                        bgcolor: "#fff5d6",
                                        color: "#d2aa48",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        ml: 2,
                                    }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default DashCards;