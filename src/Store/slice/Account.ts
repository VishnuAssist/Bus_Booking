import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  email: string;
  firstName: string;
  roles?: string[] | string;
  roleIds?: string[] | string;
  
  uid:string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  sessionExpired: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,

  sessionExpired: false,
};

const accountSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addTokensAndUser: (state, { payload }) => {
      state.accessToken = payload.token;
      state.refreshToken = payload.refreshToken;
      const [, payloadBase64] = payload.token.split(".");

      // state.user = JSON.parse(atob(payloadBase64))?JSON.parse(atob(payloadBase64)):null;
      // state.sessionExpired = false;
      const decoded = JSON.parse(atob(payloadBase64));
      state.user = {
        id: decoded.uid,
        email: decoded.email,
        firstName:
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        
        uid: decoded.uid,
      };
      state.sessionExpired = false;
    },
    removeTokensAndUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setSessionExpired: (state, { payload }) => {
      state.sessionExpired = payload;
    },
  },
});

export const { addTokensAndUser, removeTokensAndUser, setSessionExpired } =
  accountSlice.actions;

export default accountSlice.reducer;
