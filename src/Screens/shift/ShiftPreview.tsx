import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Box,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { format } from "date-fns";
import type { User } from "../../model/shiftType";

interface SkipDate {
  startDate: string;
  endDate: string;
}

interface ShiftPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  shift: any;
}

const getShiftTypeColor = (
  shiftType: string
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success" => {
  switch (shiftType) {
    case "Morning":
      return "info";
    case "After Noon":
      return "warning";
    case "Night":
      return "primary";
    default:
      return "default";
  }
};

const ShiftPreviewDialog: React.FC<ShiftPreviewDialogProps> = ({
  open,
  onClose,
  shift,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!shift) return null;

  const parseSkipDates = (): SkipDate[] => {
    if (!shift.skipDates) return [];
    try {
      return JSON.parse(shift.skipDates);
    } catch {
      return [];
    }
  };

  const skipDates = parseSkipDates();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 1100,
          margin: { xs: 1, sm: 2 },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Shift Preview
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <DialogContent
        dividers
        sx={{
          p: 3,
          bgcolor: "background.default",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              SHIFT TYPE
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={shift.shiftType}
                color={getShiftTypeColor(shift.shiftType)}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              DURATION
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {shift.duration}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              START TIME
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {shift.startTime}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              END TIME
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {shift.endTime}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              START DATE
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {format(new Date(shift.startDate), "MMM dd, yyyy")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              END DATE
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {format(new Date(shift.endDate), "MMM dd, yyyy")}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            color="textSecondary"
            fontWeight={600}
            sx={{ display: "block", mb: 1.5 }}
          >
            ASSIGNED USERS
          </Typography>
          {shift.users && shift.users.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {shift.users.map((user: User) => (
                <Box
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                  }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                  >
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {user.fullName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {user.userName} • {user.employeeCode}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No users assigned
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              REASON
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {shift.reason}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              NOTES
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {shift.notes || "No notes"}
            </Typography>
          </Grid>
        </Grid>

        {skipDates.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                fontWeight={600}
                sx={{ display: "block", mb: 1.5 }}
              >
                SKIP DATES
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "action.hover" }}>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skipDates.map((d, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {format(new Date(d.startDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(d.endDate), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShiftPreviewDialog;
