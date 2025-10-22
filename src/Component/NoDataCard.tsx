import { Card, Typography } from "@mui/material";
import type {  SxProps, Theme } from "@mui/material";

interface NoDataCardProps {
  text?: string;
  sx?: SxProps<Theme>; // Allows passing any additional styles
}

const NoDataCard: React.FC<NoDataCardProps> = ({
  text = "No Data Available",
  sx = {},
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx, 
      }}
    >
      <Typography variant="h5">{text}</Typography>
    </Card>
  );
};

export default NoDataCard;
