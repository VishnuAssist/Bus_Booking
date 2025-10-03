import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  AutoAwesome as StarIcon
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  recipient: string;
  type: 'weekly' | 'improvement' | 'consistency';
  icon: React.ReactNode;
  color: 'success' | 'primary' | 'warning';
}

const RecentAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Weekly Winner',
      description: 'Top performer this week',
      recipient: 'Sarah Chen',
      type: 'weekly',
      icon: <TrophyIcon />,
      color: 'success'
    },
    {
      id: '2',
      title: 'Most Improved',
      description: 'Biggest rank jump',
      recipient: 'Alex Kim',
      type: 'improvement',
      icon: <TrendingUpIcon />,
      color: 'primary'
    },
    {
      id: '3',
      title: 'Consistency King',
      description: '7-day streak',
      recipient: 'Marcus Rodriguez',
      type: 'consistency',
      icon: <StarIcon />,
      color: 'warning'
    }
  ];

  const getAchievementStyles = (type: Achievement['type']) => {
    switch (type) {
      case 'weekly':
        return {
          bgcolor: 'success.light',
          borderColor: 'success.main',
          iconColor: 'success.main'
        };
      case 'improvement':
        return {
          bgcolor: 'primary.light',
          borderColor: 'primary.main',
          iconColor: 'primary.main'
        };
      case 'consistency':
        return {
          bgcolor: 'warning.light',
          borderColor: 'warning.main',
          iconColor: 'warning.main'
        };
      default:
        return {
          bgcolor: 'grey.100',
          borderColor: 'grey.400',
          iconColor: 'grey.600'
        };
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="h2">
            <TrophyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Recent Achievements
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          {achievements.map((achievement) => {
            const styles = getAchievementStyles(achievement.type);
            
            return (
              <Grid size={{xs:12,md:4}} key={achievement.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    // backgroundColor: styles.bgcolor,
                    border: `1px solid`,
                    borderColor: styles.borderColor,
                    height: '100%'
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: styles.borderColor,
                      width: 48,
                      height: 48
                    }}
                  >
                    {React.cloneElement(achievement.icon as React.ReactElement, {
                      sx: { color: 'white' }
                    })}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color={styles.iconColor}
                      gutterBottom
                    >
                      {achievement.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {achievement.description}
                    </Typography>
                    <Chip
                      label={achievement.recipient}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecentAchievements;