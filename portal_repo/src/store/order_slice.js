import { createSlice } from '@reduxjs/toolkit';

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


// const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     food: [],
//     drink: [],
//     filteredFood: [],
//     filteredDrink: [],
//     todayMenu: [],
//     randomChoiceMenu: {},
//     isRandomChoose: false,
//     isLoading: false,
//     isFiltering: false,
//     initialized: false
//   },
//   reducers: {
//     setFood(state, action) {
//       state.food = action.payload;
//       state.filteredFood = action.payload;
//       state.initialized = true;
//     },
//     setDrink(state, action) {
//       state.drink = action.payload;
//       state.filteredDrink = action.payload;
//       state.initialized = true;
//     },
//     setFilter(state, action) {
//       const filterText = action.payload;
//       if(filterText===""){
//         state.filteredFood = state.food;
//         state.filteredDrink = state.drink;
//         state.isFiltering = false;
//         return
//       }
//       state.filteredFood = state.food.filter( f => f.name.toLowerCase().includes(filterText));
//       state.filteredDrink = state.drink.filter( d => d.name.toLowerCase().includes(filterText));
//       state.isFiltering = true;
//     },
//     setReset(state, action) {
//       state.filteredFood = state.food;
//       state.filteredDrink = state.drink;
//       state.isFiltering = false;
//     },
//     setTodayMenu(state, action) {
//       state.todayMenu = action.payload;
//     },
//     setIsLoading(state) {
//       state.isLoading = true
//     },
//     setLoadingComplete(state) {
//         state.isLoading = false
//     },
//     setRandomChoice(state, action) {
//       state.randomChoiceMenu = action.payload;
//       state.isRandomChoose = true;
//     },
//     setDisableRandomChoose(state) {
//       state.isRandomChoose = false;
//     },
//   },
// });



export const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    // deleteOrder: (state,action) => {
    //     // // ...state,
    //     // items: state.items.filter(item => item !== action.payload),
    //     // lastUpdated: Date.now() 
    // },
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    // editOrder: (state, action) => {
    // },
    // selectOrder: (state) => {
    //     return state
    // }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
    
  // },
  /*
  reducers: {
        setLogin(state, action) {
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", action.payload.userName);
            state.isLogin = true;
        },
        setLogout(state, action) {
            state.token = "";
            state.userName = "";
            localStorage.removeItem("token")
            localStorage.removeItem("user");
            state.isLogin = false;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setIsError(state, action) {
            state.isError = action.payload;
        },
        setErrorMsg(state, action) {
            state.errorMsg = action.payload;
        },
        setSnackMsg(state, action) {
            state.snackMsg = action.payload;
        },
    },
  */
});

export const {deleteOrder, addOrder, editOrder} = orderSlice.actions;

export const selectOrders = (state) => state.orders; 		// Get orders

export default orderSlice.reducer;