import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './order_slice';
import statsSlice from './stats_slice';
import userSlice from './user_slice';
import testOrderSlice from "./test_order_slice";

export const store = configureStore({
  reducer: {
    orders: orderSlice,
    quickstats: statsSlice,
    users:userSlice,
    orders_test:testOrderSlice,
  },
  devTools: true,
});
