import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { leaverequesttype } from "../../../model/LeaveRequest";
import {
  usePostLeaveMutation,
  usePutLeavesMutation,
} from "../../../Api/StaffservicesApi";

interface LeaveDialogProps {
  open: boolean;
  selectedLeaveRequest: leaverequesttype | null;
  onClose: () => void;
}

const LeaveRequestDialog: React.FC<LeaveDialogProps> = ({
  open,
  selectedLeaveRequest,
  onClose,
}) => {
  const [postLeave, { isLoading }] = usePostLeaveMutation();
  const [updateLeave] = usePutLeavesMutation();

  const [leaveType, setLeaveType] = useState<number | string>(
    selectedLeaveRequest?.leaveType || 0
  );
  const [startDate, setStartDate] = useState<string>(
    selectedLeaveRequest?.startDate || ""
  );
  const [endDate, setEndDate] = useState<string>(
    selectedLeaveRequest?.endDate || ""
  );
  const [reason, setReason] = useState<string>(
    selectedLeaveRequest?.reason || ""
  );

  useEffect(() => {
    if (selectedLeaveRequest) {
      setLeaveType(selectedLeaveRequest.leaveType ?? 0);
      setStartDate(
        new Date(selectedLeaveRequest.startDate).toISOString().split("T")[0]
      );
      setEndDate(
        new Date(selectedLeaveRequest.endDate).toISOString().split("T")[0]
      );
      setReason(selectedLeaveRequest.reason ?? "");
    } else {
      setLeaveType(0);
      setStartDate("");
      setEndDate("");
      setReason("");
    }
  }, [selectedLeaveRequest]);

  const handleSubmit = async () => {
    const payload = {
      leaveType: leaveType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      status: 1,
      reason: reason.trim(),
    };

    try {
      if (selectedLeaveRequest?.id) {
        const response = await updateLeave({
          id: selectedLeaveRequest.id,
          ...payload,
        }).unwrap();
        console.log("Leave updated:", response);
      } else {
        const response = await postLeave(payload).unwrap();
        console.log("Leave submitted:", response);
      }
      onClose();
    } catch (err) {
      console.error("Error submitting leave:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="leave-request-dialog-title"
    >
      <DialogTitle id="leave-request-dialog-title">
        {selectedLeaveRequest ? "Edit Leave Request" : "Add New Leave Request"}
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="leave-type-label">Request Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  label="Leave Type"
                  value={leaveType}
                  onChange={(e) => setLeaveType(Number(e.target.value))}
                >
                  <MenuItem value={1}>Sick Leave</MenuItem>
                  <MenuItem value={2}>Casual Leave</MenuItem>
                  <MenuItem value={3}>Annual Leave</MenuItem>
                  <MenuItem value={4}>Medical Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Reason"
                placeholder="Enter your reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveRequestDialog;
