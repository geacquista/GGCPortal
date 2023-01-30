// import { createSlice } from '@reduxjs/toolkit';


// // fetch the orders to update createAsyncThunk, ?

// // Declaring the initial state to define the structure
// const initialState = {
//   // actually, get initial state from the database
//   activeOrders: 0,
//   activeInvoices: 0,
//   ordersPlaced: 0,
//   ordersProcessed: 0,
//   ordersShipped: 0,
//   missingInvoices: 0,
//   unpaidInvoices: 0,

//   // here, for the purposes of this as a state, do i need to have inactiveOrders??
//   // should i use a flag in the order slice to use the counters
//   // or keep this slice

// };

// // Creating a slice of the quickstats data defines the state and actions on that data
// export const quickStats = createSlice({
//   name: 'quickstats',
//   initialState,
//   reducers: {

// 	//INSTEAD WE JUST FETCH FROM THE DB
// 	// // Called by order -- iif(currentOrder.status === 'PLACED')
// 	// addActiveOrder: (data) => {
// 	// 	data.activeOrders += 1;
// 	// },
// 	// // or should subActiveOrder be set inactive?
// 	// subActiveOrder: (data) => {
// 	// 	data.activeOrders -= 1;
// 	// },

// 	// // Called by order -- if !order.invoice.isPaid
// 	// addActiveInvoice: (data) => {
// 	// 	data.activeInvoices += 1;
// 	// },
// 	// // or should subActiveInvoice be +1 inactive invoice?
// 	// subActiveInvoice: (data) => {
// 	// 	data.activeInvoices -= 1;
// 	// },

// 	// // Called by order -- if(currentOrder.status === 'PLACED')
// 	// addOrderPlaced: (data) => {
// 	// 	data.ordersPlaced += 1;
// 	// },
// 	// subOrderPlaced: (data) => {
// 	// 	data.ordersPlaced -= 1;
// 	// },

// 	// // Called by order -- if !order.invoice.isPaid
// 	// addOrderProcessed: (data) => {
// 	// 	data.ordersProcessed += 1;
// 	// },
// 	// subOrderProcessed: (data) => {
// 	// 	data.ordersProcessed -= 1;
// 	// },
	
// 	// // Called by order -- if !order.invoice.isPaid
// 	// addOrderShipped: (data) => {
// 	// 	data.ordersShipped += 1;
// 	// },
// 	// subOrderShipped: (data) => {
// 	// 	data.ordersShipped -= 1;
// 	// },

// 	// // Called by order -- if order.invoice === null
// 	// addMissingInvoice: (data) => {
// 	// 	data.missingInvoices += 1;
// 	// },
// 	// subMissingInvoice: (data) => {
// 	// 	data.missingInvoices -= 1;
// 	// },

// 	// // Called by order -- if !order.invoice.isPaid
// 	// addUnpaidInvoice: (data) => {
// 	// 	data.unpaidInvoices += 1;
// 	// },
// 	// subUnpaidInvoice: (data) => {
// 	// 	data.unpaidInvoices -= 1;
// 	// },
//   },
// });

// // exporting the actions that can be called elsewhere
// // export const { increment, decrement, incrementByAmount } = quickStats.actions;

// // This is how we get the value from the store.
// export const selectActiveOrders = (state) => state.quickstats.activeOrders; 		// Get active orders
// export const selectActiveInvoices = (state) => state.quickstats.activeInvoices;		// Active invoices
// export const selectOrdersPlaced = (state) => state.quickstats.ordersPlaced;			// Get orders placed
// export const selectOrdersProcessed = (state) => state.quickstats.ordersProcessed;	// Get orders processed
// export const selectOrdersShipped = (state) => state.quickstats.ordersShipped;		// Get orders shipped
// export const selectMissingInvoices = (state) => state.quickstats.missingInvoices;	// Get missing invoices
// export const selectUnpaidInvoices = (state) => state.quickstats.unpaidInvoices;		// Get unpaid invoices


// // Exporting the reducer to be configured in ./store.js
// export default quickStats.reducer;

// // const getQuickStatsData = () => {
// 		//where API code could go
// 	// 	var data = {
// 	// 		activeOrders: 0,
// 	// 		activeInvoices: 0,
// 	// 		ordersPlaced: 0,
// 	// 		ordersProcessed: 0,
// 	// 		ordersShipped: 0,
// 	// 		missingInvoices: 0,
// 	// 		unpaidInvoices: 0,
// 	// 	}

// 	// 	for(var i = 0; i < orders.length; i++){
// 	// 		var currentOrder = orders[i];
// 	// 		if(currentOrder.status === 'PLACED'){
// 	// 			data.ordersPlaced++
// 	// 			data.activeOrders++

// 	// 		} else if(currentOrder.status === 'PROCESSED'){
// 	// 			data.ordersProcessed++
// 	// 			data.activeOrders++

// 	// 		} else if(currentOrder.status === 'SHIPPED'){
// 	// 			data.ordersShipped++
// 	// 			data.activeOrders++
// 	// 		} 

// 	// 		if(currentOrder.invoice === null){
// 	// 			data.missingInvoices++

// 	// 		} else if(!currentOrder.invoice.isPaid){
// 	// 			data.unpaidInvoices++
					
// 	// 		}
// 	// 	}

// 	// 	return data
// 	// }
