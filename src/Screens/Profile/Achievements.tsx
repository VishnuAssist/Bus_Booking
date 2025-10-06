import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  Chip
} from '@mui/material';


import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import StarIcon from '@mui/icons-material/Star';
import Performance from './Performance';

const Achievements = () => {
  const recentAchievements = [
    {
      icon: <WhatshotIcon fontSize="large" color="warning" />,
      title: "Sales Streak",
      time: "2 days ago",
      chipLabel: "Common",
      chipColor: "primary"
    },
    {
      icon: <EmojiEventsIcon fontSize="large" color="success" />,
      title: "Top Performer",
      time: "2 days ago",
      chipLabel: "Rare",
      chipColor: "secondary"
    },
    {
      icon: <Diversity2Icon fontSize="large" color="info" />,
      title: "Team Player",
      time: "2 days ago",
      chipLabel: "Common",
      chipColor: "primary"
    },
    {
      icon: <StarIcon fontSize="large" color="warning" />,
      title: "Rising Star",
      time: "2 days ago",
      chipLabel: "Uncommon",
      chipColor: "success"
    }
  ];

  return (
    <div>
      <Grid container spacing={2}>\
        <Grid size={{xs:12}}>
          <Performance/>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ p: 1, height: '100%' }}>
            <Box>
              <Typography variant="h6" sx={{fontSize:"18px"}} >Achievement Summary</Typography>
            </Box>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',mt:5
                }}
              >
                <Typography variant="h4" sx={{fontSize:"17px"}} >18</Typography>
                <Typography variant="body1" sx={{fontSize:"18px"}} color="text.secondary">
                  Total Achievements Unlocked
                </Typography>
                <Box width="100%" mr={1} my={2}>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{fontSize:"16px"}} >
                  75% completion rate
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ p: 1, height: '100%' }}>
            <Box>
              <Typography variant="h6" sx={{fontSize:"18px"}} >Recent Achievements</Typography>
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                {recentAchievements.map((achievement, index) => (
                  <Grid key={index} size={{ xs: 12 }}>
                    <Card sx={{ p: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 1.5 }}>
                          {achievement.icon}
                        </Grid>
                        <Grid size={{ xs: 8.5 }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {achievement.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                          <Chip
                            label={achievement.chipLabel}
                            size="small"
                            color={achievement.chipColor}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Achievements;