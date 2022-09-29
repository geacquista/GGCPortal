const QuickStatsTallRegular = ({amount, label, amountColor}) => {
	return(
		<button className = 'QuickStatsTallRegular'>
			<text style = {{color: amountColor, fontSize: '96px', letterSpacing: '0%', textAlign: 'center'}}>{amount}</text>
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

const AllQuickStats = ({getQuickStatsData}) =>{
	var data = getQuickStatsData()

	return(
		<div id='AllQuickStats' className='Row'>
			<QuickStatsTallRegular amount = {data.activeOrders} label = 'Active Orders' amountColor = '#911D34' />
			<QuickStatsTallRegular amount = {data.activeInvoices} label = 'Active Invoices' amountColor = '#911D34' />
			<div id='IndividualStats' className='Column'>
				<div id='OrderStats' className='Row'>
					<QuickStatsShortRegular amount = {data.ordersPlaced} label = 'Orders Placed' amountColor = '#C62032' />
					<QuickStatsShortRegular amount = {data.ordersProcessed} label = 'Orders Processed' amountColor = '#C62032' />
					<QuickStatsShortRegular amount = {data.ordersShipped} label = 'Orders Shipped' amountColor = '#C62032' />
				</div>
				<div id='InvoiceStats' className='Row'>
					<QuickStatsShortWide amount = {data.missingInvoices} label = 'Missing Invoices' amountColor = '#C62032' />
					<QuickStatsShortWide amount = {data.unpaidInvoices} label = 'Unpaid Invoices' amountColor = '#C62032' />
				</div>
			</div>
		</div>
	)
}

export default AllQuickStats