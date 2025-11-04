import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useAddEditAttendanceMutation } from "../../../Api/AttendanceApi";
import type { RootState } from "../../../Store/StoreConfig";
import { toast } from "react-toastify";
import { useGetAllStoresQuery } from "../../../Api/StoreApi";
import type { AttendanceType } from "../../../model/attendanceType";

const ShiftClockMUI: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [note, setNote] = useState("");
  const [clockInTime, setClockInTime] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [addEditAttendance, { isLoading }] = useAddEditAttendanceMutation();
  const { data: stores, isLoading: storesLoading } = useGetAllStoresQuery({});

  const { user } = useSelector((state: RootState) => state.auth.account);

  const userId = user?.uid || null;

  console.log("userId", userId);

  // Timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const formatDateToTimeSpan = (date: Date) => {
    const hrs = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");
    const secs = String(date.getSeconds()).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleClockIn = () => {
    if (!selectedStoreId || !userId) {
      toast.error("User or store information is missing. Please log in again.");
      return;
    }
    setClockInTime(formatDateToTimeSpan(new Date()));
    setIsRunning(true);
    setSeconds(0);
  };

  const handleEndShift = async () => {
    if (note === "") {
      toast.error("Please enter a note");
      return;
    }
    if (!selectedStoreId || !userId) {
      toast.error("User or store information is missing. Please log in again.");
      return;
    }

    const clockOut = formatDateToTimeSpan(new Date());
    const shiftData: AttendanceType = {
      checkInTime: clockInTime,
      checkOutTime: clockOut,
      workingHours: formatTime(seconds),
      attendanceStatus: 1,
      status: 1,
      notes: note,
      storeId: selectedStoreId,
      userId,
    };

    console.log("shiftData", shiftData);

    try {
      await addEditAttendance(shiftData).unwrap();
      console.log("Attendance submitted successfully:", shiftData);

      setIsRunning(false);
      setSeconds(0);
      setClockInTime("");
      setNote("");
    } catch (err) {
      console.error("Failed to submit attendance:", err);
      toast.error("Failed to submit attendance. Please try again.");
    }
  };

  return (
    <Card
      sx={{
        mx: "auto",
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shift Clock
      </Typography>

      {/* {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {JSON.stringify(error)}
        </Typography>
      )} */}

      <FormControl
        fullWidth
        size="small"
        disabled={isRunning || storesLoading}
        sx={{ my: 2 }}
      >
        <InputLabel id="store-select-label">Select Store</InputLabel>
        <Select
          labelId="store-select-label"
          value={selectedStoreId || ""}
          label="Select Store"
          onChange={(e) => setSelectedStoreId(Number(e.target.value))}
          size="small"
        >
          {storesLoading && <MenuItem value="">Loading stores...</MenuItem>}
          {stores?.items?.map((store) => (
            <MenuItem key={store.storeId} value={store.storeId ?? ""}>
              {store.name ?? "Unnamed Store"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        onClick={handleClockIn}
        disabled={isRunning || isLoading}
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: isRunning ? 1 : "50%",
          width: isRunning ? 280 : 160,
          height: isRunning ? 120 : 160,
          fontSize: "18px",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          mb: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        {isRunning ? (
          <>
            <Typography variant="caption" sx={{ color: "white" }}>
              Time On
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              {formatTime(seconds)}
            </Typography>
          </>
        ) : (
          "Clock In"
        )}
      </Button>

      {isRunning && (
        <>
          <TextField
            fullWidth
            label="Note"
            variant="outlined"
            size="small"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleEndShift}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "End Shift"}
          </Button>
        </>
      )}
    </Card>
  );
};

export default ShiftClockMUI;
