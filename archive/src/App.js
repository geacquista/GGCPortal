import logo from './components/img/ggc_logo.png';
import './App.css';
import NavBar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Invoices from './components/Invoices';
import { useState } from 'react'

export const DisplayContent = {
	DASHBOARD: 1,
	ORDERS: 2,
	INVOICES: 3,
	ORDER_SEARCH: 4,
	HELP: 5,
	LOGOUT: 6,
}

const UserStatus = {
	GGC: 1,
	FARM: 2,
	LOGGED_OUT: 3,
	ADMIN: 4,
}

const App = ({}) => {
	//For local demo
	// this is where SQL comes in
	const [orders, setOrders] = useState([
		{
			id: '1234',
			referenceNumber: '1234',
			invoiceNumber: '5678',
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
			invoice: {
				id: '1',
				invoiceNumber: '5678',
				expense: 21.50,
				isPaid: true,
			},
		},
		{
			id: '1235',
			referenceNumber: '1235',
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
				isPaid: false,
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
				isPaid: false,
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

	])

	const [displayContent, setDisplayContent] = useState(DisplayContent.DASHBOARD)
	const [userStatus, setUserStatus] = useState(DisplayContent.GGC)

	const updateOrder = (order) => {
		//where API code could go
		var newList = orders.filter(o => o.id !== order.id) 
		setOrders([...newList, order])
	}

	const deleteOrder = (order) => {
		//where API code could go
		setOrders(orders.filter(o => o.id !== order.id))
	}

	const addOrder = (order) => {
		//where API code could go
		setOrders([...orders, order])
	}

	const getQuickStatsData = () => {
		//where API code could go
		var data = {
			activeOrders: 0,
			activeInvoices: 0,
			ordersPlaced: 0,
			ordersProcessed: 0,
			ordersShipped: 0,
			missingInvoices: 0,
			unpaidInvoices: 0,
		}

		for(var i = 0; i < orders.length; i++){
			var currentOrder = orders[i];
			if(currentOrder.status === 'PLACED'){
				data.ordersPlaced++
				data.activeOrders++

			} else if(currentOrder.status === 'PROCESSED'){
				data.ordersProcessed++
				data.activeOrders++

			} else if(currentOrder.status === 'SHIPPED'){
				data.ordersShipped++
				data.activeOrders++
			} 

			if(currentOrder.invoice === null){
				data.missingInvoices++

			} else if(!currentOrder.invoice.isPaid){
				data.unpaidInvoices++
					
			}
		}

		return data
	}

	const getOrders = () => {
		//where API code could go
		return orders;
	}

	return (
		<div className="App">
			<header className='App-header'>
				<NavBar activeButton={displayContent} buttonOnClick={setDisplayContent}/>
				{displayContent == DisplayContent.DASHBOARD && <Dashboard setDisplayContent={setDisplayContent} getQuickStatsData={getQuickStatsData}/>}
				{displayContent == DisplayContent.ORDERS && <Orders updateOrder={updateOrder} deleteOrder={deleteOrder} addOrder={addOrder} getOrders={getOrders}/>}
				{displayContent == DisplayContent.INVOICES && <Invoices updateOrder={updateOrder} deleteOrder={deleteOrder} getOrders={getOrders}/>}
				{displayContent == DisplayContent.ORDER_SEARCH && <Dashboard setDisplayContent={setDisplayContent} getQuickStatsData={getQuickStatsData}/>}
				{displayContent == DisplayContent.HELP && <Dashboard setDisplayContent={setDisplayContent} getQuickStatsData={getQuickStatsData}/>}
				{displayContent == DisplayContent.LOGOUT && <Dashboard setDisplayContent={setDisplayContent} getQuickStatsData={getQuickStatsData}/>}
			</header>
		</div>
	)
}

export default App;
