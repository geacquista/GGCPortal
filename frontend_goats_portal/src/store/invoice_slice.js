import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import InvoiceDataService from "../services/InvoiceDataService";

/**
 * This is what a invoice looks like:
 * // fake data to use prior to DB
  const initialState = [
      {
        orderID: '1',
        invoiceNumber: '5678',
        revenue: 3.50,
        expense: 21.50,
        isPaid: 1, //true
      },
  ]
 */

// The create thunk is not active because MySQL trigger adds it to the db on creation of the order
// export const createInvoice = createAsyncThunk(
//   "invoices/create",
// );

export const retrieveInvoices = createAsyncThunk(
  "invoices/retrieve",
  async () => {
    const res = await InvoiceDataService.getAll();
    return res.data;
  }
);

export const retrieveInvoice = createAsyncThunk(
  "invoices/readInvoice",
  async ({ id }) => {
    const res = await InvoiceDataService.get(id);
    return res.data;
  }
)

export const updateInvoice = createAsyncThunk(
  "invoices/update",
  async ({ id, data }) => {
    const res = await InvoiceDataService.update(id, data);
    return res.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/delete",
  async ({ id }) => {
    await InvoiceDataService.remove(id);
    return { id };
  }
);

export const deleteAllInvoices = createAsyncThunk(
  "invoices/deleteAll",
  async () => {
    const res = await InvoiceDataService.removeAll();
    return res.data;
  }
);

export const findOrdersByInvoiceNumber = createAsyncThunk(
    "invoices/findByInvoiceNumber",
    async ({ invoiceNumber }) => {
      const res = await InvoiceDataService.findByInvoice(invoiceNumber);
      return res.data;
    }
  );

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    // [createInvoice.fulfilled]: (state, action) => {
    //   state.push(action.payload);
    // },
    [retrieveInvoices.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveInvoice.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateInvoice.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteInvoice.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllInvoices.fulfilled]: (state, action) => {
      return [];
    },
    [findOrdersByInvoiceNumber.fulfilled]: (state, action) => {
        return [...action.payload];
      },
  },
});

export default invoiceSlice.reducer;