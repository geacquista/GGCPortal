import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_white.svg'
import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";

import { updateOrder, deleteOrder, retrieveOrder, save } from '../../store/order_slice'
import { retrieveCustomer } from '../../store/customer_slice'
import { retrieveInvoice }	from '../../store/invoice_slice'
import { retrieveShippingAddress } from '../../store/address_slice';
import { retrieveOrderLines } from '../../store/orderline_slice'

import CustomerInfo from './orderview_components/CustomerDetails';
import InvoiceInfo from './orderview_components/InvoiceDetails';
import GiftInfo from './orderview_components/GiftDetails';
import GeneralInfo from './orderview_components/GeneralDetails';
import ShippingInfo from './orderview_components/ShippingDetails';
import ProductInfo from './orderview_components/ProductDetails';


const useOrderForm = (order) => {

	const dispatch = useDispatch();
	  const [inputs, setInputs] = useState(order)
	  /* const [newOrder, setOrder] = useState(order) */
  
	const ordersAmount = useSelector((state) => state.orders.length);
  
  
	  const handleSubmit = (event) => {
		  if(event) {
			  event.preventDefault()
			  dispatch(
		);
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

//  const OrderEditView = ({order, orderFunction}) => {

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


/**
 * This is the view of a singular order. 
 * @param order 
 * @returns This returns the view of a singular existing order 
 */
 const OrderViewOnly = ({order}) => {
	
	console.log(order)

	const viewType = "READ_ONLY" || "CAN_EDIT";
	// let recipient
	// if(order.isGift){
	// 	recipient = order.giftFor

	// } else{
	// 	// recipient = order.customer.firstName + ' ' + order.customer.lastName 
	// }

	// var numberOfFlavors = 0
	// order.productsOrdered.forEach(product => numberOfFlavors+=1)

	// var numberOfLogs = 0
	// order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)
	return (
		<div className='Row'>
			<div className='Column'>		
				<GeneralInfo order={order} viewType={viewType}/>
				<CustomerInfo order={order}/>
				<GiftInfo order={order}/>
				<ShippingInfo order={order}/>
				<InvoiceInfo order={order}/>
				<ProductInfo order={order}/>
			</div>
		</div>
	)
}

class ExistingOrder extends Component {
	constructor(props) {
	  super(props);

	  	// this.editOrder = this.editOrder.bind(this)
		this.deleteCurrOrder = this.deleteCurrOrder.bind(this)

	  this.state = {
		orderID: -1,
		viewOnly: true,
	  }


	}

	// editOrder() {
	// 	this.props.updateOrder({id, newInfo })
	// 	.then((data) => {

	// 	})
	// 	.catch((e) => {
	// 	  console.log(e);
	// 	});

//	}

	deleteCurrOrder(id, event) {
		const {orderID} = this.props.order.orderID
		console.log({ id: this.props.order.orderID })
		this.props
			.deleteOrder({id: (this.state.orderID)}) 
			.then(() => {
				this.props.orderCardOnDelete(id, event)
			})
			.catch((e) => {
			console.log(e);
			});
	}
  
	componentDidMount() {
		const orderID = parseInt(this.props.order.orderID)
		this.setState({
			orderID: orderID
		})
	}

  
	render() {

		const {order, activeTabId} = this.props;
		const {orderID, viewOnly} = this.state;

		if (viewOnly) {
			return (
				<div id='OrderView'>
					<div id='OrderView_Header'>
					{/* on click EDIT, we change to edit view */}
					<button className='OrderActionButton' onClick={()=> viewOnly=false}>
						<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
						<h4>Edit Order</h4>
					</button>
					{/* on click DELETE, we dispatch delete call with ID*/}
					<button className='OrderActionButton' onClick={(event) => this.deleteCurrOrder(activeTabId, event)}>
						<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
						<h4>Delete Order</h4>
					</button>
				</div>
				<OrderViewOnly order={order}/>
			</div>
			);
		} else {
			return (
				<div id='OrderView'>
					<div id='OrderView_Header'>
					{/* on click EDIT, we change to edit view */}
					<button className='OrderActionButton' onClick={this.editOrder()}>
						<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
						<h4>Save Order</h4>
					</button>
					{/* on click DELETE, we dispatch delete call with ID*/}
					<button className='OrderActionButton' onClick={<OrderViewOnly order={order}/>}>
						<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
						<h4>Cancel</h4>
					</button>
				</div>
			</div>
			);
		}
	}
  }
  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {

	return {
	  customers: state.customers,
	  orderline: state.orderline,
	  invoices: state.invoices,
	  shippingAddresses: state.shippingAddresses,
	};
  };
  
export default connect(mapStateToProps, { deleteOrder, retrieveOrder, updateOrder })(ExistingOrder);

