import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderLineDataService from "../services/OrderLineDataService";

/**
 * This is what a orderline looks like:
 * // fake data to use prior to DB
  const initialState = [
      {
        lineOrderID: '1', //orderid
        lineProductID: '1', //productid
        qtyOrdered: 12 // edit how many
      },
  ]
 */

export const createOrderLine = createAsyncThunk(
  "orderlines/create",
  async ({ lineOrderID, lineProductID, qty}) => {
    const res = await OrderLineDataService.create({lineOrderID, lineProductID, qty});
    return res.data;
  }
);

export const retrieveOrderLines = createAsyncThunk(
  "orderlines/retrieve",
  async () => {
    const res = await OrderLineDataService.getAll();
    return res.data;
  }
);

export const retrieveOrderLine = createAsyncThunk(
  "orderlines/readOrderLine",
  async ({ id }) => {
    const res = await OrderLineDataService.get(id);
    return res.data;
  }
)

export const updateOrderLine = createAsyncThunk(
  "orderlines/update",
  async ({ id, data }) => {
    const res = await OrderLineDataService.update(id, data);
    return res.data;
  }
);

export const deleteOrderLine = createAsyncThunk(
  "orderlines/delete",
  async ({ id }) => {
    await OrderLineDataService.remove(id);
    return { id };
  }
);

export const deleteAllOrderLines = createAsyncThunk(
  "orderlines/deleteAll",
  async () => {
    const res = await OrderLineDataService.removeAll();
    return res.data;
  }
);

export const findOrderLineByOrderID = createAsyncThunk(
    "orderlines/findByOrderID",
    async ({ lineOrderID }) => {
      const res = await OrderLineDataService.findByOrder(lineOrderID);
      return res.data;
    }
  );
  


export const orderlineSlice = createSlice({
  name: 'orderlines',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [createOrderLine.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveOrderLines.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveOrderLine.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateOrderLine.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteOrderLine.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllOrderLines.fulfilled]: (state, action) => {
      return [];
    },
    [findOrderLineByOrderID.fulfilled]: (state, action) => {
        return [...action.payload];
      },
  },
});

export default orderlineSlice.reducer;