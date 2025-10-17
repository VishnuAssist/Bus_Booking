import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface ShiftData {
  shiftId: string;
  note: string;
  date: string;
  clockIn: string;
  clockOut: string;
  duration: string;
}

const ShiftClockMUI: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  //   const [shiftId, setShiftId] = useState("");
  const [note, setNote] = useState("");
  const [clockInTime, setClockInTime] = useState("");
  const [date] = useState(() => new Date().toISOString().slice(0, 10));

  // Timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  // useEffect(() => {
  //   let timer: NodeJS.Timeout | null = null;
  //   if (isRunning) {
  //     timer = setInterval(() => {
  //       setSeconds((prev) => prev + 1);
  //     }, 1000);
  //   } else {
  //     if (timer) clearInterval(timer);
  //   }
  //   return () => {
  //     if (timer) clearInterval(timer);
  //   };
  // }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleClockIn = () => {
    // if (!shiftId) {
    //   alert("Please enter Shift ID first");
    //   return;
    // }
    setClockInTime(new Date().toLocaleTimeString());
    setIsRunning(true);
    setSeconds(0);
  };

  const handleEndShift = () => {
    if (note === "") {
      alert("please enter the note")
    }
    else {
      const clockOut = new Date().toLocaleTimeString();
      const shiftData: ShiftData = {
        shiftId: "1",
        note,
        date,
        clockIn: clockInTime,
        clockOut,
        duration: formatTime(seconds),
      };
      console.log("Shift Data Submitted:", shiftData);

      // Reset
      setIsRunning(false);
      setSeconds(0);
      setClockInTime("");
      setNote("");
    }

  };

  return (
    <Box
      sx={{
        // maxWidth: 400,
        mx: "auto",
        // mt: 4,
        bgcolor: "white",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        textAlign: "center",
        height: "100%"
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shift Clock
      </Typography>

      <Button
        onClick={handleClockIn}
        disabled={isRunning}
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
          >
            End Shift
          </Button>
        </>
      )}
    </Box>
  );
};

export default ShiftClockMUI;
