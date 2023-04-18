import cross_red from '../../assets/img/close_red.svg'
import cross_white from '../../assets/img/close_white.svg'
import add_icon from '../../assets/img/plus_white.svg'
import React, { Component } from 'react'
import { connect } from "react-redux";

import { retrieveOrders } from '../../store/order_slice'

import ActiveOrdersTab from './Tab_ActiveOrders'
import CompletedOrdersTab from './Tab_CompletedOrders';
import ExistingOrder from './Tab_ExistingOrder';
import NewOrder from './Tab_NewOrder';

import OrderCard from './orderview_components/OrderCard';

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

export const OrderDisplayColumn = ({title, orders, orderCardOnClick, products, customers, invoices, orderline, shippingAddresses}) => {

	return(
		<ul className='OrderDisplayColumn'>
			<li key={title} style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>
			{orders.map((order) => {

				const filteredCustomer = customers.filter(customer => customer.customerID === order.customerId)[0]
				const filteredAddress = shippingAddresses.filter(address => address.shippingID === order.shippingId)[0]
				const filteredInvoice= invoices.filter(invoice => invoice.orderID === order.orderID)[0]
				const filteredLine = orderline.filter(line => line.lineOrderID === order.orderID)

				return (
					
					<li><OrderCard key={order.orderID} order={order} customer={filteredCustomer} address={filteredAddress} invoice={filteredInvoice} orderline={filteredLine} color='#90E0C9' orderCardOnClick={orderCardOnClick}  /></li>
				)})}
		</ul>
	)
}


