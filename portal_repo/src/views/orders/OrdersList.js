import cross_red from '../../shared/img/close_red.svg'
import cross_white from '../../shared/img/close_white.svg'
import add_icon from '../../shared/img/plus_white.svg'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import orderSlice, {
	addOrder, deleteOrder, getOrders, selectOrders
} from '../../store/order_slice'
import ReactDOM from 'react-dom'
import {OrderView, OrderViewEdit} from './OrderViewOnly';
// import { ViewType } from '../tabs/Tab';


// ORDERS LIST -- Layout of the ACTIVE/COMPLETE ORDERS

export const TabType = {
	ACTIVE: 1,
	INACTIVE: 2,
}

const ViewType = {
	ACTIVE_ORDERS: 1,
	COMPLETED_ORDERS: 2,
	ORDER_VIEW: 3,
    ACTIVE_INVOICES: 4,
	COMPLETED_INVOICES: 5,
    INVOICE_VIEW:6,
}


export const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
	if(tabType === TabType.ACTIVE){
		return(
			<div className='tabRowButtonActive' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === ViewType.ORDER_VIEW && <img src={cross_white} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	} else if(tabType === TabType.INACTIVE){
		return(
			<div className='tabRowButton' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === ViewType.ORDER_VIEW && <img src={cross_red} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	}
}

// Cards are part of the list
const OrderCard = ({order, color, onClick}) => {
	var numberOfLogs = 0
	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

	return(
		<div className='OrderCard' onClick={() => onClick(order)}>
			<div className='OrderCardHeader' style={{backgroundColor: color}}>
				<h4 style={{fontWeight: 'bold'}}>{order.customer.lastName}, {order.customer.firstName}</h4>
			</div>
			<div className='OrderCardContent'>
				<h4>Reference: {order.referenceNumber}</h4>
				<h4>Invoice: {(order.invoiceNumber === undefined) ? 'NA' : order.invoiceNumber}</h4>
				<h4>Logs Ordered: {numberOfLogs}</h4>
			</div>
		</div>
	)
}

// Columns are part of the list
const OrderDisplayColumn = ({title, orders, orderCardOnClick}) => {
	return(
		<ul className='OrderDisplayColumn'>
			<li key={title} style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>

			{orders.map((order) => (
				<li><OrderCard key={order.referenceNumber} order={order} color='#90E0C9' onClick={orderCardOnClick} /></li>
			))}
		</ul>
	)
}

// Active Orders Tab
const ActiveOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn title='Placed' orders={orders.filter(order => order.status === 'PLACED')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Processed' orders={orders.filter(order => order.status === 'PROCESSED')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Shipped' orders={orders.filter(order => order.status === 'SHIPPED')} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

// Completed Orders Tab
const CompletedOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}


// call a setup tabs thing here?
// get order actions here


// RETURNING ORDERS FROM ORDERSLIST -- change export to ListOfOrders?
const Orders = ({updateOrder, deleteOrder, addOrder, getOrders}) => {
	
	// get the orders
	var orders = useSelector(selectOrders)

	// set the text
	const [displayText, setDisplayText] = useState("Orders")
	const [nextId, setNextId] = useState(3)
	const [activeTabId, setActiveTabId] = useState(1)
	const [tabs, setTabs] = useState([
		{
			id: 1,
			text: 'Active Orders',
			tabType: TabType.ACTIVE,
			viewType: ViewType.ACTIVE_ORDERS,
		},
		{
			id: 2,
			text: 'Completed Orders',
			tabType: TabType.INACTIVE,
			viewType: ViewType.COMPLETED_ORDERS,
		},

	])

	function addAndOpenOrderView(order){
		const tab = tabs.find(tab => (tab.viewType === ViewType.ORDER_VIEW && order.id === tab.order.id))
		if(tab === undefined){
			const newTab = {
				id: {nextId},
				text: order.customer.lastName,
				tabType: TabType.ACTIVE,
				viewType: ViewType.ORDER_VIEW,
				order: order,
			}

			const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
			currentActiveTab.tabType = TabType.INACTIVE
			const newTabsList = tabs.slice()
			setTabs([...newTabsList, newTab])
			setActiveTabId(newTab.id)
			setNextId(nextId + 1)

		} else{
			setActiveTab(tab.id)
		}
		
	}

	function removeOrderView(id, event){
		if(activeTabId === id){
			const newActiveTab = tabs[tabs.length-2]
			newActiveTab.tabType = TabType.ACTIVE
			const newTabsList = tabs.slice().filter(tab => tab.id !== id)
			setTabs(newTabsList)
			setActiveTabId(newActiveTab.id)

		} else{
			setTabs(tabs.filter(tab => tab.id !== id))
		}

		{/*So that the tab does not click when the close button is clicked*/}
		event.stopPropagation()
	}

	function setActiveTab(id){
		const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
		const newActiveTab = tabs.find(tab => tab.id === id)
		currentActiveTab.tabType = TabType.INACTIVE
		newActiveTab.tabType = TabType.ACTIVE
		const newTabsList = tabs.slice()
		setTabs(newTabsList)
		setActiveTabId(newActiveTab.id)
	}

	let displayContent
	const activeContent = tabs.find(tab => tab.id === activeTabId)

	switch(activeContent.viewType){
		case ViewType.ACTIVE_ORDERS:
			displayContent = <ActiveOrders orders={orders.filter(order => (order.status === 'PLACED' || order.status === 'PROCESSED' || order.status === 'SHIPPED'))} orderCardOnClick={addAndOpenOrderView} />
			break
		case ViewType.COMPLETED_ORDERS:
			displayContent = <CompletedOrders orders={orders.filter(order => order.status === 'COMPLETED')} orderCardOnClick={addAndOpenOrderView} />
			break
		case ViewType.ORDER_VIEW:
			displayContent = <OrderView order={activeContent.order} editOrder={updateOrder} deleteOrder={deleteOrder} />
			break
	}


	return(
		<div id='Orders'>	
			<div className="OrderTitleButton">
				<h1 className='PageHeader'>{displayText}</h1> 
				<button className='OrderActionButton' onClick={addOrder}>
					<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
					<h4>Add Order</h4>
				</button>
			</div>
			<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
				{/* here we can call the tab component */}
				<div className='tabRow'>
					{tabs.map((tab) => (
						<TabButton key={tab.id} id={tab.id} text={tab.text} tabType={tab.tabType} viewType={tab.viewType} onClick={setActiveTab} onDelete={removeOrderView}/>
					))}
				</div>
				<div id='rectangle' style={{height: '13px', width: '1144px', backgroundColor: '#C62032'}} />
				{displayContent} {/*THIS IS THE ACTIVE/COMPLETE/ */}
			</div>
		</div>
	)
}

export default Orders;