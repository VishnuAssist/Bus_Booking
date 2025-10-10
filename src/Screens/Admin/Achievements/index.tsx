import { Box, Button, Card, CardContent, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Edit, Delete } from "@mui/icons-material";
import TargetIcon from "@mui/icons-material/TrackChanges";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Footer from "../../../Component/Footer";


const AdminAchievement = () => {

    const sampleAchievementData = [
        {
            id: 1,
            title: "First Sale",
            subtitle: "Complete your first sale",
            type: "Common",
        },
        {
            id: 2,
            title: "Sales Champion",
            subtitle: "Complete 10 sales",
            type: "Rare",
        },
        {
            id: 3,
            title: "Streak Master",
            subtitle: "Maintain a 7-day streak",
            type: "Rare",
        },
        {
            id: 4,
            title: "Consistent Performer",
            subtitle: "Maintain a 30-day streak",
            type: "Epic",
        },
        {
            id: 5,
            title: "Top Performer",
            subtitle: "Reach #1 on monthly leaderboard",
            type: "Legendary",
        },
        {
            id: 6,
            title: "Top 5 Performer",
            subtitle: "Reach top 5 on monthly leaderboard",
            type: "Rare",
        },
        {
            id: 7,
            title: "Team Player",
            subtitle: "Help 5 team members",
            type: "Common",
        },
        {
            id: 8,
            title: "Super Helper",
            subtitle: "Help 20 team members",
            type: "Epic",
        },
        {
            id: 9,
            title: "Lightning Fast",
            subtitle: "Complete 100 calls quickly",
            type: "Epic",
        },
        {
            id: 10,
            title: "Call Machine",
            subtitle: "Complete 500 calls",
            type: "Legendary",
        },
    ]

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Admin Achievement" />

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <WorkspacePremiumOutlinedIcon />
                                        <Typography fontSize={16} fontWeight={600}>Achievement Management</Typography>
                                    </Box>
                                    <Button variant="contained" size="small" startIcon={<AddOutlinedIcon />}>Create Achievement</Button>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    {sampleAchievementData.map((item) => (
                                        <Card key={item.id}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                borderRadius: 2,
                                                p: 1.5,
                                                my: 1
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 2,
                                                        border: "2px solid #1976d2",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "#1976d2",
                                                    }}
                                                >
                                                    <TargetIcon />
                                                </Box>

                                                <Box>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Typography variant="subtitle1" fontWeight={600}>
                                                            {item.title}
                                                        </Typography>
                                                        <Chip
                                                            label={item.type}
                                                            size="small"
                                                            sx={{
                                                                fontSize: "0.7rem",
                                                                fontWeight: 500,
                                                                color: "#555",
                                                                backgroundColor: "#f3f3f3",
                                                            }}
                                                        />
                                                        <Chip
                                                            label="300 pts"
                                                            size="small"
                                                            sx={{
                                                                fontSize: "0.7rem",
                                                                fontWeight: 600,
                                                                backgroundColor: "#e3f2fd",
                                                                color: "#1976d2",
                                                            }}
                                                        />
                                                    </Stack>

                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.subtitle}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <Box>
                                                <IconButton size="small" color="warning">
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="error">
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <EmojiEventsOutlinedIcon />
                                        <Typography fontSize={16} fontWeight={600}>Achievement Progress Reviews</Typography>
                                    </Box>
                                    <Chip label="0 pending" />
                                </Box>
                                <Box sx={{ mt: 3, textAlign: "center" }}>
                                    <EmojiEventsOutlinedIcon style={{ fontSize: 50 }} />
                                    <Typography variant="subtitle1">No pending reviews.</Typography>
                                    <Typography variant="subtitle1">All achievement progress entries have been reviewed.</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <DescriptionOutlinedIcon />
                                    <Typography fontSize={16} fontWeight={600}>Staff Requests Pending Review</Typography>
                                </Box>
                                <Box sx={{ mt: 3, textAlign: "center" }}>
                                    <DescriptionOutlinedIcon style={{ fontSize: 50 }} />
                                    <Typography variant="subtitle1">Staff request management interface would appear here.</Typography>
                                    <Typography variant="subtitle1">Admins can approve/reject MC applications, leave requests, and shift changes.</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CommisionContainer>

            <Footer />
        </>
    )
}
export default AdminAchievement;