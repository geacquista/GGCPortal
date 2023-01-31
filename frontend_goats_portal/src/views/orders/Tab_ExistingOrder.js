import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_white.svg'
import React, { useState, Component } from 'react'
import { connect } from "react-redux";

import { updateOrder, deleteOrder, retrieveOrder } from '../../store/order_slice'
import { retrieveCustomer } from '../../store/customer_slice'
import { retrieveInvoice }	from '../../store/invoice_slice'
import { retrieveShippingAddress } from '../../store/address_slice';
import { retrieveOrderLines } from '../../store/orderline_slice'

// const useOrderForm = (order, orderFunction) => {
// 	const [inputs, setInputs] = useState(order)
// 	/* const [newOrder, setOrder] = useState(order) */

// 	const handleSubmit = (event) => {
// 		if(event) {
// 			event.preventDefault()
// 			orderFunction(inputs)
// 		}
// 	}
// 	const handleInputChange = (event) => {
// 		event.persist()
// 		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
// 	}
// 	return {
// 		handleSubmit,
// 		handleInputChange,
// 		inputs
// 	};
// }

// export const OrderEditView = ({order, orderFunction}) => {

// 	// orderFunction do i need to import a function?
// 	const {inputs, handleInputChange, handleSubmit} = useOrderForm(order, orderFunction)
// 	let recipient
// 	if(order.isGift){
// 		recipient = order.giftFor

// 	} else{
// 		recipient = order.customer.firstName + ' ' + order.customer.lastName 
// 	}

// 	var numberOfFlavors = 0
// 	order.productsOrdered.forEach(product => numberOfFlavors++)

// 	var numberOfLogs = 0
// 	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div id='OrderView'>
// 				<div id='OrderView_Header'>
// 					<button type="submit">Save</button>
// 					<button>Cancel</button>
// 				</div>
// 				<div className='Row'>
// 					<div className='Column'>
// 						<div id='OrderView_General_Details'>
// 							<table>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
// 									<td><input type="text" name="referenceNumber" onChange={handleInputChange} value={inputs.referenceNumber} defaultValue={order.referenceNumber} required/></td>
// 								</tr>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
// 									<td><input type="text" name="invoiceNumber" onChange={handleInputChange} value={inputs.invoiceNumber} defaultValue={order.invoiceNumber}/></td>
// 								</tr>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
// 									<td><input type="text" name="datePlaced" onChange={handleInputChange} value={inputs.datePlaced} defaultValue={order.datePlaced} required/></td>
// 								</tr>
// 							</table>
// 						</div>

// 						<div id='OrderView_Customer_Details'>
// 							<table>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>First Name<br></br>Last Name</h4></td>
// 									<td>
// 										<input type="text" name="customer.firstName" onChange={handleInputChange} value={inputs.customer.firstName} defaultValue={order.customer.firstName} required/><br></br>
// 										<input type="text" name="lastName" onChange={handleInputChange} value={inputs.customer.lastName} defaultValue={order.customer.lastName} required/>
// 									</td>
// 								</tr>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
// 									<td><input type="email" name="email" onChange={handleInputChange} value={inputs.customer.email} defaultValue={order.customer.email} required/></td>
// 								</tr>
// 								<tr>
// 									<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
// 									<td><input type="tel" name="phoneNumber"onChange={handleInputChange}  value={inputs.customer.phoneNumber} defaultValue={order.customer.phoneNumber} required/></td>
// 								</tr>
// 							</table>
// 						</div>
// 					</div>

// 					<div id='OrderView_Shipping_Details'>
// 						<table>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Recipient</h4></td>
// 								{order.isGift && <td><input type="text" name="giftFor" onChange={handleInputChange} value={inputs.giftFor} defaultValue={recipient} required/></td>}
// 								{!order.isGift && <td><h4>{recipient}</h4></td>}
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Street Address<br></br>City<br></br>State<br></br>Zipcode</h4></td>
// 								<td>
// 									<input type="text" name="streetAddress" onChange={handleInputChange} value={inputs.shippingAddress.streetAddress} defaultValue={order.shippingAddress.streetAddress} required/><br></br>
// 									<input type="text" name="city" onChange={handleInputChange} value={inputs.shippingAddress.city} defaultValue={order.shippingAddress.city} required/><br></br>
// 									<input type="text" name="state" onChange={handleInputChange} value={inputs.shippingAddress.state} defaultValue={order.shippingAddress.state} required/><br></br>
// 									<input type="text" name="zipcode" onChange={handleInputChange} value={inputs.shippingAddress.zipCode} defaultValue={order.shippingAddress.zipCode} required/>
// 								</td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
// 								<input type="text" name="shipmentTrackingNumber" onChange={handleInputChange} value={inputs.shipmentTrackingNumber} defaultValue={order.shipmentTrackingNumber}/>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Is Gift?</h4></td>
// 								{order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift" checked/></td>}
// 								{!order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift"/></td>}
// 							</tr>
// 							<tr>
// 								{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
// 								{order.isGift && order.giftMessage !== '' && <td><input type="text" name="giftMessage" onChange={handleInputChange} value={inputs.giftMessage} defaultValue={order.giftMessage}/></td>}
// 							</tr>
// 						</table>
// 					</div>
// 				</div>

// 				<div id='OrderView_Products_Details'>
// 					<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
// 					<div className='Row'>
// 						<table>
// 							<tr>
// 								<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
// 								<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
// 								<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
// 							</tr>
// 							{order.productsOrdered.map((product) => (
// 								<tr>
// 									<td><h4>{product.product.name}</h4></td>
// 									<td><h4>{product.product.id}</h4></td>
// 									<td><h4>{product.quantity}</h4></td>
// 								</tr>					
// 							))}
// 						</table>
// 						<table>
// 							<tr>
// 								<th><h4 style={{fontWeight: 'bold'}}>At a Glance:</h4></th>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Total Number of Logs:</h4></td>
// 								<td><h4>{numberOfLogs}</h4></td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Total Number of Flavors:</h4></td>
// 								<td><h4>{numberOfFlavors}</h4></td>
// 							</tr>
// 						</table>
// 					</div>
// 				</div>
// 			</div>
// 		</form>
// 	)
// }

