import cross_red from '../../assets/img/close_red.svg'
import cross_white from '../../assets/img/close_white.svg'
import add_icon from '../../assets/img/plus_white.svg'
import React, { useState } from 'react'

import ExistingOrder from './Tab_ExistingOrder';
import NewOrder from './Tab_NewOrder';
import ActiveOrdersTab from './Tab_ActiveOrders'
import CompletedOrdersTab from './Tab_CompletedOrders'


export const TabTypeOrder = {
	ACTIVE: 1,
	INACTIVE: 2,
}

const ViewType = {
	ACTIVE_ORDERS: 1,
	COMPLETED_ORDERS: 2,
	EXISTING_ORDER: 3,
	NEW_ORDER: 4
}


export const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
	if(tabType === TabTypeOrder.ACTIVE){
		return(
			<div className='tabRowButtonActive' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === (ViewType.EXISTING_ORDER || ViewType.NEW_ORDER) && <img alt="close" src={cross_white} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	} else if(tabType === TabTypeOrder.INACTIVE){
		return(
			<div className='tabRowButton' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{viewType === (ViewType.EXISTING_ORDER || ViewType.NEW_ORDER) && <img alt="close" src={cross_red} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	}
}

/**
 * 
 * MainOrderPane acts as the Tab container for everything involving orders
 */
const MainOrderPane = () => {
	
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
	function addAndOpenOrderView(order, customer){
		const tab = tabs.find(tab => (tab.viewType === ViewType.EXISTING_ORDER && order.id === tab.order.id))
		
		if(tab === undefined){
			const newTab = {
				id: {nextId},
				text: customer.lastName,
				tabType: TabTypeOrder.ACTIVE,
				viewType: ViewType.EXISTING_ORDER,
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
			viewType: ViewType.NEW_ORDER,
			order: {
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

	let tabDisplayContent
	const activeContent = tabs.find(tab => tab.id === activeTabId)

	switch(activeContent.viewType){
		case ViewType.ACTIVE_ORDERS:
			tabDisplayContent = <ActiveOrdersTab orderCardOnClick={addAndOpenOrderView}/>
			break
		case ViewType.COMPLETED_ORDERS:
			tabDisplayContent = <CompletedOrdersTab orderCardOnClick={addAndOpenOrderView}/>
			break
		case ViewType.EXISTING_ORDER:
			tabDisplayContent = <ExistingOrder order={activeContent.order} orderCardOnClick={addAndOpenOrderView}/>
			break
		case ViewType.NEW_ORDER:
			tabDisplayContent = <NewOrder orderCardOnClick={addAndOpenOrderView}/>
			break
		default:
			// tabDisplayContent = <Logout/>
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
				<div className='tabRow'>
					{tabs.map((tab) => (
						<TabButton key={tab.id} id={tab.id} text={tab.text} tabType={tab.tabType} viewType={tab.viewType} onClick={setActiveTab} onDelete={removeOrderView}/>
					))}
				</div>
				<div id='rectangle' style={{height: '13px', width: '1144px', backgroundColor: '#C62032'}} />
				{tabDisplayContent}
			</div>
		</div>
	)
}

export default MainOrderPane;