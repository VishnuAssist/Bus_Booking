import { Button, Card, CardContent, Chip, Grid, LinearProgress, Stack, Typography } from "@mui/material";

const HeaderCard = () => {
    
    return (
        <>
            <Grid container spacing={2} mb={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle2">Store Sales</Typography>
                            <Typography variant="h5" fontWeight={600}>
                                $487K
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={89}

                            />
                            <Typography variant="body2" mt={1}>
                                89% Target Achieved
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">Avg Performance</Typography>
                                <Typography variant="caption">8 Active</Typography>
                            </Stack>
                            <Typography variant="h5" fontWeight={600}>
                                88.5%
                            </Typography>
                            <Typography color="success.main" fontSize={13}>
                                +5.2% this week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle2">Top Performer</Typography>
                            <Typography variant="h6">Sarah Chen</Typography>
                            <Chip label="Elite Tier" size="small" sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="error">
                                Need Coaching
                            </Typography>
                            <Typography variant="h4" color="error">
                                2
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Review Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default HeaderCard;