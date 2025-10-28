import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const AttendanceDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  height: "100%",
                }}
              >
                <Box>
                  <Typography color="warning" fontSize={16} fontWeight={700}>
                    0
                  </Typography>
                  <Typography variant="subtitle1">Pending Review</Typography>
                </Box>
                <AccessTimeOutlinedIcon
                  color="warning"
                  style={{ fontSize: 35 }}
                />
              </Card>
            </Grid>
            <Grid size={4}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  height: "100%",
                }}
              >
                <Box>
                  <Typography color="success" fontSize={16} fontWeight={700}>
                    0
                  </Typography>
                  <Typography variant="subtitle1">Approved</Typography>
                </Box>
                <CheckOutlinedIcon color="success" style={{ fontSize: 35 }} />
              </Card>
            </Grid>
            <Grid size={4}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  height: "100%",
                }}
              >
                <Box>
                  <Typography color="error" fontSize={16} fontWeight={700}>
                    0
                  </Typography>
                  <Typography variant="subtitle1">Rejected</Typography>
                </Box>
                <ClearOutlinedIcon color="error" style={{ fontSize: 35 }} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonOutlineOutlinedIcon />
                <Typography fontSize={18}>All Records (0)</Typography>
              </Box>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <AccessTimeOutlinedIcon style={{ fontSize: 50 }} />
                <Typography variant="subtitle1">
                  No attendance records found.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDashboard;
