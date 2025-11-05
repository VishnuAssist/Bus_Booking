import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import type { ShiftRequestQueryParamsType } from "../../../../model/shiftType";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../../Constant/defaultValues";
import { useState } from "react";
import AppPagination from "../../../../Component/AppPagination";
import CommonTable from "../../../../Component/CommenTable";
import TableSkeleton from "../../../../Component/Skeletons/TableSkeleton";
import { attendanceRequestTableDataService } from "../service/attendanceTableDataService";
import {
  useAddEditAttendanceMutation,
  useGetAllAttendanceQuery,
} from "../../../../Api/AttendanceApi";
import type {
  AttendanceQueryParamsType,
  AttendanceType,
} from "../../../../model/attendanceType";
import { toast } from "react-toastify";
import NoDataCard from "../../../../Component/NoDataCard";
import AttendenceFilterAdmin from "./AttendenceFilterAdmin";

const AttendanceRequestList = () => {
  const [queryParams, setQueryParams] = useState<AttendanceQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
    Status: 1,
  });

  const handleQueryParamsChange = (
    newQueryParams: ShiftRequestQueryParamsType
  ) => {
    setQueryParams(newQueryParams);
  };

  const [updateAttendance] = useAddEditAttendanceMutation();

  const { data: attendanceRequestData, isLoading } =
    useGetAllAttendanceQuery(queryParams);

  const { columns, rows } = attendanceRequestTableDataService(
    attendanceRequestData?.items || []
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AttendanceType | null>(null);
  const [comment, setComment] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const handleApprove = (row: AttendanceType) => {
    setSelectedRow(row);
    setActionType("approve");
    setOpenDialog(true);
  };

  const handleReject = (row: AttendanceType) => {
    setSelectedRow(row);
    setActionType("reject");
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!selectedRow || !actionType) return;

    const payload = {
      id: selectedRow.id,
      status: actionType === "approve" ? 2 : 3,
      approverComments: comment,
      notes: selectedRow.notes ?? "",
      checkInTime: selectedRow.checkInTime ?? "",
      checkOutTime: selectedRow.checkOutTime ?? "",
      workingHours: selectedRow.workingHours ?? "",
      storeId: selectedRow.storeId ?? 0,
    };

    try {
      await updateAttendance(payload).unwrap();
      toast.success(
        actionType === "approve"
          ? "Attendance approved successfully"
          : "Attendance rejected successfully"
      );
      setOpenDialog(false);
      setComment("");
      setSelectedRow(null);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <AttendenceFilterAdmin
        queryParams={queryParams}
        onQueryParamsChange={handleQueryParamsChange}
      />

      <Box>
        {isLoading && <TableSkeleton />}

        <CommonTable<AttendanceType>
          columns={columns}
          rows={rows}
          approval={{
            onConform: (row) => handleApprove(row),
            onReject: (row) => handleReject(row),
          }}
        />
        {attendanceRequestData?.items?.length === 0 && (
          <NoDataCard
            sx={{ height: "100%", minHeight: 100, mt: 2 }}
            text="No Attendance request records "
          />
        )}
      </Box>

      {attendanceRequestData?.metaData && (
        <AppPagination
          metaData={attendanceRequestData?.metaData}
          onPageChange={(page: number) =>
            setQueryParams({ ...queryParams, PageNumber: page })
          }
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {actionType === "approve"
            ? "Approve Attendance"
            : "Reject Attendance"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            multiline
            rows={3}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={actionType === "approve" ? "success" : "error"}
            onClick={handleSubmit}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendanceRequestList;
