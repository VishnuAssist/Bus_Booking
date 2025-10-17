import React, { useState } from 'react';
import { Grid } from '@mui/material';
import LeaderBoardFilter from './LeaderBoardFilter';
import LeaderBoardCards from './LeaderBoardCards';

import RecentAchievements from './RecentAchievements';
import CombinedLeaderboard from './RegionalAndStoreLeaderboard';

interface FilterState {
  employee: string;
  status: string;
  minAmount: string;
  maxAmount: string;
}

const LeaderBoardDetail: React.FC = () => {
  const [_filters, setFilters] = useState<FilterState>({
    employee: '',
    status: 'all',
    minAmount: '',
    maxAmount: ''
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // You can add your filter logic here
    console.log('Applied filters:', newFilters);
  };

  return (
    <Grid container spacing={3}>
      <Grid  size={{xs:12}}>
        <LeaderBoardFilter onFilterChange={handleFilterChange} />
      </Grid>
            <Grid  size={{xs:12}}>
        <RecentAchievements />
      </Grid>

      <Grid  size={{xs:12,md:6}}>
        <CombinedLeaderboard />
      </Grid>
      <Grid  size={{xs:12,md:6}}>
        <LeaderBoardCards />
      </Grid>

 
    </Grid>
  );
};

export default LeaderBoardDetail;