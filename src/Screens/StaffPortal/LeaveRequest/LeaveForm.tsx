import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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

interface LeaveFormProps {
  selectedLeaveRequest: leaverequesttype | null;
  onClose: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({
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
    }
  }, [selectedLeaveRequest]);

  const handleSubmit = async () => {
    const payload = {
      leaveType: leaveType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      leaveDays: 0,
      approvedBy: "",
      approverComments: "",
      status: 1,
      reason: reason.trim(),
      approvedOn: null,
    };

    try {
      if (selectedLeaveRequest?.id) {
        const response = await updateLeave({
          id: selectedLeaveRequest.id,
          ...payload,
        }).unwrap();
        console.log(" Leave updated:", response);
      } else {
        const response = await postLeave(payload).unwrap();
        console.log(" Leave submitted:", response);
      }
      onClose();
    } catch (err) {
      console.error(" Error submitting leave:", err);
    }
  };

  return (
    <Card>
      <CardHeader
        title={selectedLeaveRequest ? "Edit Request" : "Add New Request"}
      />
      <CardContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <Grid container spacing={3}>
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
                  <MenuItem value={2}>Annual Leave</MenuItem>
                  <MenuItem value={3}>Shift Reschedule</MenuItem>
                  <MenuItem value={4}>Shift Swap</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
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

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button variant="contained" color="error" onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeaveForm;