export const TabButton = ({id, text, tabType, viewType, onClick, onDelete}) => {
	if(tabType === TabTypeOrder.ACTIVE){
		return(
			<div className='tabRowButtonActive' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{(viewType === (ViewType.EXISTING_ORDER )|| (viewType ===ViewType.NEW_ORDER)) && <img alt="close" src={cross_white} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	} else if(tabType === TabTypeOrder.INACTIVE){
		return(
			<div className='tabRowButton' onClick={() => onClick(id)}>
				<h3 style={{fontWeight: 'bold'}}>{text}</h3>
				{(viewType === (ViewType.EXISTING_ORDER )|| (viewType ===ViewType.NEW_ORDER)) && <img alt="close" src={cross_red} style={{paddingLeft: '10px'}} onClick={(event) => onDelete(id, event)}/> }
			</div>
		)
	}
}

/**
 * 
 * MainOrderPane acts as the Tab container for everything involving orders
 */
class MainOrderPane extends Component {
	constructor(props) {
	  	super(props);

	  	this.addAndOpenOrderView = this.addAndOpenOrderView.bind(this);
	 	this.addNewOrder = this.addNewOrder.bind(this);
		this.removeOrderView = this.removeOrderView.bind(this);
		this.setActiveTab = this.setActiveTab.bind(this);
		this.setActiveTabId = this.setActiveTabId.bind(this);
		this.setNextId = this.setNextId.bind(this);
		this.setTabs = this.setTabs.bind(this);

	  this.state = {
		tabs: [
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
		],

		nextId: 3,
		activeTabId: 1,
		};

	}

	// when the component loads
	componentDidMount() {
		// this.props.retrieveOrders();
		// this.props.retrieveProducts();
	}

	 addAndOpenOrderView(data){
		const tab = this.state.tabs.find(tab => (tab.viewType === ViewType.EXISTING_ORDER && data.order.orderID === tab.order.orderID))
		if(tab === undefined){
			const newTab = {
				id: this.state.nextId,
				text: data.lastName,
				tabType: TabTypeOrder.ACTIVE,
				viewType: ViewType.EXISTING_ORDER,
				order: data.order,
			}

			const currentActiveTab = this.state.tabs.find(tab => tab.id === this.state.activeTabId)
			currentActiveTab.tabType = TabTypeOrder.INACTIVE
			const newTabsList = this.state.tabs.slice()
			this.setTabs([...newTabsList, newTab])
			this.setActiveTabId(newTab.id)
			this.setNextId(this.state.nextId + 1)

		} else{
			this.setActiveTab(tab.id)
		}
		
	}

	addNewOrder(order){
		const newTab = {
			id: this.state.nextId,
			text: "New Order",
			tabType: TabTypeOrder.ACTIVE,
			viewType: ViewType.NEW_ORDER,
			order: order,
		}

		const currentActiveTab = this.state.tabs.find(tab => tab.id === this.state.activeTabId)
		currentActiveTab.tabType = TabTypeOrder.INACTIVE
		const newTabsList = this.state.tabs.slice()
		this.setTabs([...newTabsList, newTab])
		this.setActiveTabId(newTab.id)
		this.setNextId(this.state.nextId+1)
		
	}
	

	 removeOrderView(id, event){
		if(this.state.activeTabId === id){
			const newActiveTab = this.state.tabs[1]
			newActiveTab.tabType = TabTypeOrder.ACTIVE
			const newTabsList = this.state.tabs.slice().filter(tab => tab.id !== id)
			this.setTabs(newTabsList)
			this.setActiveTabId(newActiveTab.id)

		} else{
			this.setTabs(this.state.tabs.filter(tab => tab.id !== id))
		}

		event.stopPropagation()
	}

	 setActiveTab(id){
		const currentActiveTab = this.state.tabs.find(tab => tab.id === this.state.activeTabId)
		const newActiveTab = this.state.tabs.find(tab => tab.id === id)
		currentActiveTab.tabType = TabTypeOrder.INACTIVE
		newActiveTab.tabType = TabTypeOrder.ACTIVE
		const newTabsList = this.state.tabs.slice()
		this.setTabs(newTabsList)
		this.setActiveTabId(newActiveTab.id)
	}

	setActiveTabId(id) {
		this.setState({
			activeTabId: id,
		});
	}

	setNextId(id) {
		this.setState({
			nextId: id,
		});
	}
	
	setTabs(tabs) {
		this.setState({
			tabs: tabs
		});
	}

	render() {
		const {orders, customers, shippingAddresses, invoices, orderline, products} = this.props
		let tabDisplayContent
		const activeContent = this.state.tabs.find(tab => tab.id === this.state.activeTabId)
		const currentActiveOrders = orders.filter(order => (order.orderStatus === "Placed" || order.orderStatus === 'Processed' || order.orderStatus === 'Shipped'));		
		const currentCompletedOrders = orders.filter(order => (order.orderStatus === "Complete"));

		switch(activeContent.viewType){
			case ViewType.ACTIVE_ORDERS:
				tabDisplayContent = <ActiveOrdersTab orderCardOnClick={this.addAndOpenOrderView} />
				break
			case ViewType.COMPLETED_ORDERS:
				tabDisplayContent = <CompletedOrdersTab orders={currentCompletedOrders} orderCardOnClick={this.addAndOpenOrderView} products={products} customers={customers} shippingAddresses={shippingAddresses} invoices={invoices} orderline={orderline}/>
				break
			case ViewType.EXISTING_ORDER:
				tabDisplayContent = <ExistingOrder order={activeContent.order} orderCardOnClick={this.addAndOpenOrderView} orderCardOnDelete={this.removeOrderView} activeTabId={this.state.activeTabId} products={products}/>
				break
			case ViewType.NEW_ORDER:
				tabDisplayContent = <NewOrder orderCardOnClick={this.addAndOpenOrderView} products={products}/>
				break
			
		}
		return(
			<div id='Orders' >	
				<div className="OrderTitleButton">
					<h1 className='PageHeader'>Orders</h1> 
					<button className='OrderActionButton' onClick={this.addNewOrder}>
						<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
						<h4>Add Order</h4>
					</button>
				</div>
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<div className='tabRow'>
						{this.state.tabs.map((tab) => (
							<TabButton key={tab.id} id={tab.id} text={tab.text} tabType={tab.tabType} viewType={tab.viewType} onClick={this.setActiveTab} onDelete={this.removeOrderView}/>
						))}
					</div>
					<div id='rectangle' style={{height: '13px', width: '1144px', backgroundColor: '#C62032'}} />
					{tabDisplayContent}
				</div>
			</div>
		);
	}
		
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		invoices: state.invoices,
		orderline: state.orderline,
		products: state.products
	};
  };
  
export default connect(mapStateToProps, {retrieveOrders})(MainOrderPane);