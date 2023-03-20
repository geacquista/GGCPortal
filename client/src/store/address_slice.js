

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ShippingAddressDataService from "../services/AddressDataService";

/**
 * This is what an address looks like:
 * // fake data to use prior to DB
  const initialState = [
      {
        id: '1',
        streetAddressOne: '86 Brook road',
        streetAddressTwo: '',
        city: 'Southwick',
        state: 'NH',
        zipCode: '00675',
      },
  ]
 */
export const createShippingAddress = createAsyncThunk(
  "shippingAddresses/create",
  async ({ streetAddress, city, state, zip }) => {
    const res = await ShippingAddressDataService.create({ streetAddress, city, state, zip });
    return res.data;
  }
);

export const retrieveShippingAddresses = createAsyncThunk(
  "shippingAddresses/retrieve",
  async () => {
    const res = await ShippingAddressDataService.getAll();
    return res.data;
  }
);

export const retrieveShippingAddress = createAsyncThunk(
  "shippingAddresses/readShippingAddress",
  async ({ id }) => {
    const res = await ShippingAddressDataService.get(id);
    return res.data;
  }
)

export const updateShippingAddress = createAsyncThunk(
  "shippingAddresses/update",
  async ({ id, data }) => {
    const res = await ShippingAddressDataService.update(id, data);
    return res.data;
  }
);

export const deleteShippingAddress = createAsyncThunk(
  "shippingAddresses/delete",
  async ({ id }) => {
    await ShippingAddressDataService.remove(id);
    return { id };
  }
);

export const deleteAllShippingAddresses = createAsyncThunk(
  "shippingAddresses/deleteAll",
  async () => {
    const res = await ShippingAddressDataService.removeAll();
    return res.data;
  }
);


export const shippingAddressSlice = createSlice({
  name: 'shippingAddresses',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [createShippingAddress.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveShippingAddresses.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveShippingAddress.fulfilled]: (state, action) => {
      return [action.payload];
    },
    [updateShippingAddress.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteShippingAddress.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllShippingAddresses.fulfilled]: (state, action) => {
      return [];
    },
  },
});

export default shippingAddressSlice.reducer;