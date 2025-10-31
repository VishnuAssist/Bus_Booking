import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  Bolt,
  CardGiftcard,
  Leaderboard,
  MilitaryTech,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QuickAction = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: <Bolt />, label: "Log Sale", path: "/sts/sales" },
    { icon: <CardGiftcard />, label: "View Rewards", path: "" },
    {
      icon: <Leaderboard />,
      label: "Leaderboard",
      path: "/dashboards/LeaderBoard",
    },
    {
      icon: <MilitaryTech />,
      label: "Achievements",
      path: "/Admin/achievement",
    },
  ];

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {actions.map((action, i) => (
              <Grid size={{ xs: 12, md: 3 }} key={i}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={action.icon}
                  sx={{ py: 2, borderRadius: 3 }}
                  onClick={() => {
                    if (action.path) navigate(action.path);
                  }}
                >
                  {action.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickAction;
