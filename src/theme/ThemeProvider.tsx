import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themeCreator } from "./base";
import * as React from "react";

export const ThemeContext = React.createContext(
  (_themeName: string): void => {}
);

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = (props) => {
  const curThemeName =
    localStorage.getItem("LeaseApptheme") || "GreyGooseTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("LeaseApptheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      {/* <ThemeProvider theme={PureLightTheme}>{props.children}</ThemeProvider> */}
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
