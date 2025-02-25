import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import likeSliceReducer from './likeSlice';
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    likeSlice: likeSliceReducer
  },
});

export default store;
