import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import {
  EmojiEvents as TrophyIcon,
  Public as GlobeIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

interface LeaderboardEntry {
  id: string;
  name: string;
  position: number;
  points: number;
  change: number;
  tier: string;
}

const CombinedLeaderboard: React.FC<{ currentUserId?: string }> = ({
  currentUserId = "4",
}) => {
  const theme = useTheme();
  const [tab, setTab] = useState<"regional" | "store">("regional");

  // Regional data
  const regionalLeaderboard: LeaderboardEntry[] = [
    { id: "sg1", name: "Singapore Store 1", position: 1, points: 95200, change: 12, tier: "Diamond" },
    { id: "sg2", name: "Singapore Store 2", position: 2, points: 87600, change: 5, tier: "Platinum" },
    { id: "my1", name: "Malaysia Store 1", position: 3, points: 82100, change: -3, tier: "Platinum" },
    { id: "th1", name: "Thailand Store 1", position: 4, points: 76800, change: 8, tier: "Gold" },
  ];

  // Store data
  const storeLeaderboard: LeaderboardEntry[] = [
    { id: "1", name: "Sarah Chen", position: 1, points: 12450, change: 15, tier: "Elite" },
    { id: "2", name: "Marcus Rodriguez", position: 2, points: 11280, change: 8, tier: "Senior" },
    { id: "3", name: "Emily Johnson", position: 3, points: 10950, change: -2, tier: "Senior" },
    { id: "4", name: "Alex Kim", position: 4, points: 9870, change: 12, tier: "Advanced" },
    { id: "5", name: "Lisa Wong", position: 5, points: 9320, change: 5, tier: "Advanced" },
    { id: "6", name: "David Park", position: 6, points: 8750, change: -1, tier: "Advanced" },
    { id: "7", name: "Jennifer Wu", position: 7, points: 8200, change: 3, tier: "Standard" },
    { id: "8", name: "Tom Anderson", position: 8, points: 7950, change: 7, tier: "Standard" },
  ];

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return "#FFD700"; // Gold
      case 2: return "#C0C0C0"; // Silver
      case 3: return "#CD7F32"; // Bronze
      default: return theme.palette.primary.main;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "elite": return "error";
      case "senior": return "warning";
      case "advanced": return "info";
      case "standard": return "success";
      case "diamond": return "primary";
      case "platinum": return "secondary";
      case "gold": return "warning";
      default: return "default";
    }
  };

  const getCountryFlag = (storeId: string) => {
    if (storeId.startsWith("sg")) return "🇸🇬";
    if (storeId.startsWith("my")) return "🇲🇾";
    if (storeId.startsWith("th")) return "🇹🇭";
    return "🏢";
  };

  const data = tab === "regional" ? regionalLeaderboard : storeLeaderboard;

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            {tab === "regional" ? (
              <GlobeIcon />
            ) : (
              <TrophyIcon />
            )}
            <Typography variant="h6">
              {tab === "regional" ? "Regional Leaderboard" : "Store Leaderboard"}
            </Typography>
          </Box>
        }
        action={
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Regional" value="regional" />
            <Tab label="Store" value="store" />
          </Tabs>
        }
      />
      <CardContent
        sx={{
          maxHeight: 360, // limit height
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome/Edge
        }}
      >
        <List>
          {data.map((entry) => (
            <ListItem
              key={entry.id}
              sx={{
                backgroundColor:
                  entry.id === currentUserId && tab === "store"
                    ? "action.hover"
                    : "transparent",
                border:
                  entry.id === currentUserId && tab === "store"
                    ? `1px solid ${theme.palette.primary.main}`
                    : "none",
                borderRadius: 1,
                mb: 1,
                "&:last-child": { mb: 0 },
              }}
              secondaryAction={
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={entry.tier}
                    color={getTierColor(entry.tier)}
                    size="small"
                  />
                  <Box display="flex" alignItems="center">
                    {entry.change > 0 ? (
                      <TrendingUpIcon color="success" fontSize="small" />
                    ) : entry.change < 0 ? (
                      <TrendingDownIcon color="error" fontSize="small" />
                    ) : null}
                    <Typography
                      variant="body2"
                      color={
                        entry.change > 0
                          ? "success.main"
                          : entry.change < 0
                          ? "error.main"
                          : "textSecondary"
                      }
                      sx={{ ml: 0.5 }}
                    >
                      {entry.change > 0 ? "+" : ""}
                      {entry.change}
                      {tab === "regional" ? "%" : ""}
                    </Typography>
                  </Box>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getPositionColor(entry.position),
                    width: 32,
                    height: 32,
                    fontSize: "0.875rem",
                  }}
                >
                  {entry.position}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  tab === "regional" ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6" component="span">
                        {getCountryFlag(entry.id)}
                      </Typography>
                      <Typography variant="subtitle1">{entry.name}</Typography>
                    </Box>
                  ) : (
                    <Typography variant="subtitle1">
                      {entry.name}
                      {entry.id === currentUserId && (
                        <Chip
                          label="You"
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Typography>
                  )
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {entry.points.toLocaleString()}{" "}
                    {tab === "regional" ? "total points" : "points"}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CombinedLeaderboard;
