import { Card, CardContent, Grid, Typography, Chip } from "@mui/material";

const Structure = () => {

    const structureData = [
        { title: "Base Commission", desc: "Standard rate on all sales", chip: "12% of sales" },
        { title: "Performance Bonus", desc: "≥75% target achievement", chip: "+5% bonus rate" },
        { title: "Tier Multiplier", desc: "Advanced tier bonus", chip: "1.3x multiplier" },
        { title: "Cap Limit", desc: "Maximum earnings", chip: "120% of base" },
    ];

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Commission Structure (SG)
                </Typography>

                <Grid container spacing={2}>
                    {structureData.map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item.title}>
                            <Card
                                variant="outlined"
                                sx={{ p: 2, borderRadius: 2, height: "100%" }}
                            >
                                <Typography fontWeight={600}>{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {item.desc}
                                </Typography>
                                <Chip label={item.chip} size="small" />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Structure;