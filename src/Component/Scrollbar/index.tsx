import { Box } from "@mui/material";
import type { ReactNode } from "react";


const Scrollbar = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      overflowY: "auto",
      height: "100%",
      "&::-webkit-scrollbar": {
        width: "3px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }}
  >
    {children}
  </Box>
);

export default Scrollbar;
