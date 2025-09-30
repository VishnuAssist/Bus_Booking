import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const MonthlyHistory = () => {

    const historyData = [
        { month: "Jan 2024", value: 7800, target: 9000 },
        { month: "Feb 2024", value: 8200, target: 9000 },
        { month: "Mar 2024", value: 8750, target: 9000 },
    ];

    const ProgressBar = ({ value }: { value: number }) => (
        <Box>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height: 8,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        backgroundColor: "#2563eb",
                    },
                }}
            />
        </Box>
    );

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} display="flex" alignItems="center" mb={2}>
                    <CalendarMonthIcon sx={{ mr: 1, color: "#2563eb" }} />
                    Monthly History
                </Typography>
                {historyData.map((item) => {
                    const percentage = (item.value / item.target) * 100;
                    return (
                        <Box key={item.month} mb={3}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={16} fontWeight={600}>{item.month}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <Typography fontWeight={500}>${item.value.toLocaleString()}</Typography>
                                    <Typography color="text.secondary"> / ${item.target.toLocaleString()}</Typography>
                                </Box>
                            </Box>
                            <ProgressBar value={percentage} />
                            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <Typography variant="body2" color="text.secondary">{percentage.toFixed(1)}% of target</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${(item.target - item.value).toLocaleString()} remaining
                                </Typography>
                            </Box>

                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default MonthlyHistory;