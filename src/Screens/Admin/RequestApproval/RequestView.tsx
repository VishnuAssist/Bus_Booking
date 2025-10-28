import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import {
  Event,
  Comment,
  CalendarMonth,
  CloseRounded,
} from "@mui/icons-material";
import type { leaverequesttype, StatusItem } from "../../../model/LeaveRequest";
import {
  useGetallLeavesQuery,
  usePutLeavesMutation,
} from "../../../Api/StaffservicesApi";
import { useGetstatusQuery } from "../../../Api/dictionaryApi";

const RequestView = () => {
  const { data: request } = useGetallLeavesQuery({});

  const { data: statusData } = useGetstatusQuery({});
  const [updateLeave] = usePutLeavesMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReq, setSelectedReq] = useState<leaverequesttype | null>(null);
  const [comments, setComments] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  ); // Track the action type

  const handleOpenDialog = (
    req: leaverequesttype,
    action: "approve" | "reject"
  ) => {
    setSelectedReq(req);
    setActionType(action);
    setOpenDialog(true);
    setComments("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReq(null);
    setActionType(null);
    setComments("");
  };

  const handleSubmit = async () => {
    if (!selectedReq?.id || !statusData || !actionType) return;

    const statusObj = statusData.statuses.find(
      (s: StatusItem) =>
        s.name.toLowerCase() ===
        (actionType === "approve" ? "approved" : "reject").toLowerCase()
    );

    if (!statusObj) {
      console.error(`Status not found for action: ${actionType}`);
      return;
    }

    const payload = {
      id: selectedReq.id,
      status: statusObj.id,
      approvedBy: "Admin",
      reason: "Nothing",
      approverComments: comments,
      approvedOn: "2025-10-24T04:31:39.396Z",
    };

    try {
      if (selectedReq?.id) {
        const response = await updateLeave(payload).unwrap();
        console.log(" Leave updated:", response);
      }
      handleCloseDialog();
    } catch (err) {
      console.error(" Error submitting leave:", err);
    }
  };

  const getStatusName = (id: number) => {
    const status = statusData?.statuses?.find((s: StatusItem) => s.id === id);
    return status ? status.name : "Unknown";
  };

  const getStatusColor = (id: number) => {
    const name = getStatusName(id)?.toLowerCase();
    switch (name) {
      case "approved":
        return "success";
      case "reject":
      case "rejected":
        return "error";
      case "waiting":
        return "warning";
      default:
        return "default";
    }
  };

  const InfoItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Box mr={1}>{icon}</Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        {request?.items.map((req) => (
          <Grid size={{ xs: 12, md: 4, sm: 6 }} key={req.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                "&:hover": { boxShadow: 5 },
                transition: "0.2s ease",
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Chip
                    label={req.leaveType}
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      borderRadius: "8px",
                    }}
                  />
                  <Chip
                    label={getStatusName(req.status)}
                    color={getStatusColor(req.status)}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                <InfoItem
                  icon={<CalendarMonth color="info" />}
                  label="Start Date"
                  value={
                    req.startDate
                      ? new Date(req.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"
                  }
                />
                <InfoItem
                  icon={<Event color="info" />}
                  label="End Date"
                  value={
                    req.endDate
                      ? new Date(req.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"
                  }
                />
                <InfoItem
                  icon={<Comment color="secondary" />}
                  label="Reason"
                  value={req.reason}
                />
                {req.status == 1 && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={2}
                    gap={2}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => handleOpenDialog(req, "reject")}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleOpenDialog(req, "approve")}
                    >
                      Approve
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {actionType === "approve" ? "Approve" : "Reject"} Leave Request
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>

        {selectedReq && (
          <DialogContent>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Comments"
              placeholder={`Enter comments for ${actionType}...`}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color={actionType === "approve" ? "primary" : "error"}
                onClick={handleSubmit}
              >
                {actionType === "approve" ? "Approve" : "Reject"} Leave
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default RequestView;
