/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the state
interface AuthState {
  user: any | null;
  token: string | null;
}

// Set the initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegister: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogin: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setRegister, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
