import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { CloseRounded, CheckCircle, Cancel } from "@mui/icons-material";
import type {
  leaveReqTableType,
  StatusItem,
} from "../../../model/LeaveRequest";
import {
  useGetallLeavesQuery,
  usePutLeavesMutation,
} from "../../../Api/StaffservicesApi";
import { useGetstatusQuery } from "../../../Api/dictionaryApi";

interface RequestViewProps {
  onPendingCountChange?: (count: number) => void;
}

const RequestView = ({ onPendingCountChange }: RequestViewProps) => {

  const { data: request } = useGetallLeavesQuery({});
  const { data: statusData } = useGetstatusQuery({});
  const [updateLeave] = usePutLeavesMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReq, setSelectedReq] = useState<leaveReqTableType | null>(
    null
  );
  const [comments, setComments] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const getStatusName = (id: number) => {
    const status = statusData?.statuses?.find((s: StatusItem) => s.id === id);
    return status ? status.name : "Unknown";
  };
  
  const pendingCount =
    request?.items?.filter(
      (req) => getStatusName(req.status).toLowerCase() === "waiting"
    ).length || 0;

    useEffect(() => {
    if (onPendingCountChange) {
      onPendingCountChange(pendingCount);
    }
  }, [pendingCount, onPendingCountChange]);
  const handleOpenDialog = (
    req: leaveReqTableType,
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

    const statusKey = actionType === "approve" ? "approved" : "rejected";
    const statusObj = statusData.statuses.find(
      (s: StatusItem) => s.name.toLowerCase() === statusKey
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
      approvedOn: new Date().toISOString(),
    };

    try {
      await updateLeave(payload).unwrap();
      handleCloseDialog();
    } catch (err) {
      console.error("Error submitting leave:", err);
    }
  };


  const getStatusColor = (
    id: number
  ): "success" | "error" | "warning" | "default" => {
    const name = getStatusName(id).toLowerCase();
    switch (name) {
      case "approved":
        return "success";
      case "rejected":
      case "reject":
        return "error";
      case "waiting":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";
  };

  const isPending = (statusId: number) => {
    return getStatusName(statusId).toLowerCase() === "waiting";
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Leave Type</strong>
              </TableCell>
              <TableCell>
                <strong>Start Date</strong>
              </TableCell>
              <TableCell>
                <strong>End Date</strong>
              </TableCell>
              <TableCell>
                <strong>Reason</strong>
              </TableCell>
              {/* <TableCell>
                <strong>Status</strong>
              </TableCell> */}
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request?.items.map((req) => {
              const pending = isPending(req.status);

              return (
                <TableRow
                  key={req.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{req.userName || "Unknown"}</TableCell>
                  <TableCell>
                    <Chip label={req.leaveType} size="small" color="primary" />
                  </TableCell>
                  <TableCell>{formatDate(req.startDate)}</TableCell>
                  <TableCell>{formatDate(req.endDate)}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={req.reason}
                  >
                    {req.reason}
                  </TableCell>
                  {/* <TableCell>
                    <Chip
                      label={getStatusName(req.status)}
                      color={getStatusColor(req.status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell> */}
                  <TableCell >
                    {pending ? (
                      <Box display="flex" gap={1} >
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleOpenDialog(req, "reject")}
                        >
                          Reject
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleOpenDialog(req, "approve")}
                        >
                          Approve
                        </Button>
                      </Box>
                    ) : (
                      <Chip
                        label={getStatusName(req.status)}
                        color={getStatusColor(req.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
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
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>User:</strong> {selectedReq.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Leave Type:</strong> {selectedReq.leaveType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Dates:</strong> {formatDate(selectedReq.startDate)} →{" "}
                {formatDate(selectedReq.endDate)}
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Comments (Optional)"
              placeholder={`Enter reason for ${actionType}ing...`}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color={actionType === "approve" ? "success" : "error"}
                onClick={handleSubmit}
              >
                {actionType === "approve" ? "Approve" : "Reject"} Leave
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default RequestView;
