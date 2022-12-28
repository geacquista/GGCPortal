import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './order_slice';
import statsSlice from './stats_slice';
import userSlice from './user_slice';

export const store = configureStore({
  reducer: {
    // order reducer -- orderSlice returns the state of orders
    orders: orderSlice,
    quickstats: statsSlice,
    users:userSlice
    // ui: uiSlice.reducer,
    // menu: menuSlice.reducer,
    // edit: editSlice.reducer
  },
});
