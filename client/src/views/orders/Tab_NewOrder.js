// import React, { useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";

// const useOrderForm = (order) => {

//   const dispatch = useDispatch();
// 	const [inputs, setInputs] = useState(order)
// 	/* const [newOrder, setOrder] = useState(order) */

//   const ordersAmount = useSelector((state) => state.orders.length);


// 	const handleSubmit = (event) => {
// 		if(event) {
// 			event.preventDefault()
// 			dispatch(
//         // addOrder({
//         //   id: ordersAmount + 1,
//         //   referenceNumber: order.referenceNumber,
//         //   invoiceNumber: order.invoiceNumber,
//         //   status: order.status,
//         //   datePlaced: '',
//         //   revenue: 0,
//         //   isSelfOrder: true,
//         //   isGift: false,
//         //   giftFor: '',
//         //   giftMessage: '',
//         //   shipmentTrackingNumber: '',
//         //   customer: {
//         //     id: {},
//         //     email: 'gr-ggcexec@wpi.edu',
//         //     firstName: 'Gompei\'s',
//         //     lastName: 'Goat-Cheese',
//         //     phoneNumber: '',
        
//         //   },
//         //   productsOrdered: [{
//         //     id: '1',
//         //     quantity: 3,
//         //     product: {
//         //       id: 'jPL6',
//         //       name: 'plain',
//         //       productDescription: 'A six oz log of plain goat cheese',
//         //     }	
//         //   }],
//         //   shippingAddress: {
//         //     id: '1',
//         //     firstName: 'Gompei\'s',
//         //     lastName: 'Goat-Cheese',
//         //     streetAddress: '100 Institute Road\nMailbox #',
//         //     city: 'Worcester',
//         //     state: 'MA',
//         //     zipCode: '01609',
//         //   },
//         //   invoice: {
//         //     id: '1',
//         //     invoiceNumber: '',
//         //     expense: 0,
//         //     isPaid: false,
//         //   },
//         // })
//       );
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

// //orderFunction = createOrder

// export const NewOrder = ({orderFunction}) => {

//   //ON SAVE: update the view to readonly (so it should be able to close)
// 	// orderFunction = addOrder

//   // Creating an empty order
//   const order = {
//     id: {},
//     referenceNumber: '',
//     invoiceNumber: '',
//     status: 'PLACED',
//     datePlaced: '',
//     revenue: 0,
//     isSelfOrder: true,
//     isGift: false,
//     giftFor: '',
//     giftMessage: '',
//     shipmentTrackingNumber: '',
//     customer: {
//       id: {},
//       email: 'gr-ggcexec@wpi.edu',
//       firstName: 'Gompei\'s',
//       lastName: 'Goat-Cheese',
//       phoneNumber: '',
  
//     },
//     productsOrdered: [{
//       id: '1',
//       quantity: 3,
//       product: {
//         id: 'jPL6',
//         name: 'plain',
//         productDescription: 'A six oz log of plain goat cheese',
//       }	
//     }],
//     shippingAddress: {
//       id: '1',
//       firstName: 'Gompei\'s',
//       lastName: 'Goat-Cheese',
//       streetAddress: '100 Institute Road\nMailbox #',
//       city: 'Worcester',
//       state: 'MA',
//       zipCode: '01609',
//     },
//     invoice: {
//       id: '1',
//       invoiceNumber: '',
//       expense: 0,
//       isPaid: false,
//     },
//   };
// 	const {inputs, handleInputChange, handleSubmit} = useOrderForm(order)
  
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
//           {/**on submit i want to dispatch the addOrder action and  */}
// 					<button onClick={handleSubmit} type="submit">Save</button>
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
//                   <td><input type="date" name="datePlaced" onChange={handleInputChange} value={inputs.datePlaced} defaultValue={order.datePlaced} required/></td>
//                   <td><h4>{order.datePlaced}</h4></td>
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
// 									<td><input type="tel" name="phoneNumber"onChange={handleInputChange}  value={inputs.customer.phoneNumber} defaultValue={order.customer.phoneNumber}/></td>
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

// export default NewOrder;


import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_black.svg'
import "../../assets/style/tab_newOrder.css"
import ReactSwitch from 'react-switch';


import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { createOrder } from '../../store/order_slice'
import {createShippingAddress} from '../../store/address_slice'
import { createCustomer } from '../../store/customer_slice';
import { createOrderLine } from "../../store/orderline_slice";
import { retrieveProducts } from "../../store/product_slice";

// ------------------------------ VIEW --------------------------------- //


const InvoiceInfoView = ({invoiceNumber, revenue, expense, orderStatus}) => {

	
		return (
			<div id='NewInvoiceView' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle'>Invoice</label>
			   	<div className='MissingBackground'>Invoice Generated Upon Save</div>
		   </div> 
	   );
	   
	
}


// ------------------------------ ORDER DETAILS: EDIT --------------------------------- //

