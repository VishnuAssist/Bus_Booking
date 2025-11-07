import { Typography, Box, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import type { FC } from "react";

interface CommonHeaderProps {
  heading?: string;
  subHeading?: string;
  children?: React.ReactNode;
  backIcon?: boolean;
  url?: string;
}

const CommonHeader: FC<CommonHeaderProps> = ({
  heading = "",
  subHeading = "",
  children,
  backIcon = false,
  url,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
      component={Paper}
      width="100%"
      sx={{
        px: 2,
        py: 1.5,
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: {
          xs: "start",
          sm: "center",
        },
      }}
      {...rest}
      boxShadow="rgba(0, 0, 0, 0.09) 4px 4px 11px 2px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        gap={2}
        sx={{
          mb: children ? { xs: 2, sm: 0 } : 0, // Conditional margin - Add margin below the first Box in column layout
          justifyContent: { xs: "start" }, // Add margin below the first Box in column layout
        }}
      >
        {backIcon && (
          <Link to={url ?? "/"}>
            <ArrowBackIcon color="primary" sx={{ mt: "5px" }} />
          </Link>
        )}
        <Typography
          variant="h3"
          component="h3"
          fontWeight="600"
          textTransform="uppercase"
        >
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Box>

      <Box
        display="flex"
        gap={2}
        justifyContent="flex-end"
        sx={{
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "start", sm: "flex-end" }, 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CommonHeader;
