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
        status: {
            id: '1',
            //status: 'PLACED',
        },
        customer: {
          id: '1',
        },
        shippingAddress: {
          id: '1',
        },
        referenceNumber: '1234',
        isSelfOrder: false,
      },
    // {
    //   id: '1234',
    //   referenceNumber: '1234',
    //   invoiceNumber: '',
    //   status: 'PLACED',
    //   datePlaced: '2/24/2022',
    //   revenue: 26.00,
    //   isSelfOrder: false,
    //   isGift: true,
    //   giftFor: 'Mr. Gompei',
    //   giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
    //   shipmentTrackingNumber: 'ABCD',
    //   customer: {
    //     id: '1',
    //     email: 'customer@wpi.edu',
    //     firstName: 'Frank',
    //     lastName: 'McGovern',
    //     phoneNumber: '20397588636',
    
    //   },
    //   productsOrdered: [{
    //     id: '1',
    //     quantity: 3,
    //     product: {
    //       id: 'jPL6',
    //       name: 'plain',
    //       productDescription: 'A six oz log of plain goat cheese',
    //     }	
    //   }],
    //   shippingAddress: {
    //     id: '1',
    //     streetAddress: '86 Brook road',
    //     city: 'Southwick',
    //     state: 'NH',
    //     zipCode: '00675',
    //   },
    //   invoice: {
    //     id: '1',
    //     invoiceNumber: '',
    //     expense: 21.50,
    //     isPaid: false,
    //   },
    // },
    // {
    //   id: '1235',
    //   referenceNumber: '1235',
    //   invoiceNumber: '5678',
    //   status: 'SHIPPED',
    //   datePlaced: '2/24/2022',
    //   revenue: 26.00,
    //   isSelfOrder: false,
    //   isGift: true,
    //   giftFor: 'Mr. Gompei',
    //   giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
    //   shipmentTrackingNumber: 'ABCD',
    //   customer: {
    //     id: '1',
    //     email: 'customer@wpi.edu',
    //     firstName: 'Chad',
    //     lastName: 'Buttler',
    //     phoneNumber: '20397588636',
    
    //   },
    //   productsOrdered: [{
    //     id: '1',
    //     quantity: 3,
    //     product: {
    //       id: 'jPL6',
    //       name: 'plain',
    //       productDescription: 'A six oz log of plain goat cheese',
    //     }	
    //   }],
    //   shippingAddress: {
    //     id: '1',
    //     streetAddress: '86 Brook road',
    //     city: 'Southwick',
    //     state: 'NH',
    //     zipCode: '00675',
    //   },
    //   invoice: {
    //     id: '1',
    //     invoiceNumber: '5678',
    //     expense: 21.50,
    //     isPaid: true,
    //   },
    // },
    // {
    //   id: '1236',
    //   referenceNumber: '1236',
    //   invoiceNumber: '5678',
    //   status: 'PROCESSED',
    //   datePlaced: '2/24/2022',
    //   revenue: 26.00,
    //   isSelfOrder: false,
    //   isGift: true,
    //   giftFor: 'Mr. Gompei',
    //   giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
    //   shipmentTrackingNumber: 'ABCD',
    //   customer: {
    //     id: '1',
    //     email: 'customer@wpi.edu',
    //     firstName: 'William',
    //     lastName: 'Fancyson',
    //     phoneNumber: '20397588636',
    
    //   },
    //   productsOrdered: [{
    //     id: '1',
    //     quantity: 3,
    //     product: {
    //       id: 'jPL6',
    //       name: 'plain',
    //       productDescription: 'A six oz log of plain goat cheese',
    //     }	
    //   }],
    //   shippingAddress: {
    //     id: '1',
    //     streetAddress: '86 Brook road',
    //     city: 'Southwick',
    //     state: 'NH',
    //     zipCode: '00675',
    //   },
    //   invoice: {
    //     id: '1',
    //     invoiceNumber: '5678',
    //     expense: 21.50,
    //     isPaid: true,
    //   },
    // },
    // {
    //   id: '1237',
    //   referenceNumber: '1237',
    //   invoiceNumber: '5678',
    //   status: 'PROCESSED',
    //   datePlaced: '2/24/2022',
    //   revenue: 26.00,
    //   isSelfOrder: false,
    //   isGift: true,
    //   giftFor: 'Mr. Gompei',
    //   giftMessage: 'Enjoy this cheese made from other goats! On second thought, maybe not...',
    //   shipmentTrackingNumber: 'ABCD',
    //   customer: {
    //     id: '1',
    //     email: 'customer@wpi.edu',
    //     firstName: 'James',
    //     lastName: 'Fazzino',
    //     phoneNumber: '20397588636',
    
    //   },
    //   productsOrdered: [{
    //     id: '1',
    //     quantity: 3,
    //     product: {
    //       id: 'jPL6',
    //       name: 'plain',
    //       productDescription: 'A six oz log of plain goat cheese',
    //     }	
    //   }],
    //   shippingAddress: {
    //     id: '1',
    //     streetAddress: '86 Brook road',
    //     city: 'Southwick',
    //     state: 'NH',
    //     zipCode: '00675',
    //   },
    //   invoice: {
    //     id: '1',
    //     invoiceNumber: '5678',
    //     expense: 21.50,
    //     isPaid: false,
    //   },
    // },
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

// import {
//     CREATE_ORDER,
//     RETRIEVE_ORDERS,
//     UPDATE_ORDER,
//     DELETE_ORDER,
//     DELETE_ALL_ORDERS,
//   } from "../actions/actionTypes";
  
//   const initialState = [];
  
//   function testOrderReducer(orderTest = initialState, action) {
//     const { type, payload } = action;
  
//     switch (type) {
//       case CREATE_ORDER:
//         return [...orderTest, payload];
  
//       case RETRIEVE_ORDERS:
//         return payload;
  
//       case UPDATE_ORDER:
//         return orders.map((order) => {
//           if (order.id === payload.id) {
//             return {
//               ...order,
//               ...payload,
//             };
//           } else {
//             return tutorial;
//           }
//         });
  
//       case DELETE_ORDER:
//         return orderTest.filter(({ id }) => id !== payload.id);
  
//       case DELETE_ALL_ORDERS:
//         return [];
  
//       default:
//         return orderTest;
//     }
//   };