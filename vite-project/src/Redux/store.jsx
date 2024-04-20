import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import authSlice from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
  },
});