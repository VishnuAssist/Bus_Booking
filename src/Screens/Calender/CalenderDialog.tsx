import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
   Grid, // MUI System Grid2
  Typography,
  Divider,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NotesIcon from "@mui/icons-material/Notes";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

interface CalendarDialogProps {
  open: boolean;
  onClose: () => void;
  shift: any | null;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({ open, onClose, shift }) => {
  const [showRejectFields, setShowRejectFields] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [alternateDates, setAlternateDates] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  if (!shift) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleReject = () => setShowRejectFields(true);

  const handleAccept = () => {
    onClose();
  };

  const handleRejectSubmit = () => {
    console.log("Rejection submitted:", { alternateDates, rejectionReason });
    setShowRejectFields(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Shift Details
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <WorkHistoryIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Shift ID
            </Typography>
            <Typography sx={{mt:1}}>{shift.id}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <StoreIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Store Name
            </Typography>
            <Typography sx={{mt:1}}>{shift.name}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <CalendarMonthIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Start Date
            </Typography>
            <Typography sx={{mt:1}}>{formatDate(shift.start)}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <CalendarMonthIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              End Date
            </Typography>
            <Typography sx={{mt:1}}>{formatDate(shift.end)}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <AccessTimeIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Start Time
            </Typography>
            <Typography sx={{mt:1}}>{shift.startTime}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <AccessTimeIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              End Time
            </Typography>
            <Typography sx={{mt:1}}>{shift.endTime}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              <WorkHistoryIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Shift Type
            </Typography>
            <Typography sx={{mt:1}}>{shift?.title}</Typography>
          </Grid>

          {shift.skipDate && (
            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                <EventRepeatIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Skip Date
              </Typography>
              <Typography sx={{mt:1}}>{shift.skipDate}</Typography>
            </Grid>
          )}

          {shift.notes && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary">
                <NotesIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Notes
              </Typography>
              <Typography sx={{mt:1}}>{shift.notes}</Typography>
            </Grid>
          )}
        </Grid>

        {/* Reject Fields Section */}
        {showRejectFields && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Provide Alternate Details
            </Typography>
            <Grid container spacing={2} sx={{mt:2}}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Alternate Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={alternateDates.startDate}
                  onChange={(e) =>
                    setAlternateDates({ ...alternateDates, startDate: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Alternate End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={alternateDates.endDate}
                  onChange={(e) =>
                    setAlternateDates({ ...alternateDates, endDate: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Alternate Start Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={alternateDates.startTime}
                  onChange={(e) =>
                    setAlternateDates({ ...alternateDates, startTime: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Alternate End Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={alternateDates.endTime}
                  onChange={(e) =>
                    setAlternateDates({ ...alternateDates, endTime: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Reason for Rejection"
                  fullWidth
                  multiline
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        {!showRejectFields ? (
          <>
            <Button variant="contained" color="success" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject}>
              Reject
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setShowRejectFields(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleRejectSubmit}>
              Submit Rejection
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CalendarDialog;
