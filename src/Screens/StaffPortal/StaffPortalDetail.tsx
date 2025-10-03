import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import Attendance from "./Attendence/Attendance";
import Achievements from "./Achievements";
import RequestService from "./LeaveRequest";

const StaffPortalDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const renderContent = () => {
    switch (activeTab) {
      case "attendance":
        return <Attendance />;
      case "achievements":
        return <Achievements />;
      case "requestService":
        return <RequestService />;
      default:
        return <Attendance />;
    }
  };

  return (
    <Box >
      {/* Button Tabs */}
      <ButtonGroup variant="contained" fullWidth sx={{ mb: 2, width: "100%" }}>
        <Button
          onClick={() => setActiveTab("attendance")}
          color={activeTab === "attendance" ? "primary" : "inherit"}
        >
          Attendance
        </Button>
        <Button
          onClick={() => setActiveTab("achievements")}
          color={activeTab === "achievements" ? "primary" : "inherit"}
        >
          Achievements
        </Button>
        <Button
          onClick={() => setActiveTab("requestService")}
          color={activeTab === "requestService" ? "primary" : "inherit"}
        >
          Request & Service
        </Button>
      </ButtonGroup>

      {/* Dynamic Content */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px",width:"100%" }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default StaffPortalDetail;
