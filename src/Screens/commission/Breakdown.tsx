import { Box, Card, CardContent, Chip, Divider, LinearProgress, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Breakdown = () => {

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
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={600} display="flex" alignItems="center">
                        <MonetizationOnIcon sx={{ mr: 1, color: "#2563eb" }} />
                        Commission Breakdown
                    </Typography>
                    <Chip label="SG" size="small" />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        mb: 2,
                    }}
                >
                    <Typography fontSize={16} fontWeight={600}>
                        $ Total Commission
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="success.main">
                        $8,750
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={14} fontWeight={600}>
                        Base Amount
                    </Typography>
                    <Typography fontWeight={600} mb={2}>
                        $45,000
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight={600}>Base Commission</Typography>
                        <Typography color="text.secondary">$5,200 (59.4%)</Typography>
                    </Box>
                    <ProgressBar value={59.4} />
                </Box>
                <Box mb={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight={600}>Performance Bonus</Typography>
                        <Typography color="text.secondary">$2,100 (24%)</Typography>
                    </Box>
                    <ProgressBar value={24} />
                </Box>
                <Box mb={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight={600}>Tier Multiplier</Typography>
                        <Typography color="text.secondary">$1,450 (16.6%)</Typography>
                    </Box>
                    <ProgressBar value={16.6} />
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Typography fontSize={14} fontWeight={600}>Effective Rate</Typography>
                    <Typography fontWeight={600}>19.4%</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
export default Breakdown;