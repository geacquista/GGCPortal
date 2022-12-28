import cross_red from '../../shared/img/close_red.svg'
import cross_white from '../../shared/img/close_white.svg'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {
	selectOrders
} from '../../store/order_slice'
import { render } from 'react-dom';

export const TabType = {
	ACTIVE: 1,
	INACTIVE: 2,
}

const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
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

const InvoiceCard = ({order, color, onClick}) => {
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

const InvoiceDisplayColumn = ({title, orders, cardOnClick}) => {
	return(
		<ul className='OrderDisplayColumn'>
			<li key={title} style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>

			{orders.map((order) => (
				<li><InvoiceCard key={order.referenceNumber} order={order} color='#90E0C9' onClick={cardOnClick} /></li>
			))}
		</ul>
	);	
}

// the only difference bt orders and invoices
const ActiveInvoices = ({orders, cardOnClick}) => {
	return (
		<div id='OrderDisplayColumns'>
			<InvoiceDisplayColumn title='Missing' orders={orders.filter(order => order.invoice === undefined)} cardOnClick={cardOnClick} />
			<InvoiceDisplayColumn title='Unpaid' orders={orders.filter(order => order.invoice !== undefined && !order.invoice.isPaid)} cardOnClick={cardOnClick} />
			<InvoiceDisplayColumn title='Paid' orders={orders.filter(order => order.invoice !== undefined && order.invoice.isPaid)} cardOnClick={cardOnClick} />
		</div>
	)
}

const CompletedInvoices = ({orders, cardOnClick}) => {
	return (
		<div id='OrdersDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<InvoiceDisplayColumn title='Completed' orders={orders} cardOnClick={cardOnClick} />
		</div>
	)
}

const InvoiceView = ({order}) => {
	let recipient
	if(order.isGift){
		recipient = order.giftFor

	} else{
		recipient = order.customer.firstName + ' ' + order.customer.lastName 
	}

	var numberOfLogs = 0
	order.productsOrdered.forEach(product => numberOfLogs++)

	return (
		null
	)
}

const ViewType = {
	ACTIVE_INVOICES: 1,
	COMPLETED_INVOICES: 2,
	ORDER_VIEW: 3,
}

const Invoices = () => {
	var orders = useSelector(selectOrders)
	const [displayText, setDisplayText] = useState("Invoices")
	const [nextId, setNextId] = useState(3)
	const [activeTabId, setActiveTabId] = useState(1)
	const [tabs, setTabs] = useState([
		{
			id: 1,
			text: 'Active Invoices',
			tabType: TabType.ACTIVE,
			viewType: ViewType.ACTIVE_INVOICES,
		},
		{
			id: 2,
			text: 'Completed Invoices',
			tabType: TabType.INACTIVE,
			viewType: ViewType.COMPLETED_INVOICES,
		},

	])

	function addAndOpenInvoiceView(order){
		const tab = tabs.find(tab => (tab.viewType === ViewType.INVOICE_VIEW && order.referenceNumber === tab.order.referenceNumber))
		if(tab === undefined){
			const newTab = {
				id: {nextId},
				text: order.referenceNumber,
				tabType: TabType.ACTIVE,
				viewType: ViewType.INVOICE_VIEW,
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
		case ViewType.ACTIVE_INVOICES:
			displayContent = <ActiveInvoices orders={orders.filter(order => (order.status === 'PLACED' || order.status === 'PROCESSED' || order.status === 'SHIPPED'))} cardOnClick={addAndOpenInvoiceView} />
			break
		case ViewType.COMPLETED_INVOICES:
			displayContent = <CompletedInvoices orders={orders.filter(order => order.status === 'COMPLETED')} cardOnClick={addAndOpenInvoiceView} />
			break
		case ViewType.ORDER_VIEW:
			displayContent = <InvoiceView order={activeContent.order} />
			break
	}


	return(
		<div id='Orders'>	
			<h1>{displayText}</h1>
			<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
				<div className='tabRow'>
					{tabs.map((tab) => (
						<TabButton key={tab.id} id={tab.id} text={tab.text} tabType={tab.tabType} viewType={tab.viewType} onClick={setActiveTab} onDelete={removeOrderView}/>
					))}
				</div>
				<div id='rectangle' style={{height: '13px', width: '1144px', backgroundColor: '#C62032'}} />
				{displayContent}
			</div>
		</div>
	)
}

export default Invoices;