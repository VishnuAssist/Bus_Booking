import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import * as PropTypes from "prop-types";
import type { FC, ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node as any,
};

export default BaseLayout;
