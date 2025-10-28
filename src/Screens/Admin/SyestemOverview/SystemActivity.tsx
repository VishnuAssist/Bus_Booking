import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Info,
  Warning,
  Error as ErrorIcon,
  CloudUpload,
  Policy,
  Person,
} from "@mui/icons-material";

const SystemActivity = () => {
  const activities = [
    {
      title: "Commission run completed",
      status: "Success",
      statusColor: "success",
      icon: <CheckCircle />,
      type: "System",
      time: "2 minutes ago",
      avatarColor: "#4caf50",
    },
    {
      title: "Data imported:",
      subtitle: "sales_jan_2024.csv",
      status: "success",
      statusColor: "success",
      icon: <CloudUpload />,
      type: "Admin",
      time: "1 hour ago",
      avatarColor: "#2196f3",
    },
    {
      title: "Policy updated: SG",
      subtitle: "Commission Rules",
      status: "info",
      statusColor: "info",
      icon: <Policy />,
      type: "HR Manager",
      time: "3 hours ago",
      avatarColor: "#ff9800",
    },
    {
      title: "User role changed: Alex Kim →",
      subtitle: "Store Manager",
      status: "info",
      statusColor: "info",
      icon: <Person />,
      type: "System",
      time: "Just now",
      avatarColor: "#9c27b0",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
      case "success":
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case "info":
        return <Info sx={{ fontSize: 16 }} />;
      case "warning":
        return <Warning sx={{ fontSize: 16 }} />;
      case "error":
        return <ErrorIcon sx={{ fontSize: 16 }} />;
      default:
        return <Info sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 3,
          }}
        >
          Live System Activity
        </Typography>

        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  px: 0,
                  py: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {activity.title}
                        {activity.subtitle && (
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{
                              fontWeight: 400,
                              color: "text.primary",
                              ml: 0.5,
                            }}
                          >
                            {activity.subtitle}
                          </Typography>
                        )}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:"space-between",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {activity.type} • {activity.time}
                        </Typography>

                        <Chip
                          icon={getStatusIcon(activity.status)}
                          label={activity.status}
                          size="small"
                          color={activity.statusColor as any}
                          variant="filled"
                          sx={{
                            height: 24,
                            "& .MuiChip-icon": {
                              color: "inherit",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  }
                  sx={{
                    m: 0,
                    "& .MuiListItemText-primary": {
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    },
                  }}
                />
              </ListItem>

              {index < activities.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SystemActivity;
