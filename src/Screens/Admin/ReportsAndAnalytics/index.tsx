import { Box, Grid, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";

const ReportAndAnalytics = () => {

    const revenueChart: { series: any[]; options: ApexOptions } = {
        series: [
            { name: "Revenue", data: [180000, 190000, 230000, 240000, 270000, 260000] },
            { name: "Commission", data: [160000, 170000, 200000, 210000, 230000, 240000] },
        ],
        options: {
            chart: { type: "line", toolbar: { show: false } },
            stroke: { width: [3, 3], dashArray: [0, 5] },
            colors: ["#1976d2", "#9e9e9e"],
            dataLabels: { enabled: false },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
            yaxis: { labels: { formatter: (val) => `${val / 1000}k` } },
            legend: { position: "top" },
            grid: { strokeDashArray: 3 },
        },
    };

    const systemChart: { series: any[]; options: ApexOptions } = {
        series: [
            { name: "CPU", data: [20, 40, 80, 120, 200, 140] },
            { name: "Memory", data: [10, 20, 60, 90, 130, 100] },
            { name: "Network", data: [5, 15, 35, 60, 90, 40] },
        ],
        options: {
            chart: { type: "area", toolbar: { show: false } },
            colors: ["#1976d2", "#444", "#999"],
            dataLabels: { enabled: false },
            stroke: { curve: "smooth" },
            xaxis: { categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"] },
            fill: { opacity: 0.7 },
            legend: { position: "top" },
            grid: { strokeDashArray: 3 },
        },
    };

    const performanceChart: { series: any[]; options: ApexOptions } = {
        series: [
            { name: "Target", data: [40000, 35000, 37000, 34000, 39000, 32000] },
            { name: "Achieved", data: [45000, 38000, 42000, 36000, 47000, 35000] },
            { name: "Bonus", data: [8000, 5000, 6000, 4000, 7500, 4000] },
        ],
        options: {
            chart: { type: "bar", toolbar: { show: false } },
            colors: ["#e0e0e0", "#1976d2", "#000000"],
            dataLabels: { enabled: false },
            plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
            xaxis: {
                categories: [
                    "Sarah Chen",
                    "Alex Kim",
                    "Emily Johnson",
                    "Marcus Rodriguez",
                    "Lisa Wang",
                    "David Park",
                ],
                labels: { rotate: -45 },
            },
            yaxis: { labels: { formatter: (val) => `${val / 1000}k` } },
            legend: { position: "top" },
            grid: { strokeDashArray: 3 },
        },
    };

    const commissionChart: { series: number[]; options: ApexOptions } = {
        series: [48, 28, 15, 8],
        options: {
            chart: { type: "pie" },
            labels: ["Base Commission", "Performance Bonus", "Team Bonus", "Special Incentives"],
            colors: ["#1976d2", "#000000", "#444444", "#00c853"],
            legend: { position: "bottom" },
            dataLabels: { enabled: true },
        },
    };

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Report & Analytics" />

                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                                        Report Generation
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="outlined"
                                            //startIcon={<FileText size={18} />}
                                            fullWidth
                                        >
                                            Commission Report
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            //startIcon={<Activity size={18} />}
                                            fullWidth
                                        >
                                            Performance Report
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            //startIcon={<Cpu size={18} />}
                                            fullWidth
                                        >
                                            System Report
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Revenue & Commission Trends
                                    </Typography>
                                    <ReactApexChart
                                        options={revenueChart.options}
                                        series={revenueChart.series}
                                        type="line"
                                        height={260}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        System Performance Metrics
                                    </Typography>
                                    <ReactApexChart
                                        options={systemChart.options}
                                        series={systemChart.series}
                                        type="area"
                                        height={260}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Team Performance vs Target
                                    </Typography>
                                    <ReactApexChart
                                        options={performanceChart.options}
                                        series={performanceChart.series}
                                        type="bar"
                                        height={260}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Commission Breakdown
                                    </Typography>
                                    <ReactApexChart
                                        options={commissionChart.options}
                                        series={commissionChart.series}
                                        type="pie"
                                        height={260}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </CommisionContainer>
        </>
    );
};
export default ReportAndAnalytics;
