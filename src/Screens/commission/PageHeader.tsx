import { Box, Button, Typography } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';

const PageHeader = () => {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography fontSize={20} fontWeight={"bold"}>Commission Details</Typography>
                    <Typography variant="caption">Track your earnings and performance</Typography>
                </Box>
                <Button variant="contained" size="small" startIcon={<CalculateIcon />}>Recalculate</Button>
            </Box>
        </>
    )
};
export default PageHeader;