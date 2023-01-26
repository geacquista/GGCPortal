import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerDataService from "../services/CustomerDataService";

/**
 * This is what a customer looks like:
 * // fake data to use prior to DB
  const initialState = [
      {
        customerID: '1',
        firstName: 'Frank',
        lastName: 'McGovern',
        phoneNumber: '20397588636',
        email: 'customer@wpi.edu',
        customerShippingId: null
    
      },
  ]
 */

export const createCustomer = createAsyncThunk(
  "customers/create",
  async ({ firstName, lastName, phoneNumber, email}) => {
    const res = await CustomerDataService.create({firstName, lastName, phoneNumber, email });
    return res.data;
  }
);

export const createCustomerWithAddress = createAsyncThunk(
    "customers/create",
    async ({firstName, lastName, phoneNumber, email, customerShippingId}) => {
      const res = await CustomerDataService.createCustomerWithAddress({ firstName, lastName, phoneNumber, email, customerShippingId });
      return res.data;
    }
  );
  

export const retrieveCustomers = createAsyncThunk(
  "customers/retrieve",
  async () => {
    const res = await CustomerDataService.getAll();
    return res.data;
  }
);

export const retrieveCustomer = createAsyncThunk(
  "customers/readCustomer",
  async ({ id }) => {
    const res = await CustomerDataService.get(id);
    return res.data;
  }
)

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }) => {
    const res = await CustomerDataService.update(id, data);
    return res.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async ({ id }) => {
    await CustomerDataService.remove(id);
    return { id };
  }
);

export const deleteAllCustomers = createAsyncThunk(
  "customers/deleteAll",
  async () => {
    const res = await CustomerDataService.removeAll();
    return res.data;
  }
);


export const customerSlice = createSlice({
  name: 'customers',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [createCustomerWithAddress.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveCustomers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveCustomer.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateCustomer.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllCustomers.fulfilled]: (state, action) => {
      return [];
    },
  },
});

export default customerSlice.reducer;