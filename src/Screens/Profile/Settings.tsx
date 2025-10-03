import  {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  Select,
  
  
  Typography
} from '@mui/material'; 
import type { SelectChangeEvent } from '@mui/material';


import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import IOSSwitch from '../../Component/customSwitch';
const Settings = () => {
  const [visibility, setVisibility] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVisibility(event.target.value);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ p: 1 }}>
            <Box display={'flex'} alignItems={'center'}>
              <NotificationsNoneOutlinedIcon />
              <Typography fontSize={'18px'} sx={{ ml: 1 }}>
                Notifications
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography fontSize={'14px'}>Email Notifications</Typography>
                  <Typography fontSize={'12px'}>
                    Receive updates via email
                  </Typography>
                </Box>
                <IOSSwitch />
              </Grid>
              <Divider />
              <Grid
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography fontSize={'14px'}>Push Notifications</Typography>
                  <Typography fontSize={'12px'}>
                    Get notified in the app
                  </Typography>
                </Box>
                <IOSSwitch />
              </Grid>
              <Divider />
              <Grid
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography fontSize={'14px'}>SMS Notifications</Typography>
                  <Typography fontSize={'12px'}>
                    Receive text messages
                  </Typography>
                </Box>
                <IOSSwitch />
              </Grid>
              <Divider />
              <Grid
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography fontSize={'14px'}>Achievement Alerts</Typography>
                  <Typography fontSize={'12px'}>
                    Get notified of new achievements
                  </Typography>
                </Box>
                <IOSSwitch />
              </Grid>
              <Divider />
            </Grid>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ p: 1, height: '100%' }}>
            <Box display={'flex'} alignItems={'center'}>
              <ShieldOutlinedIcon />
              <Typography fontSize={'18px'} sx={{ ml: 1 }}>
                Privacy & Security
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12 }}>
                <Typography fontSize={'14px'}>Profile Visibility</Typography>
                <Select
                  fullWidth
                  size="small"
                  labelId="visibility-label"
                  id="visibility"
                  value={visibility}
                  label="Visibility"
                  onChange={handleChange}
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="team">Team only</MenuItem>
                </Select>
              </Grid>
              <Divider />
              <Grid
                size={{ xs: 12 }}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography fontSize={'14px'}>Show on Leaderboard</Typography>
                  <Typography fontSize={'12px'}>
                    Display your ranking publicly
                  </Typography>
                </Box>
                <IOSSwitch />
              </Grid>
              <Divider />
              <Grid size={{ xs: 12 }}>
                <Button
                  startIcon={<LockOutlinedIcon />}
                  variant="outlined"
                  fullWidth
                >
                  Change Password
                </Button>
              </Grid>
              <Divider />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
