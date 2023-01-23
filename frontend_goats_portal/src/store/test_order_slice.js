import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderDataService from "../services/OrderDataService";

// fake data to use prior to DB
const initialState = [
    {
        id: '1234',
        datePlaced: '2/24/2022',
        isGift: true,
        giftFor: 'Mr. Gompei',
        giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
        shipmentTrackingNumber: 'ABCD',
        orderStatus: 'Placed',
        customerId: '1',
        shippingId: '1',
        referenceNumber: '1234',
        isSelfOrder: false,
      },
]

export const createOrder = createAsyncThunk(
  "orders/create",
  async ({ datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber }) => {
    const res = await OrderDataService.create({ datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber });
    return res.data;
  }
);

export const retrieveOrders = createAsyncThunk(
  "orders/retrieve",
  async () => {
    const res = await OrderDataService.getAll();
    return res.data;
  }
);

export const retrieveOrder = createAsyncThunk(
  "orders/readOrder",
  async ({ id }) => {
    const res = await OrderDataService.get(id);
    return res.data;
  }
)

export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, data }) => {
    const res = await OrderDataService.update(id, data);
    return res.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async ({ id }) => {
    await OrderDataService.remove(id);
    return { id };
  }
);

export const deleteAllOrders = createAsyncThunk(
  "orders/deleteAll",
  async () => {
    const res = await OrderDataService.removeAll();
    return res.data;
  }
);

export const findTutorialsByLastName = createAsyncThunk(
  "orders/findByLastName",
  async ({ lastName }) => {
    const res = await OrderDataService.findByLast(lastName);
    return res.data;
  }
);

export const findTutorialsByReferenceNumber = createAsyncThunk(
  "orders/findByReferenceNumber",
  async ({ referenceNumber }) => {
    const res = await OrderDataService.findByReference(referenceNumber);
    return res.data;
  }
);

export const findTutorialsByInvoiceNumber = createAsyncThunk(
  "orders/findByInvoiceNumber",
  async ({ invoiceNumber }) => {
    const res = await OrderDataService.findByInvoice(invoiceNumber);
    return res.data;
  }
);

export const testOrderSlice = createSlice({
  name: 'orders_test',
  initialState,
  reducers: {
  },
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveOrders.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveOrder.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateOrder.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteOrder.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllOrders.fulfilled]: (state, action) => {
      return [];
    },
    [findTutorialsByLastName.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [findTutorialsByReferenceNumber.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [findTutorialsByInvoiceNumber.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

export default testOrderSlice.reducer;
