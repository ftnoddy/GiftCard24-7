import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      console.log(action);
      state.push({product: action.payload.product, price: action.payload.price});
      console.log(state);
    },
    remove(state, action) {
      return state.filter((item) => item.product.productId !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;