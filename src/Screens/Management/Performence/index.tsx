import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import Footer from "../../../Component/Footer";

const Performance = () => {
  const revenueChart: { series: any[]; options: ApexOptions } = {
    series: [
      {
        name: "Revenue",
        data: [180000, 190000, 230000, 240000, 270000, 260000],
      },
      {
        name: "Commission",
        data: [160000, 170000, 200000, 210000, 230000, 240000],
      },
    ],
    options: {
      chart: { type: "line", toolbar: { show: false } },
      stroke: { width: [3, 3], dashArray: [0, 5], curve: "smooth" },
      colors: ["#1976d2", "#9e9e9e"],
      dataLabels: { enabled: false },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      yaxis: { labels: { formatter: (val) => `${val / 1000}k` } },
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
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", borderRadius: 4 },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "Sarah Chen",
          "Alex Kim",
          "Emily Johnson",
          "Marcus Rodriguez",
          "Lisa Wang",
          "David Park",
        ],
      },
      yaxis: { labels: { formatter: (val) => `${val / 1000}k` } },
      grid: { strokeDashArray: 3 },
      legend: { position: "top" },
    },
  };

  const commissionChart: { series: number[]; options: ApexOptions } = {
    series: [48, 28, 15, 8],
    options: {
      chart: { type: "pie" },
      labels: [
        "Base Commission",
        "Performance Bonus",
        "Team Bonus",
        "Special Incentives",
      ],
      colors: ["#1976d2", "#000000", "#444444", "#00c853"],
      legend: { position: "bottom" },
      dataLabels: { enabled: true },
    },
  };

  const insights = [
    { label: "Team Morale", value: 85, color: "#1976d2", display: "4.2/5" },
    { label: "Training Progress", value: 75, color: "#1976d2", display: "75%" },
    {
      label: "Goal Achievement",
      value: 88.5,
      color: "#1976d2",
      display: "88.5%",
    },
    { label: "Attendance Rate", value: 96, color: "#1976d2", display: "96%" },
  ];

  return (
    <>
      <CommisionContainer>
        <PageHeader title="Performence" />
        <Grid container spacing={2}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Team Insights
                </Typography>
                {insights.map((insight, index) => (
                  <Box key={index} mb={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.5}
                    >
                      <Typography variant="body2">{insight.label}</Typography>
                      <Typography variant="body2" color={insight.color}>
                        {insight.display}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={insight.value}
                      sx={{
                        height: 6,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: insight.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CommisionContainer>
    </>
  );
};
export default Performance;
