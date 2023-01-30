import cross_red from '../../assets/img/close_red.svg'
import cross_white from '../../assets/img/close_white.svg'
import add_icon from '../../assets/img/plus_white.svg'
import React, { useState } from 'react'

import { createOrder, retrieveOrders } from '../../store/order_slice'
import OrdersListTEST from './OrdersListTEST';

import Order from './Order';
import OrderAddNew, { AddOrder } from './OrderAddNew';
import { ActiveOrders, CompletedOrders, } from './OrdersList'

export const TabTypeOrder = {
	ACTIVE: 1,
	INACTIVE: 2,
}

const ViewType = {
	ACTIVE_ORDERS: 1,
	COMPLETED_ORDERS: 2,
	ORDER: 3,
	ADD_ORDER: 4
}


export const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
	if(tabType === TabTypeOrder.ACTIVE){
		return(
			<div className='tabRowButtonActive' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === ViewType.ORDER_VIEW && <img src={cross_white} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	} else if(tabType === TabTypeOrder.INACTIVE){
		return(
			<div className='tabRowButton' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === ViewType.ORDER_VIEW && <img src={cross_red} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	}
}


/**
 * 
 * @returns OrderList
 */
const MainOrderView = () => {
	
	// Get the orders from the store
	var orders = retrieveOrders;

	// Set the text
	const [displayText, setDisplayText] = useState("Orders")
	const [nextId, setNextId] = useState(3)
	const [activeTabId, setActiveTabId] = useState(1)

	// Static tabs Active/Complete
	const [tabs, setTabs] = useState([
		{
			id: 1,
			text: 'Active Orders',
			tabType: TabTypeOrder.ACTIVE,
			viewType: ViewType.ACTIVE_ORDERS,
		},
		{
			id: 2,
			text: 'Completed Orders',
			tabType: TabTypeOrder.INACTIVE,
			viewType: ViewType.COMPLETED_ORDERS,
		},
	])

	// Add/open new tab for READ ONLY ORDER VIEW
	function addAndOpenOrderView(order){
		const tab = tabs.find(tab => (tab.viewType === ViewType.ORDER && order.id === tab.order.id))
		if(tab === undefined){
			const newTab = {
				id: {nextId},
				text: order.customer.lastName,
				tabType: TabTypeOrder.ACTIVE,
				viewType: ViewType.ORDER,
				order: order,
			}

			const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
			currentActiveTab.tabType = TabTypeOrder.INACTIVE
			const newTabsList = tabs.slice()
			setTabs([...newTabsList, newTab])
			setActiveTabId(newTab.id)
			setNextId(nextId + 1)

		} else{
			setActiveTab(tab.id)
		}
	}

	// Add new tab for ADD ORDER
	function addNewOrder() {
		const newTab = {
			id: {nextId},
			text: "New Order",
			tabType: TabTypeOrder.ACTIVE,
			viewType: ViewType.ADD_ORDER,
			order: {
				// or should i pass in an order?
			},
		}
		const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
		currentActiveTab.tabType = TabTypeOrder.INACTIVE
		const newTabsList = tabs.slice()
		setTabs([...newTabsList, newTab])
		setActiveTabId(newTab.id)
		setNextId(nextId + 1)
	}

	// Remove tab from bar
	function removeOrderView(id, event){
		if(activeTabId === id){
			const newActiveTab = tabs[tabs.length-2]
			newActiveTab.tabType = TabTypeOrder.ACTIVE
			const newTabsList = tabs.slice().filter(tab => tab.id !== id)
			setTabs(newTabsList)
			setActiveTabId(newActiveTab.id)

		} else{
			setTabs(tabs.filter(tab => tab.id !== id))
		}

		{/*So that the tab does not click when the close button is clicked*/}
		event.stopPropagation()
	}

	// Set active tab - pass in id
	function setActiveTab(id){
		const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
		const newActiveTab = tabs.find(tab => tab.id === id)
		currentActiveTab.tabType = TabTypeOrder.INACTIVE
		newActiveTab.tabType = TabTypeOrder.ACTIVE
		const newTabsList = tabs.slice()
		setTabs(newTabsList)
		setActiveTabId(newActiveTab.id)
	}

	let displayContent
	const activeContent = tabs.find(tab => tab.id === activeTabId)

	switch(activeContent.viewType){
		case ViewType.ACTIVE_ORDERS:
			displayContent = <ActiveOrders />
			break
		case ViewType.COMPLETED_ORDERS:
			displayContent = <CompletedOrders  />
			break
		case ViewType.ORDER:
			displayContent = <Order/>
			break
		case ViewType.ADD_ORDER:
			displayContent = <OrderAddNew/>
			break
	}


	return(
		<div id='Orders'>	
			<div className="OrderTitleButton">
				<h1 className='PageHeader'>{displayText}</h1> 
				<button className='OrderActionButton' onClick={addNewOrder}>
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
				<OrdersListTEST displayContent={displayContent}/>

			</div>
		</div>
	)
}

export default MainOrderView;

// import cross_red from '../../assets/img/close_red.svg'
// import cross_white from '../../assets/img/close_white.svg'
// import add_icon from '../../assets/img/plus_white.svg'
// import React, {Component, useState} from 'react';
// import { createOrder, } from '../../store/order_slice'
// import { connect } from "react-redux";


// export const TabTypeOrder = {
// 	ACTIVE: 1,
// 	INACTIVE: 2,
// }

// const ViewType = {
// 	ACTIVE_ORDERS: 1,
// 	COMPLETED_ORDERS: 2,
// 	ORDER: 3,
// 	ADD_ORDER: 4
// }


// export const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
// 	if(tabType === TabTypeOrder.ACTIVE){
// 		return(
// 			<div className='tabRowButtonActive' onClick={() => onClick(id)}>
// 				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
// 				{viewType === ViewType.ORDER_VIEW && <img src={cross_white} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
// 			</div>
// 		)
// 	} else if(tabType === TabTypeOrder.INACTIVE){
// 		return(
// 			<div className='tabRowButton' onClick={() => onClick(id)}>
// 				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
// 				{viewType === ViewType.ORDER_VIEW && <img src={cross_red} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
// 			</div>
// 		)
// 	}
// }

// const [displayText, setDisplayText] = useState("Orders");
// const [nextId, setNextId] = useState(3)
// const [activeTabId, setActiveTabId] = useState(1)

// // Static tabs Active/Complete
// const [tabs, setTabs] = useState([
//     {
//         id: 1,
//         text: 'Active Orders',
//         tabType: TabTypeOrder.ACTIVE,
//         viewType: ViewType.ACTIVE_ORDERS,
//     },
//     {
//         id: 2,
//         text: 'Completed Orders',
//         tabType: TabTypeOrder.INACTIVE,
//         viewType: ViewType.COMPLETED_ORDERS,
//     },
// ])


// 	// Add/open new tab for READ ONLY ORDER VIEW
// 	function addAndOpenOrderView(order){
// 		const tab = tabs.find(tab => (tab.viewType === ViewType.ORDER && order.id === tab.order.id))
// 		if(tab === undefined){
// 			const newTab = {
// 				id: {nextId},
// 				text: order.customer.lastName,
// 				tabType: TabTypeOrder.ACTIVE,
// 				viewType: ViewType.ORDER,
// 				order: order,
// 			}

// 			const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
// 			currentActiveTab.tabType = TabTypeOrder.INACTIVE
// 			const newTabsList = tabs.slice()
// 			setTabs([...newTabsList, newTab])
// 			setActiveTabId(newTab.id)
// 			setNextId(nextId + 1)

// 		} else{
// 			setActiveTab(tab.id)
// 		}
// 	}

// 	// Add new tab for ADD ORDER
// 	function addNewOrder() {
// 		const newTab = {
// 			id: {nextId},
// 			text: "New Order",
// 			tabType: TabTypeOrder.ACTIVE,
// 			viewType: ViewType.ADD_ORDER,
// 			order: {
// 				// or should i pass in an order?
// 			},
// 		}
// 		const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
// 		currentActiveTab.tabType = TabTypeOrder.INACTIVE
// 		const newTabsList = tabs.slice()
// 		setTabs([...newTabsList, newTab])
// 		setActiveTabId(newTab.id)
// 		setNextId(nextId + 1)
// 	}

// 	// Remove tab from bar
// 	function removeOrderView(id, event){
// 		if(activeTabId === id){
// 			const newActiveTab = tabs[tabs.length-2]
// 			newActiveTab.tabType = TabTypeOrder.ACTIVE
// 			const newTabsList = tabs.slice().filter(tab => tab.id !== id)
// 			setTabs(newTabsList)
// 			setActiveTabId(newActiveTab.id)

// 		} else{
// 			setTabs(tabs.filter(tab => tab.id !== id))
// 		}

// 		{/*So that the tab does not click when the close button is clicked*/}
// 		event.stopPropagation()
// 	}

// 	// Set active tab - pass in id
// 	function setActiveTab(id){
// 		const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
// 		const newActiveTab = tabs.find(tab => tab.id === id)
// 		currentActiveTab.tabType = TabTypeOrder.INACTIVE
// 		newActiveTab.tabType = TabTypeOrder.ACTIVE
// 		const newTabsList = tabs.slice()
// 		setTabs(newTabsList)
// 		setActiveTabId(newActiveTab.id)
// 	}



// class MainOrderView extends Component {

//     render() {
//         return (
//             <div id='Orders'>	
// 				<div className="OrderTitleButton">
// 					<h1 className='PageHeader'>{'Orders'}</h1> 
// 					<button className='OrderActionButton' onClick={createOrder}>
// 						<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
// 						<h4>Add Order</h4>
// 					</button>
// 				</div>
// 				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
// 					{/* here we can call the tab component */}
// 					<div className='tabRow'>
// 						{tabs.map((tab) => (
// 							<TabButton key={tab.id} id={tab.id} text={tab.text} tabType={tab.tabType} viewType={tab.viewType} onClick={setActiveTab} onDelete={removeOrderView}/>
// 						))}
// 					</div>
					
// 					<div id='rectangle' style={{height: '13px', width: '1144px', backgroundColor: '#C62032'}} />
// 					<OrdersListTEST displayContent={displayContent}/>
// 				</div>
// 			</div>
//           );
//     }

// }

// export default MainOrderView;
