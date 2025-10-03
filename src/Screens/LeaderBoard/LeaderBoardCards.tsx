import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon
} from '@mui/icons-material';

interface KPICardProps {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  trendPeriod: string;
  color: 'primary' | 'success' | 'warning' | 'error';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  trendPeriod,
  color
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon color="success" />;
      case 'down':
        return <TrendingDownIcon color="error" />;
      default:
        return <TrendingFlatIcon color="warning" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
      

        <Grid container spacing={2}>
          <Grid size={{ xs: 7 }}>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
          </Grid>
          <Grid size={{ xs: 5 }}>
            {getTrendIcon()}
            <Chip
              label={`${trendValue > 0 ? '+' : ''}${trendValue}%`}
              color={getTrendColor()}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            {value.toLocaleString()}
            {unit && (
              <Typography variant="h6" component="span" color="textSecondary">
                {' '}
                {unit}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" color="textSecondary">
              {trendPeriod}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const LeaderBoardCards: React.FC = () => {
  const kpiData: KPICardProps[] = [
    {
      title: 'Your Rank',
      value: 4,
      unit: '',
      trend: 'up' as const,
      trendValue: 2,
      trendPeriod: 'this week',
      color: 'success'
    },
    {
      title: 'Points This Month',
      value: 9870,
      unit: 'pts',
      trend: 'up' as const,
      trendValue: 12,
      trendPeriod: 'last month',
      color: 'primary'
    },
    {
      title: 'Store Ranking',
      value: 2,
      unit: '',
      trend: 'neutral' as const,
      trendValue: 0,
      trendPeriod: 'this month',
      color: 'warning'
    },
    {
      title: 'Region Ranking',
      value: 15,
      unit: '',
      trend: 'up' as const,
      trendValue: 3,
      trendPeriod: 'this quarter',
      color: 'success'
    }
  ];

  return (
    <Grid container spacing={1} sx={{ mb: 1 }}>
      {kpiData.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
          <KPICard {...kpi} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LeaderBoardCards;
