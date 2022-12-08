import cross_red from '../../shared/img/close_red.svg'
import cross_white from '../../shared/img/close_white.svg'

import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';

export const TabType = {
	ACTIVE: 1,
	INACTIVE: 2,
}

export const ViewType = {
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

// -------------------

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

export function addAndOpenOrderView(order){
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

export function removeOrderView(id, event){
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

export function setActiveTab(id){
    const currentActiveTab = tabs.find(tab => tab.id === activeTabId)
    const newActiveTab = tabs.find(tab => tab.id === id)
    currentActiveTab.tabType = TabType.INACTIVE
    newActiveTab.tabType = TabType.ACTIVE
    const newTabsList = tabs.slice()
    setTabs(newTabsList)
    setActiveTabId(newActiveTab.id)
}
