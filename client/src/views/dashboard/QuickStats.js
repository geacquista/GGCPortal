import React from 'react';
import { useSelector } from 'react-redux';

// to do actions add useDispatch

// do i need to sync something here so it updates? or do a fetch?

// import {
// 	selectActiveInvoices,
// 	selectActiveOrders,
// 	selectMissingInvoices,
// 	selectOrdersPlaced,
// 	selectOrdersProcessed,
// 	selectOrdersShipped,
// 	selectUnpaidInvoices
// } from '../../store/stats_slice';

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

const AllQuickStats = () =>{
	return(
		<div id='AllQuickStats' className='Row'>
			<QuickStatsTallRegular amount = {0} label = 'Active Orders' amountColor = '#911D34' />
			<QuickStatsTallRegular amount = {0} label = 'Active Invoices' amountColor = '#911D34' />
			<div id='IndividualStats' className='Column'>
				<div id='OrderStats' className='Row'>
					<QuickStatsShortRegular amount = {0} label = 'Orders Placed' amountColor = '#C62032' />
					<QuickStatsShortRegular amount = {0} label = 'Orders Processed' amountColor = '#C62032' />
					<QuickStatsShortRegular amount = {0} label = 'Orders Shipped' amountColor = '#C62032' />
				</div>
				<div id='InvoiceStats' className='Row'>
					<QuickStatsShortWide amount = {0} label = 'Missing Invoices' amountColor = '#C62032' />
					<QuickStatsShortWide amount = {0} label = 'Unpaid Invoices' amountColor = '#C62032' />
				</div>
			</div>
		</div>
	)
}

export default AllQuickStats