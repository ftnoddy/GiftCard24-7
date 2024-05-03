import { createSlice } from "@reduxjs/toolkit";

const isAuthenticatedLS = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
  userInfo: null,
  isAuthenticated: isAuthenticatedLS,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true"); // Set isAuthenticated flag in local storage
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated"); // Remove isAuthenticated flag from local storage
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
