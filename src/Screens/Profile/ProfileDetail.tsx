import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import Overview from "./Overview";
import Performance from "./Performance";
import Achievements from "./Achievements";
import Settings from "./Settings";



const ProfileDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "performance":
        return <Performance />;
      case "achievements":
        return <Achievements />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <Box>
      {/* Button Tabs */}
      <ButtonGroup variant="contained" fullWidth sx={{ mb: 2 ,width:"100%"}}>
        <Button
          onClick={() => setActiveTab("overview")}
          color={activeTab === "overview" ? "primary" : "inherit"}
        >
          Overview
        </Button>
        <Button
          onClick={() => setActiveTab("performance")}
          color={activeTab === "performance" ? "primary" : "inherit"}
        >
          Performance
        </Button>
        <Button
          onClick={() => setActiveTab("achievements")}
          color={activeTab === "achievements" ? "primary" : "inherit"}
        >
          Achievements
        </Button>
        <Button
          onClick={() => setActiveTab("settings")}
          color={activeTab === "settings" ? "primary" : "inherit"}
        >
          Settings
        </Button>
      </ButtonGroup>

      {/* Dynamic Content */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ProfileDetail;
