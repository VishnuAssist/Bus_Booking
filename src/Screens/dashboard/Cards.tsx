import { Box, Button, Card, Chip, CircularProgress, Grid, LinearProgress, Stack, styled, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
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

    const HighlightChip = styled(Chip)(() => ({
        background:
            "linear-gradient(87deg,#4b6fff 50%,#bd7cf6 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
    }));

    function CircleProgress({ value, color }: { value: number, color: string }) {
        return (
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        color: color,
                        background: "#25263a",
                        borderRadius: "50%",
                    }}
                    thickness={5}
                    size={40}
                />
                <Box
                    sx={{
                        top: 8,
                        left: 0,
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
                        color="#eee"
                        fontWeight={600}
                    >{`${Math.round(value)}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(120deg,#111424 60%,#232551 100%)",
                }}
            >
                {/* Top Cards */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Monthly Sales */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card
                            sx={{
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: `0 3px 16px -4px "#22ff88" || "#597bff88"}`,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                                <ArrowForwardIosRoundedIcon sx={{ color: "#5ffdac" }} />
                                <Typography color="#b8ece0" fontWeight={600}>
                                    Monthly Sales
                                </Typography>
                                <CircleProgress value={84} color="#4fffba" />
                            </Stack>
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
                            <HighlightChip icon={<CheckCircleRoundedIcon />} label="Almost to Elite tier!" />
                        </Card>
                    </Grid>

                    {/* Current Tier */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card
                            sx={{
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: `0 3px 16px -4px "#e7f0ebff" || "#597bff88"}`,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                                <StarBorderIcon sx={{ color: "#9eafff" }} />
                                <Typography color="#d9eaff" fontWeight={600}>
                                    Current Tier
                                </Typography>
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Elite"
                                    sx={{ color: "#6e93ff", borderColor: "#4966f5", fontWeight: 600 }}
                                    icon={<EmojiEventsOutlinedIcon sx={{ color: "#42a5f5" }} />}
                                />
                            </Stack>
                            <BlueProgress variant="determinate" value={85} sx={{ my: 1 }} />
                            <Typography variant="body2" color="#bbb">
                                3 more sales needed
                            </Typography>
                            <Button
                                size="small"
                                sx={{
                                    mt: 1,
                                    textTransform: "none",
                                    color: "#88aaff",
                                    px: 1,
                                    fontWeight: 500,
                                }}
                                endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} />}
                            >
                                3 more sales to Elite
                            </Button>
                        </Card>
                    </Grid>

                    {/* Daily Streak */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card
                            sx={{
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: `0 3px 16px -4px "#ee9900b5" || "#597bff88"}`,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                                <LocalFireDepartmentIcon sx={{ color: "#ffc466" }} />
                                <Typography color="#fae564" fontWeight={600}>
                                    Daily Streak
                                </Typography>
                                <CircleProgress value={43} color="#ffb971" />
                            </Stack>
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
                                sx={{
                                    bgcolor: "#ffecb366",
                                    color: "#ffba38",
                                    fontWeight: 600,
                                }}
                                size="small"
                            />
                        </Card>
                    </Grid>

                    {/* Achievement Score */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Card
                            sx={{
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: `0 3px 16px -4px "#6cd77e" || "#597bff88"}`,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                                <CheckCircleRoundedIcon sx={{ color: "#90fca6" }} />
                                <Typography color="#d6ffef" fontWeight={600}>
                                    Achievement Score
                                </Typography>
                                <CircleProgress value={68} color="#85e499" />
                            </Stack>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: "#c5ef91",
                                    mt: 1,
                                    mb: 0.5,
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
                                sx={{ mb: 2, mt: 1 }}
                            />
                            <Chip
                                label="550 XP to level up"
                                sx={{
                                    bgcolor: "#d4fcf3",
                                    color: "#3dbc7a",
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}
                                size="small"
                            />
                        </Card>
                    </Grid>
                </Grid>

                {/* center Cards */}
                <Grid container spacing={2}>
                    {/* Tier, Commission, Sales, Streak (main card) */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card
                            sx={{
                                height: "100%",
                                minHeight: 210,
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: `0 3px 16px -4px "#6e83ff" || "#597bff88"}`,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Chip
                                    label="Tier 3 - Senior"
                                    sx={{
                                        background: "linear-gradient(90deg,#6e7dd3 60%,#b9bcff 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                    }}
                                />
                                <Box flex={1} />
                                <CircleProgress value={82} color="#85b9ff" />
                            </Stack>
                            <Typography
                                sx={{
                                    color: "#bde9f7",
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
                            <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                                <Typography color="#c9deff" sx={{ fontSize: 16 }}>
                                    <span style={{ color: "#5aacff", fontWeight: 700 }}>
                                        3 more sales
                                    </span>{" "}
                                    to Tier 4 - Elite
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CalendarTodayOutlinedIcon sx={{ color: "#bfc8ff", fontSize: 20 }} />
                                    <Typography color="#bfc8ff">12 days left this month</Typography>
                                </Stack>
                            </Stack>
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
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{
                                height: "100%",
                                minHeight: 210,
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <LocalFireDepartmentIcon sx={{ color: "#ffc54d" }} />
                                <Typography fontWeight={600} color="#ffcf9d">
                                    12 days
                                </Typography>
                                <Typography sx={{ color: "#bbcbdb" }}>
                                    Current streak
                                </Typography>
                                <Box flex={1} />
                                <Typography sx={{ color: "#69aafb", fontWeight: 500 }}>
                                    Best: 28 days
                                </Typography>
                            </Stack>
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
                                height: "100%",
                                minHeight: 210,
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: "0 4px 16px #358fff33",
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Stack direction="row" spacing={1.5}>
                                    <CallMadeOutlinedIcon sx={{ color: "#8cf7ff" }} />
                                    <Typography fontWeight={600} color="#60d2ec">
                                        Power Hour Challenge
                                    </Typography>
                                    <Chip
                                        label="Daily"
                                        size="small"
                                        sx={{
                                            bgcolor: "#2f3659",
                                            color: "#b0c5ff",
                                            fontWeight: 600,
                                        }}
                                    />
                                </Stack>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "linear-gradient(93deg,#4789ff 55%,#b093fb 100%)",
                                        borderRadius: 2,
                                        boxShadow: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    View Details
                                </Button>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                                <Typography fontWeight={600} color="#a6f9b7">
                                    +150 XP
                                </Typography>
                                <Typography color="#bdbbdf">
                                    3/5 completed
                                </Typography>
                            </Stack>
                            <BlueProgress variant="determinate" value={60} sx={{ mt: 2 }} />
                        </Card>
                    </Grid>
                    {/* Weekend Bonus */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: "100%",
                                minHeight: 210,
                                background: "rgba(30, 32, 50, 0.85)",
                                backdropFilter: "blur(7px)",
                                borderRadius: 18,
                                boxShadow: "0 4px 24px #ffecb0aa",
                                border: "1px solid rgba(96,116,255,0.21)",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{ height: 54 }}
                            >
                                <EmojiEventsOutlinedIcon sx={{ color: "#ffe066" }} />
                                <Typography fontWeight={600} color="#ffe497">
                                    Weekend Bonus
                                </Typography>
                                <Typography color="#d5c9b1" sx={{ ml: 2 }}>
                                    Double XP active!
                                </Typography>
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
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
};
export default DashCards;