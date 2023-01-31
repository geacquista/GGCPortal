import { configureStore } from '@reduxjs/toolkit';

import shippingAddressSlice from './address_slice';
import customerSlice from './customer_slice';
import invoiceSlice from './invoice_slice';
import orderSlice from './order_slice';
import orderlineSlice from './orderline_slice';
import productSlice from './product_slice';

// import statsSlice from './stats_slice';
import userSlice from './user_slice';

export const store = configureStore({
  reducer: {
    orders: orderSlice,
    shippingAddresses: shippingAddressSlice,
    customers: customerSlice,
    invoices: invoiceSlice,
    orderline: orderlineSlice,
    products: productSlice,
    // quickstats: statsSlice,
    users:userSlice,
  },
  devTools: true,
});
