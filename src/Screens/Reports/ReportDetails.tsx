import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import SystemRostering from "./SystemRostering";
import Rostering from "./Rostering";
// import Attendance from "./Attendance";
// import Achievements from "./Achievements";
import {RuleEngine} from "./RuleEngine";
import ReportsAnalytics from "./ReportsAnalytics";

const ReportDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("systemRostering");

  const renderContent = () => {
    switch (activeTab) {
      case "systemRostering":
        return <SystemRostering />;
      case "rostering":
        return <Rostering />;
    //   case "attendance":
    //     return <Attendance />;
    //   case "achievements":
    //     return <Achievements />;
      case "ruleEngine":
        return <RuleEngine />;
      case "reportsAnalytics":
        return <ReportsAnalytics />;
      default:
        return <SystemRostering />;
    }
  };

  return (
    <Box>
      {/* Button Tabs */}
      <ButtonGroup
        variant="contained"
        fullWidth
        sx={{
          mb: 2,
          flexWrap: "wrap",
          "& button": { flex: 1, minWidth: "150px" },
        }}
      >
        <Button
          onClick={() => setActiveTab("systemRostering")}
          color={activeTab === "systemRostering" ? "primary" : "inherit"}
        >
          System Rostering
        </Button>
        <Button
          onClick={() => setActiveTab("rostering")}
          color={activeTab === "rostering" ? "primary" : "inherit"}
        >
          Rostering
        </Button>
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
          onClick={() => setActiveTab("ruleEngine")}
          color={activeTab === "ruleEngine" ? "primary" : "inherit"}
        >
          Rule Engine
        </Button>
        <Button
          onClick={() => setActiveTab("reportsAnalytics")}
          color={activeTab === "reportsAnalytics" ? "primary" : "inherit"}
        >
          Reports & Analytics
        </Button>
      </ButtonGroup>

      {/* Dynamic Content */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", width: "100%" }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ReportDetails;
