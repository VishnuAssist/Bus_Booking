import { Box, Card, Grid, LinearProgress, Typography } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const PerformanceCard = ({ icon, value, label, footer, progress }) => {
  return (
    <Card sx={{ p: 1, height: '100%' }}>
      <Grid container spacing={2}>
        {/* Icon */}
        <Grid size={{xs:3}}>
          {icon}
        </Grid>
        {/* Main text */}
        <Grid size={{xs:9}}>
          <Typography variant="h6">{value}</Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Grid>
        {/* Footer */}
        <Grid size={{xs:12}}>
          {progress !== undefined ? (
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" color={footer.color || "text.secondary"}>
              {footer.text}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

const Performance = () => {
  const performanceData = [
    {
      icon: <TrackChangesIcon fontSize="large" color="primary" />,
      value: "$810",
      label: "Monthly Commission",
      progress: 65
    },
    {
      icon: <TrendingUpIcon fontSize="large" color="success" />,
      value: "123",
      label: "Sales This Month",
      footer: { text: "+12% from last month", color: "success.main" }
    },
    {
      icon: <StarBorderIcon fontSize="large" color="warning" />,
      value: "24.5%",
      label: "Conversion Rate",
      footer: { text: "Above average", color: "text.secondary" }
    },
    {
      icon: <MilitaryTechIcon fontSize="large" color="secondary" />,
      value: "#3",
      label: "Team Rank",
      footer: { text: "of 15 members", color: "text.secondary" }
    }
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {performanceData.map((card, index) => (
          <Grid key={index} size={{xs:12,sm:6,md:3}}>
            <PerformanceCard
              icon={card.icon}
              value={card.value}
              label={card.label}
              footer={card.footer}
              progress={card.progress}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Performance;