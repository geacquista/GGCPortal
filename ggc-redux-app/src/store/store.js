import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';

export const store = configureStore({
  reducer: {
    // order reducer -- orderSlice returns the state of orders
    orders: orderSlice,
    // ui: uiSlice.reducer,
    // menu: menuSlice.reducer,
    // edit: editSlice.reducer
  },
});
