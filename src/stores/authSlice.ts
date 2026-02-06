// src/stores/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  email_verified?: boolean;
  photo_url?: string
  otp_enabled?: boolean
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: AuthUser | null } & Partial<AuthTokens>>
    ) => {

      const { user, access_token, refresh_token } = action.payload;

      if (user !== undefined) {
        state.user = user;
      }

      if (access_token) {
        state.accessToken = access_token;
        localStorage.setItem("access_token", access_token);
      }

      if (refresh_token) {
        state.refreshToken = refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken);

export default authSlice.reducer;
