import { useState, useEffect, useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../../../../theme/ThemeProvider";

function Modechanger() {
  const [mode, setMode] = useState(true);
  const setTheme = useContext(ThemeContext);
  

  useEffect(() => {
    const storedTheme = localStorage.getItem("LeaseApptheme");
    if (storedTheme === "GreyGooseTheme") {
      setMode(false);
    }
  }, []);

  const handleModeChange = () => {
    const newMode = !mode;
    setMode(newMode);

    if (newMode) {
      localStorage.setItem("LeaseApptheme", "NebulaFighterTheme");
      setTheme("NebulaFighterTheme");
    } else {
      localStorage.setItem("LeaseApptheme", "GreyGooseTheme");
      setTheme("GreyGooseTheme");
    }
  };

  return (
    <Tooltip title={mode ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton
        onClick={handleModeChange}
        color="inherit"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(20deg)",
          },
        }}
      >
        {mode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default Modechanger;
