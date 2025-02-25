import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedProducts: [],
};

const likeSlice = createSlice({
  name: 'likeSlice',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const product = action.payload;
      const existingIndex = state.likedProducts.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        state.likedProducts.splice(existingIndex, 1); // Product remove karega agar already liked hai
      } else {
        state.likedProducts.push(product); // Product add karega agar naye se like kiya gaya ho
      }
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
