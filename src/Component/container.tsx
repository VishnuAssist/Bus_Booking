import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const CommisionContainer = ({ children }: Props) => {
  return (
    <Box sx={{ maxWidth: "99%", mx: 1, height: "100%" }} id="LeaseView">
      {children}
    </Box>
  );
};

export default CommisionContainer;
