import { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  Button,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

export default function Overview() {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Kim',
    email: 'alex.kim@zonecommission.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate sales professional with 3+ years of experience in retail and commission-based roles.',
    role: 'Senior Sales Associate',
    department: 'Electronics',
    startDate: 'March 2022',
    tier: 'Tier 3 - Senior'
  });

  const handleUploadPhoto = () => {
    console.log('Upload photo clicked');
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 2 }}>
            <Box display={'flex'} alignItems={'center'}>
              <PersonOutlineOutlinedIcon />
              <Typography fontSize={'18px'} sx={{ ml: 1 }}>
                Personal Information
              </Typography>
            </Box>

            <CardContent>
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <Box position="relative">
                  <Avatar src="/avatar.png" sx={{ width: 100, height: 100 }}>
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        right: -8,
                        minWidth: 0,
                        borderRadius: '50%'
                      }}
                      onClick={handleUploadPhoto}
                    >
                      <CameraAlt fontSize="small" />
                    </Button>
                  )}
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">
                      {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Badge color="primary">{profileData.tier}</Badge>
                  </Box>
                  <Typography color="text.secondary">
                    {profileData.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profileData.department} Department
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={profileData.firstName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={profileData.lastName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Phone"
                    fullWidth
                    value={profileData.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <TextField
                    label="Location"
                    fullWidth
                    value={profileData.location}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <TextField
                    label="Bio"
                    fullWidth
                    multiline
                    minRows={3}
                    value={profileData.bio}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} container  sx={{ height: "100%" }}>
          <Grid size={{ xs: 12, md: 12 }}  sx={{ height: "70%" }}>
            <Card sx={{ p: 1 ,height: "100%"}}>
              <Box display={'flex'} alignItems={'center'}>
                <Brightness5OutlinedIcon />
                <Typography fontSize={'18px'} sx={{ ml: 1 }}>
                  Current Level
                </Typography>
              </Box>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%' // ensures vertical centering
                }}
              >
                <Box
                  textAlign="center"
                  position="relative"
                  display="inline-flex"
                  mb={2}
                >
                  <CircularProgress
                    variant="determinate"
                    value={85}
                    size={120}
                    thickness={4}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h4" fontWeight="bold">
                      7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level
                    </Typography>
                  </Box>
                </Box>

                <Box width="100%">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">XP Progress</Typography>
                    <Typography variant="body2">2450/3000</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid size={{ xs: 12, md: 12 }}  sx={{ height: "30%" }}>
            <Card sx={{ p: 1 ,height: "100%"}}>
              <Box display={'flex'} alignItems={'center'}>
                <WorkOutlineOutlinedIcon />
                <Typography fontSize={'18px'} sx={{ ml: 1 }}>
                  Work Info
                </Typography>
              </Box>
              <CardContent >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Role</Typography>
                  <Typography>{profileData.role}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Department</Typography>
                  <Typography>{profileData.department}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Started</Typography>
                  <Typography>{profileData.startDate}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Tier</Typography>
                  <Typography>{profileData.tier}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
