import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Divider, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

type Anchor = "top" | "left" | "bottom" | "right";

export default function CommonDrawer({
  children,
  anchor,
  isOpen,
  onClose,
  title,
}: {
  children: React.ReactNode;
  anchor: Anchor;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  return (
    <Drawer
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            margin: "0px 10px",
          },
        },
      }}
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: anchor === "bottom" ? 10 : 0,
          borderTopRightRadius: anchor === "bottom" ? 10 : 0,
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, height: "80vh", overflowY: "auto" }}>{children}</Box>
    </Drawer>
  );
}
