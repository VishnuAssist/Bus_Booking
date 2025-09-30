import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const PageFilter = () => {

    const [FilterOpen, setFilterOpen] = useState(false);

    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <FilterAltIcon style={{ fontSize: 25 }} />
                            <Typography fontSize={16} fontWeight={500}>Commission Filters</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Button variant="contained" size="small" startIcon={FilterOpen ? <FilterAltOffIcon /> : <FilterAltIcon />} onClick={() => setFilterOpen((prev) => !prev)}>{FilterOpen ? "Hide Filter" : "Show Filter"}</Button>
                            <Button variant="contained" size="small" startIcon={<DownloadIcon />}>Export</Button>
                        </Box>
                    </Box>
                    {FilterOpen && (
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        type="date"
                                        label="From date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        type="date"
                                        label="To date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField select label="Status" fullWidth defaultValue="all">
                                        <MenuItem value="all">All statuses</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="approved">Approved</MenuItem>
                                        <MenuItem value="rejected">Rejected</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField select label="Country" fullWidth defaultValue="all">
                                        <MenuItem value="all">All countries</MenuItem>
                                        <MenuItem value="us">United States</MenuItem>
                                        <MenuItem value="uk">United Kingdom</MenuItem>
                                        <MenuItem value="in">India</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField label="Min amount" type="number" fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField label="Max amount" type="number" fullWidth />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Search employee..."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                mt={3}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    Showing 3 results
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<ClearIcon />}
                                >
                                    Clear All Filters
                                </Button>
                            </Grid>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
export default PageFilter;