import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const newItem = {
        product: action.payload.product,
        price: action.payload.price,
      };
      state.push(newItem);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    remove(state, action) {
      const updatedState = state.filter((item) => item.product.productId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
