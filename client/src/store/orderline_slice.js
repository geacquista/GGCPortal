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
  "orderline/create",
  async ({ lineOrderID, lineProductID, qtyOrdered}) => {
    const res = await OrderLineDataService.create({lineOrderID, lineProductID, qtyOrdered});
    return res.data;
  }
);

export const retrieveOrderLines = createAsyncThunk(
  "orderline/retrieve",
  async () => {
    const res = await OrderLineDataService.getAll();
    return res.data;
  }
);

export const retrieveOrderLine = createAsyncThunk(
  "orderline/readOrderLine",
  async ({ id }) => {
    const res = await OrderLineDataService.get(id);
    return res.data;
  }
)

export const updateOrderLine = createAsyncThunk(
  "orderline/update",
  async ({ id, data }) => {
    const res = await OrderLineDataService.update(id, data);
    return res.data;
  }
);

export const deleteOrderLine = createAsyncThunk(
  "orderline/delete",
  async ({ id }) => {
    console.log(id)
    await OrderLineDataService.remove(id);
    return { id };
  }
);

export const deleteAllOrderLines = createAsyncThunk(
  "orderline/deleteAll",
  async () => {
    const res = await OrderLineDataService.removeAll();
    return res.data;
  }
);

export const findOrderLineByOrderID = createAsyncThunk(
    "orderline/findByOrderID",
    async ({ id }) => {
      console.log(id)
      const res = await OrderLineDataService.findByOrder(id);
      return res.data;
    }
  );
  
export const orderlineSlice = createSlice({
  name: 'orderline',
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