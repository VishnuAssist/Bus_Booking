"use client";
import {
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { People, MenuBook, School, TrackChanges } from "@mui/icons-material";

const HeaderCardView = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Overall Progress",
      value: 85,
      level: "Level 5",
      icon: <TrackChanges />,
    },
    {
      title: "Active Learners",
      value: 47,
      level: " 12 this week",
      icon: <People />,
    },
    {
      title: "Available Sections",
      value: 65,
      level: "2 new",
      icon: <MenuBook />,
    },
    {
      title: "Employees Complete",
      value: 72,
      level: "Goal: 80%",
      icon: <School />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                p: 2,
                borderRadius: 1,
                boxShadow: "0 4px 12px rgba(29, 46, 60, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" alignItems="center" gap={1.2}>
                  <Avatar
                    sx={{
                      color: theme.palette.primary.main,
                      width: 44,
                      height: 44,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    {stat.title}
                  </Typography>
                </Stack>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.success.main,
                  mt: 2,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={Math.min(stat.value, 100)}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  my: 1.5,
                  backgroundColor: "#e0e0e0",
                }}
              />

              <Chip
                label={stat.level}
                size="small"
                variant="outlined"
                sx={{
                  mt: 0.5,
                  fontWeight: 500,
                  borderColor: "#a1e2a4",
                  color: "#4caf50",
                  bgcolor: "#f6fff8",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeaderCardView;