const GeneralInfoEdit = ({referenceNumber, datePlaced, trackingNumber, orderStatus, handleChange}) => {

	return(
            <div id='NewOrderGeneral' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
                <div className="OrderViewHeaderNew_Inner">
					
                  <label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="ref"
                    required
                    defaultValue={referenceNumber}
                    onChange={handleChange}
                    name="ref"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="date"
                    defaultValue={datePlaced || ''}
                    onChange={handleChange}
                    name="date"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="tracking"
                    defaultValue={trackingNumber || ''}
                    onChange={handleChange}
                    name="trackingNumber"
                  />
                </div>

            </div>
        
	)
}


const CustomerInfoEdit = ({firstName, lastName, email, phoneNumber, handleChange}) => {

	return (
		<div id='NewOrderCustomer' className='GenericBackgroundAdd'>
		   <label className='BoxDescriptionTitle'>Customer Information</label>
			
			
			<div className='OrderViewHeaderNew_Inner'>
				<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="first"><h4 style={{fontWeight: 'bold'}}>First</h4></label>
					<input
						type="text"
						className="inputField"
						id="first"
						required
						defaultValue={firstName || ''}
						onChange={handleChange}
						name="first"
						
					/>
				</div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="last"><h4 style={{fontWeight: 'bold'}}>Last</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="last"
                    required
                    defaultValue={lastName || ''}
                    onChange={handleChange}
                    name="last"

                  />
                </div>
			</div>

			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="email"><h4 style={{fontWeight: 'bold'}}>Email</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="email"
                    required
                    defaultValue={email || ''}
                    onChange={ handleChange}
                    name="email"
                  />
			</div>
			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="phone"><h4 style={{fontWeight: 'bold'}}>Phone</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="phone"
                    required
                    defaultValue={phoneNumber || ''}
                    onChange={handleChange}
                    name="phone"
                  />
			</div>
		</div>
	);	
}

const ShippingInfoEdit = ({streetAddress, city, state, zip, handleChange}) => {
	return (
		<div id='NewOrderShipping' className='GenericBackgroundAdd'>
			<label className='BoxDescriptionTitle' >Shipping Information</label>
			<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="streetAddressOne"><h4 style={{fontWeight: 'bold'}}>Street Address One</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="streetAddressOne"
                    required
                    defaultValue={streetAddress || ''}
                    onChange={handleChange}
                    name="streetAddressOne"
					style={{width:"65%"}}
                  />
                </div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="streetAddressTwo"><h4 style={{fontWeight: 'bold'}}>Street Address Two</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="streetAddressTwo"
                    required
                    defaultValue={streetAddress || ''}
                    onChange={handleChange}
                    name="streetAddressTwo"
					style={{width:"65%"}}
                  />
                </div>
				<div className="OrderViewHeaderNew_Inner">
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="city"><h4 style={{fontWeight: 'bold'}}>City</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="city"
                    required
                    defaultValue={city || ''}
                    onChange={handleChange}
                    name="city"
					style={{width:"85%"}}
                  />
                </div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="state"
                    required
                    defaultValue={state || ''}
                    onChange={handleChange}
                    name="state"
					style={{width:"60%"}}
                  />

                </div>
				

				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="zip"><h4 style={{fontWeight: 'bold'}}>Zip</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="zip"
                    required
                    defaultValue={zip || ''}
                    onChange={handleChange}
                    name="zip"
					style={{width:"75%"}}
                  />
                </div>
				</div>
				{/* <tr>
					<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
					<td><h4>{order.shipmentTrackingNumber}</h4></td>
				</tr> */}
				{/* <tr>
					{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
					{order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
				</tr> */}
	</div>
	)
}


const ProductInfoEdit = ({productsOrdered, numberOfFlavors, numberOfLogs, handleChange}) => {
	return (
		<div id='NewOrderProducts' className='GenericBackgroundAdd'>
		<label className='BoxDescriptionTitle'>Order Details</label>
			<div className='Row'>
				<table>
					<tbody>
					<tr>
						<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
						<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
						<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
					</tr>
					{productsOrdered.map((product) => (
						<tr key={product.lineProductID&&product.lineOrderID}>
							<td><h4>{product.name}</h4></td>
							<td><h4>{product.lineProductID}</h4></td>
							<td><h4>{product.qtyOrdered}</h4></td>
						</tr>					
					))}
					</tbody>
				</table>
			</div>
		</div> 
	);	

}

// ------------------------------ CLASS STARTS HERE --------------------------------- //

