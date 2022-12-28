import cross_red from './img/close_red.svg'
import cross_white from './img/close_white.svg'
import { useState } from 'react'

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

const OrderDisplayColumn = ({title, orders, orderCardOnClick}) => {
	return(
		<ul className='OrderDisplayColumn'>
			<li style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>

			{orders.map((order) => (
				<li><OrderCard key={order.referenceNumber} order={order} color='#90E0C9' onClick={orderCardOnClick} /></li>
			))}
		</ul>
	)
}

const ActiveOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn title='Placed' orders={orders.filter(order => order.status === 'PLACED')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Processed' orders={orders.filter(order => order.status === 'PROCESSED')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Shipped' orders={orders.filter(order => order.status === 'SHIPPED')} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

const CompletedOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

const useOrderForm = (order, orderFunction) => {
	const [inputs, setInputs] = useState(order)
	/*const [newOrder, setOrder] = useState(order)*/

	const handleSubmit = (event) => {
		if(event) {
			event.preventDefault()
			orderFunction(inputs)
		}
	}
	const handleInputChange = (event) => {
		event.persist()
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
	}
	return {
		handleSubmit,
		handleInputChange,
		inputs
	};
}

const OrderViewEdit = ({order, orderFunction}) => {
	const {inputs, handleInputChange, handleSubmit} = useOrderForm(order, orderFunction)
	let recipient
	if(order.isGift){
		recipient = order.giftFor

	} else{
		recipient = order.customer.firstName + ' ' + order.customer.lastName 
	}

	var numberOfFlavors = 0
	order.productsOrdered.forEach(product => numberOfFlavors++)

	var numberOfLogs = 0
	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

	return (
		<form onSubmit={handleSubmit}>
			<div id='OrderView'>
				<div id='OrderView_Header'>
					<button type="submit">Save</button>
					<button>Cancel</button>
				</div>
				<div className='Row'>
					<div className='Column'>
						<div id='OrderView_General_Details'>
							<table>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
									<td><input type="text" name="referenceNumber" onChange={handleInputChange} value={inputs.referenceNumber} defaultValue={order.referenceNumber} required/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
									<td><input type="text" name="invoiceNumber" onChange={handleInputChange} value={inputs.invoiceNumber} defaultValue={order.invoiceNumber}/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
									<td><input type="text" name="datePlaced" onChange={handleInputChange} value={inputs.datePlaced} defaultValue={order.datePlaced} required/></td>
								</tr>
							</table>
						</div>

						<div id='OrderView_Customer_Details'>
							<table>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>First Name<br></br>Last Name</h4></td>
									<td>
										<input type="text" name="customer.firstName" onChange={handleInputChange} value={inputs.customer.firstName} defaultValue={order.customer.firstName} required/><br></br>
										<input type="text" name="lastName" onChange={handleInputChange} value={inputs.customer.lastName} defaultValue={order.customer.lastName} required/>
									</td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
									<td><input type="email" name="email" onChange={handleInputChange} value={inputs.customer.email} defaultValue={order.customer.email} required/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
									<td><input type="tel" name="phoneNumber"onChange={handleInputChange}  value={inputs.customer.phoneNumber} defaultValue={order.customer.phoneNumber} required/></td>
								</tr>
							</table>
						</div>
					</div>

					<div id='OrderView_Shipping_Details'>
						<table>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Recipient</h4></td>
								{order.isGift && <td><input type="text" name="giftFor" onChange={handleInputChange} value={inputs.giftFor} defaultValue={recipient} required/></td>}
								{!order.isGift && <td><h4>{recipient}</h4></td>}
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Street Address<br></br>City<br></br>State<br></br>Zipcode</h4></td>
								<td>
									<input type="text" name="streetAddress" onChange={handleInputChange} value={inputs.shippingAddress.streetAddress} defaultValue={order.shippingAddress.streetAddress} required/><br></br>
									<input type="text" name="city" onChange={handleInputChange} value={inputs.shippingAddress.city} defaultValue={order.shippingAddress.city} required/><br></br>
									<input type="text" name="state" onChange={handleInputChange} value={inputs.shippingAddress.state} defaultValue={order.shippingAddress.state} required/><br></br>
									<input type="text" name="zipcode" onChange={handleInputChange} value={inputs.shippingAddress.zipCode} defaultValue={order.shippingAddress.zipCode} required/>
								</td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
								<input type="text" name="shipmentTrackingNumber" onChange={handleInputChange} value={inputs.shipmentTrackingNumber} defaultValue={order.shipmentTrackingNumber}/>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Is Gift?</h4></td>
								{order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift" checked/></td>}
								{!order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift"/></td>}
							</tr>
							<tr>
								{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
								{order.isGift && order.giftMessage !== '' && <td><input type="text" name="giftMessage" onChange={handleInputChange} value={inputs.giftMessage} defaultValue={order.giftMessage}/></td>}
							</tr>
						</table>
					</div>
				</div>

				<div id='OrderView_Products_Details'>
					<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
					<div className='Row'>
						<table>
							<tr>
								<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
								<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
								<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
							</tr>
							{order.productsOrdered.map((product) => (
								<tr>
									<td><h4>{product.product.name}</h4></td>
									<td><h4>{product.product.id}</h4></td>
									<td><h4>{product.quantity}</h4></td>
								</tr>					
							))}
						</table>
						<table>
							<tr>
								<th><h4 style={{fontWeight: 'bold'}}>At a Glance:</h4></th>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Total Number of Logs:</h4></td>
								<td><h4>{numberOfLogs}</h4></td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Total Number of Flavors:</h4></td>
								<td><h4>{numberOfFlavors}</h4></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</form>
	)
}

const OrderView = ({order, editOrder}) => {
	let recipient
	if(order.isGift){
		recipient = order.giftFor

	} else{
		recipient = order.customer.firstName + ' ' + order.customer.lastName 
	}

	var numberOfFlavors = 0
	order.productsOrdered.forEach(product => numberOfFlavors++)

	var numberOfLogs = 0
	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

	return (
		<div id='OrderView'>
			<div id='OrderView_Header'>
				<button>text</button>
			</div>
			<div className='Row'>
				<div className='Column'>
					<div id='OrderView_General_Details'>
						<table>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
								<td><h4>{order.referenceNumber}</h4></td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
								<td><h4>{order.invoiceNumber}</h4></td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
								<td><h4>{order.datePlaced}</h4></td>
							</tr>
						</table>
					</div>

					<div id='OrderView_Customer_Details'>
						<table>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Name</h4></td>
								<td><h4>{order.customer.firstName} {order.customer.lastName}</h4></td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
								<td><h4>{order.customer.email}</h4></td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
								<td><h4>{order.customer.phoneNumber}</h4></td>
							</tr>
						</table>
					</div>
				</div>

				<div id='OrderView_Shipping_Details'>
					<table>
						<tr>
							<td><h4 style={{fontWeight: 'bold'}}>Recipient</h4></td>
							<td><h4>{recipient}</h4></td>
						</tr>
						<tr>
							<td><h4 style={{fontWeight: 'bold'}}>Address</h4></td>
							<td>
								<h4>{order.shippingAddress.streetAddress}<br></br>{order.shippingAddress.city}, {order.shippingAddress.state}<br></br>{order.shippingAddress.zipCode}</h4>
							</td>
						</tr>
						<tr>
							<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
							<td><h4>{order.shipmentTrackingNumber}</h4></td>
						</tr>
						<tr>
							{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
							{order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
						</tr>
					</table>
				</div>
			</div>

			<div id='OrderView_Products_Details'>
				<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
				<div className='Row'>
					<table>
						<tr>
							<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
							<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
							<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
						</tr>
						{order.productsOrdered.map((product) => (
							<tr>
								<td><h4>{product.product.name}</h4></td>
								<td><h4>{product.product.id}</h4></td>
								<td><h4>{product.quantity}</h4></td>
							</tr>					
						))}
					</table>
					<table>
						<tr>
							<th><h4 style={{fontWeight: 'bold'}}>At a Glance:</h4></th>
						</tr>
						<tr>
							<td><h4 style={{fontWeight: 'bold'}}>Total Number of Logs:</h4></td>
							<td><h4>{numberOfLogs}</h4></td>
						</tr>
						<tr>
							<td><h4 style={{fontWeight: 'bold'}}>Total Number of Flavors:</h4></td>
							<td><h4>{numberOfFlavors}</h4></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	)
}

const ViewType = {
	ACTIVE_ORDERS: 1,
	COMPLETED_ORDERS: 2,
	ORDER_VIEW: 3,
}

const Orders = ({updateOrder, deleteOrder, addOrder, getOrders}) => {
	var orders = getOrders()
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
			displayContent = <OrderViewEdit order={activeContent.order} orderFunction={updateOrder} />
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

export default Orders;