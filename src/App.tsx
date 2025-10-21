import { CssBaseline } from "@mui/material"
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import routes from "./Router";

import ThemeProvider from './theme/ThemeProvider';
import './styles.css';
function App() {
  const content = useRoutes(routes);


  return (
    <>
      <ThemeProvider>

        <CssBaseline />
        {content}
        <ToastContainer
          theme="colored"
          position="bottom-right"

        />
      </ThemeProvider>
    </>
  )
}

export default App