class ExistingOrder extends Component {
	constructor(props) {
	  super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleTo = this.handleInputChange.bind(this)

		this.handleSelfOrderChange = this.handleSelfOrderChange.bind(this)
		this.handleIsGiftChange = this.handleIsGiftChange.bind(this)


		this.deleteCurrOrder = this.deleteCurrOrder.bind(this)
		this.updateViewOnly = this.updateViewOnly.bind(this)
		this.saveEdits = this.saveEdits.bind(this)

	  this.state = {
		orderID: -1,
		activeOrder: {
			referenceNumber: "",
			datePlaced: "",
			orderStatus: "Placed",
			trackingNumber: "",
			giftFor: "",
			giftMessage: "",
			isGift: 1,
			customerId: 0,
			shippingId: 0,
			isSelfOrder:0,

		},
		activeCustomer: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
		},
		activeAddress: {
			streetAddressOne: "",
			streetAddressTwo: "",
			city: "",
			state: "",
			zip: ""
		},
		activeInvoice: {
			invoiceNumber: "NA",
			customerPaid:0,
			revenue: 0,
			expense: 0,
			invoiceStatus: "",
		},
		productsOrdered: [
			
		],
		numberOfLogs: 0,
		numberOfFlavors: 0,
		viewOnly: true,
		isSelfOrderToggle:false,
		isGiftToggle:false
	  }
	}

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });

		console.log(this.state)
    }

	handleSelfOrderChange(e) {
		this.setState({
			isSelfOrderToggle: !this.state.isSelfOrderToggle
		})
	}

	handleIsGiftChange(e) {
		this.setState({
			isGiftToggle: !this.state.isGiftToggle
		})
	}

	handleInputActiveOrder(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
			activeOrder: {
				...this.state.activeOrder,
				[name]: value
			}
        });

		console.log(this.state)
    }

	// componentDidMount() {
	// 	const {orderID, activeOrder, activeAddress, activeCustomer, activeInvoice, productsOrdered, numberOfFlavors, numberOfLogs} = this.props.order
	// 	this.setState({
	// 		orderID: parseInt(orderID),
	// 		activeOrder: activeOrder,
	// 		activeAddress: activeAddress,
	// 		activeCustomer: activeCustomer,
	// 		activeInvoice: activeInvoice,
	// 		productsOrdered: productsOrdered,
	// 		numberOfFlavors: numberOfFlavors,
	// 		numberOfLogs: numberOfLogs
	// 	})
	// }

	updateViewOnly() {
		this.setState({
			viewOnly: !this.state.viewOnly
		})
	}

	saveEdits() {
		console.log(this.state.activeOrder)


		this.props
		.updateOrder({ id: parseInt(this.state.orderID), data: this.state.activeOrder })
		.then((reponse) => {
		  console.log(reponse);
		  
		})
		.catch((e) => {
		  console.log(e);
		});	}

	deleteCurrOrder(id, event) {
		this.props
			.deleteOrder({id: (this.state.orderID)}) 
			.then(() => {
				this.props.orderCardOnDelete(id, event)
			})
			.catch((e) => {
				console.log(e);
			});
	}
  
	render() {

		const {order, activeTabId} = this.props;
		const {viewOnly} = this.state;

		const {referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage, isGift} = this.state.activeOrder;
		const {firstName, lastName, email, phoneNumber } = this.state.activeCustomer;
		const {streetAddressOne,streetAddressTwo, city, state, zip} = this.state.activeAddress;

		const {numberOfFlavors, numberOfLogs, productsOrdered} = this.state;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;
	
			return (
				<div id='OrderViewNew'>
					<div id='OrderViewHeaderNew' >
						<div className='OrderViewHeaderNew_Inner'>
							<label htmlFor="status" className='StatusBackgroundAdd'><i>Status: </i> {orderStatus}</label>
						</div>
						<div className='OrderViewHeaderNew_Inner'>

							{/* on click CANCEL, we clear all fields*/}
							<button className='CancelButton' onClick={(this.updateViewOnly)} style={{ flex:"wrap"}}>
								<img src={delete_icon} alt='delete order' style={{paddingRight: '10px'}}/>
								<h4>Cancel</h4>
							</button>
							{/* on click EDIT, we change to edit view */}
							<button className='SaveNewOrderActionButton' onClick={this.saveEdits}>
								<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Save Order</h4>
							</button>	
						</div>
					</div>
					<div id='MainContainerNewOrder'>
						<div id='LeftSideNew'>
							<GeneralInfoEdit handleChange={this.handleInputActiveOrder} referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus}/>
							<ProductInfoEdit handleChange={this.handleInputChange} numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered}/>
							<InvoiceInfoView handleChange={this.handleInputChange} invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} orderStatus={orderStatus}/>
							<div className='OrderViewHeaderNew_Inner'>
								<label>Self Order</label>
								<ReactSwitch checked={this.state.isSelfOrderToggle} onChange={this.handleSelfOrderChange}/>
							</div>
						</div>
						<div id="RightSideNew">
							<CustomerInfoEdit handleChange={this.handleInputChange} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
							
							<ShippingInfoEdit handleChange={this.handleInputChange} streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip}/>
							<div className='OrderViewHeaderNew_Inner'>
								<label>Is Gift?</label>
								<ReactSwitch checked={this.state.isGiftToggle} onChange={this.handleIsGiftChange}/>
							</div>
						</div>
					</div>
				</div>
			);
		
	}
  }
  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {
	return {
        shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		invoices: state.invoices,
		orderline: state.orderline,
		products: state.products
	};
  };
  
export default connect(mapStateToProps, { createOrder, createCustomer, createOrderLine, createShippingAddress, createOrderLine })(ExistingOrder);

