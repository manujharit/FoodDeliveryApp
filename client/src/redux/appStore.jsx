import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '@/redux/locationSlice';
import cartReducer from '@/redux/cartSlice';

const appStore = configureStore({
  reducer: {
    location: locationReducer,
    cart: cartReducer,
  },
});

export default appStore;
