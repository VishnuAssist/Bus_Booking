// import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// import { AuthContext } from "../../../../context/AuthProvider"; // adjust path as needed

function SignOutButton() {
//   const { signOut } = useContext(AuthContext); // assuming you have AuthContext for login/logout handling

//   const handleSignOut = () => {
//     // Clear any saved tokens or user data
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("LeaseApptheme"); // optional if you want to reset theme too

//     // Trigger your sign out logic (redirect, API call, etc.)
//     if (signOut) {
//       signOut();
//     } else {
//       window.location.href = "/login"; // fallback redirect
//     }
//   };

  return (
    <Tooltip title="Sign Out">
      <IconButton
        // onClick={handleSignOut}
        color="inherit"
        sx={{
          transition: "all 0.3s ease",ml:2,
          "&:hover": {
            transform: "scale(1.1)",
            color: "error.main"
          },
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}

export default SignOutButton;
