import { Box, Stack, Typography } from "@mui/material";
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';

const PageHeader = () => {
    return (
        <>
            <Box>
                <Box sx={{ p: { xs: 2, md: 2 } }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: "#346cff" }}
                        >
                            Welcome back, <span style={{ fontSize: 20 }}> Admin!</span>
                        </Typography>
                        <BoltRoundedIcon sx={{ color: "#55ff99", ml: 1, fontSize: 34 }} />
                    </Stack>
                    <Box sx={{ mt: 0.5 }}>
                        <Typography variant="subtitle1">
                            You're doing great! Keep up the momentum.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default PageHeader;