import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderDataService from "../services/OrderDataService";

// do i need to have a status enum up here?

// fake data to use prior to DB
const initialState = [
    {
      id: '1234',
      referenceNumber: '1234',
      invoiceNumber: '',
      status: 'PLACED',
      datePlaced: '2/24/2022',
      revenue: 26.00,
      isSelfOrder: false,
      isGift: true,
      giftFor: 'Mr. Gompei',
      giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
      shipmentTrackingNumber: 'ABCD',
      customer: {
        id: '1',
        email: 'customer@wpi.edu',
        firstName: 'Frank',
        lastName: 'McGovern',
        phoneNumber: '20397588636',
    
      },
      productsOrdered: [{
        id: '1',
        quantity: 3,
        product: {
          id: 'jPL6',
          name: 'plain',
          productDescription: 'A six oz log of plain goat cheese',
        }	
      }],
      shippingAddress: {
        id: '1',
        streetAddress: '86 Brook road',
        city: 'Southwick',
        state: 'NH',
        zipCode: '00675',
      },
      // invoice: {
      //   id: '1',
      //   invoiceNumber: '',
      //   expense: 21.50,
      //   isPaid: false,
      // },
    },
    {
      id: '1235',
      referenceNumber: '1235',
      invoiceNumber: '5678',
      status: 'SHIPPED',
      datePlaced: '2/24/2022',
      revenue: 26.00,
      isSelfOrder: false,
      isGift: true,
      giftFor: 'Mr. Gompei',
      giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
      shipmentTrackingNumber: 'ABCD',
      customer: {
        id: '1',
        email: 'customer@wpi.edu',
        firstName: 'Chad',
        lastName: 'Buttler',
        phoneNumber: '20397588636',
    
      },
      productsOrdered: [{
        id: '1',
        quantity: 3,
        product: {
          id: 'jPL6',
          name: 'plain',
          productDescription: 'A six oz log of plain goat cheese',
        }	
      }],
      shippingAddress: {
        id: '1',
        streetAddress: '86 Brook road',
        city: 'Southwick',
        state: 'NH',
        zipCode: '00675',
      },
      invoice: {
        id: '1',
        invoiceNumber: '5678',
        expense: 21.50,
        isPaid: true,
      },
    },
    {
      id: '1236',
      referenceNumber: '1236',
      invoiceNumber: '5678',
      status: 'PROCESSED',
      datePlaced: '2/24/2022',
      revenue: 26.00,
      isSelfOrder: false,
      isGift: true,
      giftFor: 'Mr. Gompei',
      giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
      shipmentTrackingNumber: 'ABCD',
      customer: {
        id: '1',
        email: 'customer@wpi.edu',
        firstName: 'William',
        lastName: 'Fancyson',
        phoneNumber: '20397588636',
    
      },
      productsOrdered: [{
        id: '1',
        quantity: 3,
        product: {
          id: 'jPL6',
          name: 'plain',
          productDescription: 'A six oz log of plain goat cheese',
        }	
      }],
      shippingAddress: {
        id: '1',
        streetAddress: '86 Brook road',
        city: 'Southwick',
        state: 'NH',
        zipCode: '00675',
      },
      invoice: {
        id: '1',
        invoiceNumber: '5678',
        expense: 21.50,
        isPaid: true,
      },
    },
    {
      id: '1237',
      referenceNumber: '1237',
      invoiceNumber: '5678',
      status: 'PROCESSED',
      datePlaced: '2/24/2022',
      revenue: 26.00,
      isSelfOrder: false,
      isGift: true,
      giftFor: 'Mr. Gompei',
      giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
      shipmentTrackingNumber: 'ABCD',
      customer: {
        id: '1',
        email: 'customer@wpi.edu',
        firstName: 'James',
        lastName: 'Fazzino',
        phoneNumber: '20397588636',
    
      },
      productsOrdered: [{
        id: '1',
        quantity: 3,
        product: {
          id: 'jPL6',
          name: 'plain',
          productDescription: 'A six oz log of plain goat cheese',
        }	
      }],
      shippingAddress: {
        id: '1',
        streetAddress: '86 Brook road',
        city: 'Southwick',
        state: 'NH',
        zipCode: '00675',
      },
      invoice: {
        id: '1',
        invoiceNumber: '5678',
        expense: 21.50,
        isPaid: false,
      },
    },
]


export const createTutorial = createAsyncThunk(
  "orders/create",
  async ({ title, description }) => {
    const res = await OrderDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "orders/retrieve",
  async () => {
    const res = await OrderDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "orders/update",
  async ({ id, data }) => {
    const res = await OrderDataService.update(id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "orders/delete",
  async ({ id }) => {
    await OrderDataService.remove(id);
    return { id };
  }
);

export const deleteAllTutorials = createAsyncThunk(
  "orders/deleteAll",
  async () => {
    const res = await OrderDataService.removeAll();
    return res.data;
  }
);

export const findTutorialsByLastName = createAsyncThunk(
  "orders/findByTitle",
  async ({ lastName }) => {
    const res = await OrderDataService.findByLast(lastName);
    return res.data;
  }
);

export const findTutorialsByReferenceNumber = createAsyncThunk(
  "orders/findByTitle",
  async ({ referenceNumber }) => {
    const res = await OrderDataService.findByReference(referenceNumber);
    return res.data;
  }
);

export const findTutorialsByInvoiceNumber = createAsyncThunk(
  "orders/findByTitle",
  async ({ invoiceNumber }) => {
    const res = await OrderDataService.findByInvoice(invoiceNumber);
    return res.data;
  }
);


export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // deleteOrder: (state,action) => {
    //     // // ...state,
    //     // items: state.items.filter(item => item !== action.payload),
    //     // lastUpdated: Date.now() 
    // },
    // addOrder: (state, action) => {
    //   state.push(action.payload);
    // },
    // editOrder: (state, action) => {
    // },
    // selectOrder: (state) => {
    //     return state
    // }
  },
  extraReducers: {
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
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

export const {deleteOrder, addOrder, editOrder} = orderSlice.actions;

export const selectOrders = (state) => state.orders; 		// Get orders

export default orderSlice.reducer;