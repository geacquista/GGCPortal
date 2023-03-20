import React, { Component } from 'react';
import { connect } from "react-redux";

const QuickStatsTallRegular = ({amount, label, amountColor}) => {
	return(
		<button className = 'QuickStatsTallRegular'>
			<h1 style = {{color: amountColor, fontSize: '96px', letterSpacing: '0%', textAlign: 'center'}}>{amount}</h1>
			<br></br>
			<h3 style = {{color: '#252525', letterSpacing: '0%', textAlign: 'center'}}>{label}</h3>
		</button>
	)
}

const QuickStatsShortRegular = ({amount, label, amountColor}) => {
	return(
		<button className = 'QuickStatsShortRegular'>
			<h1 style = {{color: amountColor, fontWeight: 'normal', padding: '0px', margin: '0px', letterSpacing: '0%', textAlign: 'center'}}>{amount}</h1>
			<br></br>
			<h4 style = {{color: '#252525', padding: '0px', margin: '0px', letterSpacing: '0%', textAlign: 'center'}}>{label}</h4>
		</button>
	)
}

const QuickStatsShortWide = ({amount, label, amountColor}) => {
	return(
		<button className = 'QuickStatsShortWide'>
			<h1 style = {{color: amountColor, fontWeight: 'normal', padding: '0px', margin: '0px', letterSpacing: '0%', textAlign: 'center'}}>{amount}</h1>
			<br></br>
			<h4 style = {{color: '#252525', padding: '0px', margin: '0px', letterSpacing: '0%', textAlign: 'center'}}>{label}</h4>
		</button>
	)
}

class AllQuickStats extends Component{


	render() {
		const {orders, invoices} = this.props;

		const currentActiveOrders = orders.filter(order => (order.orderStatus === "Placed" || order.orderStatus === 'Processed' || order.orderStatus === 'Shipped'));		
		const currentActiveInvoices = invoices.filter(invoice => (invoice.invoiceStatus === "Missing") || invoice.invoiceStatus === "Waiting");
	
		const currentOrdersPlaced = orders.filter(order => (order.orderStatus === "Placed"));		
		const currentOrdersProcessed = orders.filter(order => (order.orderStatus === 'Processed'));		
		const currentOrdersShipped = orders.filter(order => (order.orderStatus === 'Shipped'));		
	
		const currentMissingInvoices = invoices.filter(invoice => (invoice.invoiceStatus === "Missing"));
	
		const currentUnpaidInvoices =  invoices.filter(invoice => ( invoice.invoiceStatus === "Unpaid"));
	

	
		return(
			<div id='AllQuickStats' className='Row'>
				<QuickStatsTallRegular amount = {currentActiveOrders.length} label = 'Active Orders' amountColor = '#911D34' />
				<QuickStatsTallRegular amount = {currentActiveInvoices.length} label = 'Active Invoices' amountColor = '#911D34' />
				<div id='IndividualStats' className='Column'>
					<div id='OrderStats' className='Row'>
						<QuickStatsShortRegular amount = {currentOrdersPlaced.length} label = 'Orders Placed' amountColor = '#C62032' />
						<QuickStatsShortRegular amount = {currentOrdersProcessed.length} label = 'Orders Processed' amountColor = '#C62032' />
						<QuickStatsShortRegular amount = {currentOrdersShipped.length} label = 'Orders Shipped' amountColor = '#C62032' />
					</div>
					<div id='InvoiceStats' className='Row'>
						<QuickStatsShortWide amount = {currentMissingInvoices.length} label = 'Missing Invoices' amountColor = '#C62032' />
						<QuickStatsShortWide amount = {currentUnpaidInvoices.length} label = 'Unpaid Invoices' amountColor = '#C62032' />
					</div>
				</div>
			</div>
		);
	}

} 


export default connect()(AllQuickStats);