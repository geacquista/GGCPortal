import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductDataService from "../services/ProductDataService";

/**
 * This is what a product looks like:
 * // fake data to use prior to DB
  const initialState = [
      {
        sku: 'jPL6',
        name: 'plain',
        description: 'A six oz log of plain goat cheese',
      },
  ]
 */

export const createProduct = createAsyncThunk(
  "products/create",
  async ({ sku, name, description}) => {
    const res = await ProductDataService.create({sku, name, description});
    return res.data;
  }
);

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    return res.data;
  }
);

export const retrieveProduct = createAsyncThunk(
  "products/readProduct",
  async ({ id }) => {
    const res = await ProductDataService.get(id);
    return res.data;
  }
)

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const res = await ProductDataService.update(id, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async ({ id }) => {
    await ProductDataService.remove(id);
    return { id };
  }
);

export const deleteAllProducts = createAsyncThunk(
  "products/deleteAll",
  async () => {
    const res = await ProductDataService.removeAll();
    return res.data;
  }
);

export const findBySKU = createAsyncThunk(
    "products/findBySKU",
    async ({ sku }) => {
      const res = await ProductDataService.findByProduct(sku);
      return res.data;
    }
  );

export const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    // [createProduct.fulfilled]: (state, action) => {
    //   state.push(action.payload);
    // },
    [retrieveProducts.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveProduct.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllProducts.fulfilled]: (state, action) => {
      return [];
    },
    [findBySKU.fulfilled]: (state, action) => {
        return [...action.payload];
      },
  },
});

export default productSlice.reducer;