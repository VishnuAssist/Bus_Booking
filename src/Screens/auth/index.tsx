import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../Api/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTokensAndUser } from "../../Store/slice/Account";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userlogin] = useLoginMutation();

  const [username, setUsername] = useState("superadmin");
  const [password, setPassword] = useState("123Pa$$word!");
  const [_isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  

  const handleLogin = async () => {
    try {
      const payLoad = { username, password };
      const res = await userlogin(payLoad).unwrap();
      console.log("token",res)
      if (res?.status === 401) {
        toast.error("Check the username or password");
        return;
      }

      if (res) {
        
        // localStorage.setItem("user", JSON.stringify(res));
        // localStorage.setItem("email", res.email ?? "");
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("refreshToken", res.refreshToken);
        // localStorage.setItem("refreshTokenExpiryTime", res.refreshTokenExpiryTime);
        
        dispatch(addTokensAndUser(res));

        toast.success("Login successful!");
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/dashboards/Dashboard");
        }, 200);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url("/image/commission.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 350,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