// // this will be used to dispatch actions
// // import { useSelector, useDispatch } from 'react-redux';

// /**
//  * This is the view of a singular order. It takes in the functions for the button clicks.
//  * Should have EDIT and DELETE button. This is only for existing orders (those that have been saved) 
//  * @param {Order,function,function} order updateOrder deleteOrder
//  * @returns This returns the view of a singular existing order 
//  */
// // export const OrderViewOnly = ({order, updateOrder, deleteOrder}) => {
// export const OrderViewOnly = ({order, readOnlyButton}) => {
// 	let recipient
// 	if(order.isGift){
// 		recipient = order.giftFor

// 	} else{
// 		recipient = order.customer.firstName + ' ' + order.customer.lastName 
// 	}

// 	var numberOfFlavors = 0
// 	order.productsOrdered.forEach(product => numberOfFlavors+=1)

// 	var numberOfLogs = 0
// 	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

// 	return (
// 		<div id='OrderView'>
// 			<div id='OrderView_Header'>
// 				{/* on click EDIT, we change to edit view */}
// 				<button className='OrderActionButton' onClick={()=> readOnlyButton(prevState => !prevState)}>
// 					<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
// 					<h4>Edit Order</h4>
// 				</button>
// 				{/* on click DELETE, we dispatch delete call with ID*/}
// 				<button className='OrderActionButton' onClick={deleteOrder}>
// 					<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
// 					<h4>Delete Order</h4>
// 				</button>
// 			</div>
// 			<div className='Row'>
// 				<div className='Column'>
// 					<div id='OrderView_General_Details'>
// 						<table>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
// 								<td><h4>{order.referenceNumber}</h4></td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
// 								<td><h4>{order.invoiceNumber}</h4></td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
// 								<td><h4>{order.datePlaced}</h4></td>
// 							</tr>
// 						</table>
// 					</div>

// 					<div id='OrderView_Customer_Details'>
// 						<table>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Name</h4></td>
// 								<td><h4>{order.customer.firstName} {order.customer.lastName}</h4></td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
// 								<td><h4>{order.customer.email}</h4></td>
// 							</tr>
// 							<tr>
// 								<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
// 								<td><h4>{order.customer.phoneNumber}</h4></td>
// 							</tr>
// 						</table>
// 					</div>
// 				</div>

// 				<div id='OrderView_Shipping_Details'>
// 					<table>
// 						<tr>
// 							<td><h4 style={{fontWeight: 'bold'}}>Recipient</h4></td>
// 							<td><h4>{recipient}</h4></td>
// 						</tr>
// 						<tr>
// 							<td><h4 style={{fontWeight: 'bold'}}>Address</h4></td>
// 							<td>
// 								<h4>{order.shippingAddress.streetAddress}<br></br>{order.shippingAddress.city}, {order.shippingAddress.state}<br></br>{order.shippingAddress.zipCode}</h4>
// 							</td>
// 						</tr>
// 						<tr>
// 							<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
// 							<td><h4>{order.shipmentTrackingNumber}</h4></td>
// 						</tr>
// 						<tr>
// 							{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
// 							{order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
// 						</tr>
// 					</table>
// 				</div>
// 			</div>

// 			<div id='OrderView_Products_Details'>
// 				<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
// 				<div className='Row'>
// 					<table>
// 						<tr>
// 							<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
// 							<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
// 							<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
// 						</tr>
// 						{order.productsOrdered.map((product) => (
// 							<tr>
// 								<td><h4>{product.product.name}</h4></td>
// 								<td><h4>{product.product.id}</h4></td>
// 								<td><h4>{product.quantity}</h4></td>
// 							</tr>					
// 						))}
// 					</table>
// 					<table>
// 						<tr>
// 							<th><h4 style={{fontWeight: 'bold'}}>At a Glance:</h4></th>
// 						</tr>
// 						<tr>
// 							<td><h4 style={{fontWeight: 'bold'}}>Total Number of Logs:</h4></td>
// 							<td><h4>{numberOfLogs}</h4></td>
// 						</tr>
// 						<tr>
// 							<td><h4 style={{fontWeight: 'bold'}}>Total Number of Flavors:</h4></td>
// 							<td><h4>{numberOfFlavors}</h4></td>
// 						</tr>
// 					</table>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

class ExistingOrder extends Component {
	constructor(props) {
	  super(props);
      
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	//   this.props.retrieveOrder();
	//   this.props.retrieveCustomer();
	//   this.props.retrieveInvoices();
	//   this.props.retrieveOrderLines();
	}

  
	render() {
			// const [isReadonly, setIsReadonly] = useState(true);



		// if (isReadonly) {
		// 	return (
		// 		<OrderViewOnly order={order} readOnlyButton={setIsReadonly}/>
		// 	)
		// } else {
		// 	return (
		// 		<OrderEditView order={order} orderFunction={updateOrder}/>
		// 	)
		// }
				return(
					<div>existing order</div>
				);

	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {
	return {
	  orders: state.orders,
	  customers: state.customers,
	  orderline: state.orderline,
	  invoices: state.invoices,
	  shippingAddresses: state.shippingAddresses,

	};
  };
  
export default connect(mapStateToProps, { retrieveOrder, retrieveCustomer, retrieveOrderLines, retrieveInvoice })(ExistingOrder);

