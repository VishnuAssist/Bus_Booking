import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const CommisionContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: "98%",
        mx: 3,
        height: "100%",
        pt: 2,
      }}
      id="LeaseView"
    >
      {children}
    </Box>
  );
};

export default CommisionContainer;
