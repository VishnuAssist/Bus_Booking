import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";

const TeamPerformance = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      level: "Elite",
      status: "Excellent",
      statusColor: "success",
      salesProgress: 125000,
      salesTarget: 100000,
      percentage: 125,
      streak: 15,
      commission: 12500,
      badges: 8,
      lastSale: "2 hours ago",
      avatarColor: "#4caf50",
    },
    {
      name: "Maxus Rodriguez",
      level: "Senior",
      status: "Needs-Attention",
      statusColor: "warning",
      salesProgress: 65000,
      salesTarget: 80000,
      percentage: 81,
      streak: 3,
      commission: 6500,
      badges: 6,
      lastSale: "3 days ago",
      avatarColor: "#ff9800",
    },
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "success";
    if (percentage >= 80) return "info";
    if (percentage >= 60) return "warning";
    return "error";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card sx={{ width: "100%", height: "100%", p: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 3,
          }}
        >
          Team Performance Overview
        </Typography>

        <Grid container spacing={2}>
          {teamMembers.map((member, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(29, 46, 60, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Header Section */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: member.avatarColor,
                        width: 48,
                        height: 48,
                        mr: 2,
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        component="h3"
                        fontWeight="bold"
                        noWrap
                      >
                        {member.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          mt: 0.5,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label={member.status}
                          size="small"
                          color={member.statusColor as any}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="medium"
                      >
                        Sales Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {member.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(member.percentage, 100)}
                      color={getProgressColor(member.percentage)}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="right"
                      fontSize="0.75rem"
                    >
                      {formatCurrency(member.salesProgress)} /{" "}
                      {formatCurrency(member.salesTarget)}
                    </Typography>
                  </Box>

                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="primary"
                        >
                          {member.streak}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Day Streak
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="success.main"
                        >
                          {formatCurrency(member.commission)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Commission
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <EmojiEvents
                        color="warning"
                        sx={{ mr: 0.5, fontSize: "1rem" }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        fontSize="0.75rem"
                      >
                        {member.badges} Badges
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontSize="0.7rem"
                      sx={{ flexShrink: 0 }}
                    >
                      Last sale: {member.lastSale}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TeamPerformance;
