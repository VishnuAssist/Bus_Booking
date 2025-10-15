import  { useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignOutButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");
    localStorage.removeItem("email");

    toast.info("Logged out successfully");

    handleCloseDialog();
    navigate("/login");
  };

  return (
    <>
      
      <Tooltip title="Sign Out">
        <IconButton
          onClick={handleOpenDialog}
          color="inherit"
          sx={{
            transition: "all 0.3s ease",
            ml: 2,
            "&:hover": {
              transform: "scale(1.1)",
              color: "error.main",
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>

      
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            pb: 0,
          }}
        >
          Confirm Sign Out
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <Box display="flex" justifyContent="center" mt={2} mb={1}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              alt="Sign Out Illustration"
              style={{ width: 80, height: 80 }}
            />
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Are you sure you want to sign out?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", pb: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="inherit" size="small">
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            variant="contained"
            color="error"
            size="small"
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignOutButton;
