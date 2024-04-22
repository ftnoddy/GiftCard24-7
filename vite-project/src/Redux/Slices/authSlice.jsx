import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    name: null,
    // Add other user info fields as needed
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Update localStorage accordingly
    },
    logout: (state) => {
      state.userInfo = initialState.userInfo;
      // Clear localStorage accordingly
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
