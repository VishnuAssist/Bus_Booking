import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface LoginState {
  username: string;
  password: string;
  isAuthenticated: boolean;
  error: string | null;
  role:string;
}

const initialState: LoginState = {
  username: "",
  password: "",
  isAuthenticated: false,
  error: null,
  role:"Admin"
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;

      if (
        action.payload.username === "Admin" &&
        action.payload.password === "Admin@123"
      ) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;
export default loginSlice.reducer;
