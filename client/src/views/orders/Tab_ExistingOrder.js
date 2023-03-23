import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_white.svg'

import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { updateOrder, deleteOrder, retrieveOrder } from '../../store/order_slice'
import {retrieveShippingAddress} from '../../store/address_slice'
import { retrieveCustomer } from '../../store/customer_slice';
import { retrieveInvoice } from '../../store/invoice_slice';
import { findOrderLineByOrderID } from "../../store/orderline_slice";
import { findBySKU, retrieveProducts } from "../../store/product_slice";

// ------------------------------ ORDER DETAILS: VIEW --------------------------------- //

const GeneralInfoView = ({referenceNumber, datePlaced, trackingNumber, orderStatus, giftFor, giftMessage}) => {
	return (
		<div id='OrderView_General'>
			<table>
				<tbody>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
						<td><h4>{referenceNumber}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
						<td><h4>{moment(datePlaced).format('MM/DD/YYYY')}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
						<td><h4>{trackingNumber}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Status</h4></td>
						<td><h4>{orderStatus}</h4></td>
					</tr>
				</tbody>
			</table>
			<table>
				<tbody>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Gift Recipient</h4></td>
						<td><h4>{giftFor}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>
						<td><h4>{giftMessage}</h4></td>
					</tr>
				</tbody>
			</table>
        </div> 
	);	
}

const CustomerInfoView = ({firstName, lastName, email, phoneNumber}) => {

	return (
		<div id='OrderView_Customer_Details'>
			<table>
				<tbody>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Name</h4></td>
						<td><h4>{firstName} {lastName}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
						<td><h4>{email}</h4></td>
					</tr>
					<tr>
						<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
						<td><h4>{phoneNumber}</h4></td>
					</tr>
				</tbody>
			</table>
		</div>
	);	
}

const ShippingInfoView = ({ streetAddress, city, state, zip}) => {
	return (
		<div id='OrderView_Shipping_Details'>
		<table>
			<tbody>
				<tr>
					<td><h4 style={{fontWeight: 'bold'}}>Street Address</h4></td>
					<td>
						<h4>{streetAddress}
						<br></br> {city}, {state}<br></br>{zip}
						</h4>
					</td>
				</tr>
				{/* <tr>
					<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
					<td><h4>{order.shipmentTrackingNumber}</h4></td>
				</tr> */}
				{/* <tr>
					{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
					{order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
				</tr> */}
			</tbody>
		</table>
	</div>
	)
}

const InvoiceInfoView = ({invoiceNumber, revenue, expense, orderStatus}) => {
	if (invoiceNumber) {
		return (
			<div id='OrderView_Invoice_Details'>
			   <table>
				   <tr>
					   <td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
					   <td><h4>{invoiceNumber}</h4></td>
				   </tr>
				   <tr>
					   <td><h4 style={{fontWeight: 'bold'}}>Revenue</h4></td>
					   <td><h4>{revenue}</h4></td>
				   </tr>
				   <tr>
					   <td><h4 style={{fontWeight: 'bold'}}>Expense</h4></td>
					   <td><h4>{expense}</h4></td>
				   </tr>
			   </table>
		   </div> 
	   );	
	}
	else {
		return (
			<div id='OrderView_Invoice_Details'>
			   <div>Missing Invoice</div>
		   </div> 
	   );
	   
	}
}

const ProductInfoView = ({productsOrdered, numberOfFlavors, numberOfLogs}) => {
	console.log(productsOrdered)
	return (
		<div id='OrderView_Products_Details'>
		<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
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
				<table>
					<tbody>

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
					</tbody>
				</table>
			</div>
		</div> 
	);	

}


// ------------------------------ ORDER DETAILS: EDIT --------------------------------- //

const GeneralInfoEdit = ({referenceNumber, datePlaced, trackingNumber, orderStatus, handleChange}) => {

	return(
            <div id='OrderView_General_Details'>
                <div className="form-group">
                  <label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="ref"
                    required
                    defaultValue={referenceNumber}
                    onChange={handleChange}
                    name="ref"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    defaultValue={datePlaced || ''}
                    onChange={handleChange}
                    name="date"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="tracking"
                    defaultValue={trackingNumber || ''}
                    onChange={handleChange}
                    name="trackingNumber"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status"><h4 style={{fontWeight: 'bold'}}>Status</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    defaultValue={orderStatus || ''}
                    onChange={handleChange}
                    name="status"
                  />
                </div>
            </div>
        
	)
}


const CustomerInfoEdit = ({firstName, lastName, email, phoneNumber, handleChange}) => {

	return (
		<div id='OrderView_Customer_Details'>
			<div className="form-group">
                  <label htmlFor="first"><h4 style={{fontWeight: 'bold'}}>First Name</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="first"
                    required
                    defaultValue={firstName || ''}
                    onChange={handleChange}
                    name="first"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="last"><h4 style={{fontWeight: 'bold'}}>Last Name</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="last"
                    required
                    defaultValue={lastName || ''}
                    onChange={handleChange}
                    name="last"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="email"><h4 style={{fontWeight: 'bold'}}>Email</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    defaultValue={email || ''}
                    onChange={ handleChange}
                    name="email"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="phone"><h4 style={{fontWeight: 'bold'}}>Phone Number</h4></label>
                  <input
                    type="text"
                    className="form-control"
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
		<div id='OrderView_Shipping_Details'>
			<td><h4 style={{fontWeight: 'bold'}}>Street Address</h4></td>
			<div className="form-group">
                  <label htmlFor="streetAddress"><h4 style={{fontWeight: 'bold'}}>StreetAddress</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="streetAddress"
                    required
                    defaultValue={streetAddress || ''}
                    onChange={handleChange}
                    name="streetAddress"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="city"><h4 style={{fontWeight: 'bold'}}>City</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    required
                    defaultValue={city || ''}
                    onChange={handleChange}
                    name="city"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    required
                    defaultValue={state || ''}
                    onChange={handleChange}
                    name="state"
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="zip"><h4 style={{fontWeight: 'bold'}}>Zip</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    required
                    defaultValue={zip || ''}
                    onChange={handleChange}
                    name="zip"
                  />
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

const InvoiceInfoEdit = ({invoiceNumber, revenue, expense, invoiceStatus, handleChange}) => {
		return (
			<div id='OrderView_Invoice_Details'>
				<div className="form-group">
                  <label htmlFor="invoiceNumber"><h4 style={{fontWeight: 'bold'}}>Invoice Number</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    id="invoiceNumber"
                    required
                    defaultValue={invoiceNumber || ''}
                    onChange={handleChange}
                    name="invoiceNumber"
                  />
                </div>
				<div> 
					<h4 style={{fontWeight: 'bold'}}>Revenue</h4>
					<h4>{revenue}</h4>
				    <h4 style={{fontWeight: 'bold'}}>Expense</h4>
					<h4>{expense}</h4>
				</div>
				

		   </div> 
	   );	
	
}

const ProductInfoEdit = ({productsOrdered, numberOfFlavors, numberOfLogs, handleChange}) => {
	return (
		<div id='OrderView_Products_Details'>
		<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
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
				<table>
					<tbody>

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
		this.handleInputChangeGeneral = this.handleInputActiveOrder.bind(this)

		this.deleteCurrOrder = this.deleteCurrOrder.bind(this)
		this.updateViewOnly = this.updateViewOnly.bind(this)
		this.saveEdits = this.saveEdits.bind(this)

	  this.state = {
		orderID: -1,
		activeOrder: {
			referenceNumber: "",
			datePlaced: "",
			orderStatus: "",
			trackingNumber: "",
			giftFor: "",
			giftMessage: "",
			isGift: 1,
			customerId: "",
			shippingId: "",
			isSelfOrder:"",

		},
		activeCustomer: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
		},
		activeAddress: {
			streetAddress: "",
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

	componentDidMount() {
		const {orderID, activeOrder, activeAddress, activeCustomer, activeInvoice, productsOrdered, numberOfFlavors, numberOfLogs} = this.props.order
		this.setState({
			orderID: parseInt(orderID),
			activeOrder: activeOrder,
			activeAddress: activeAddress,
			activeCustomer: activeCustomer,
			activeInvoice: activeInvoice,
			productsOrdered: productsOrdered,
			numberOfFlavors: numberOfFlavors,
			numberOfLogs: numberOfLogs
		})
	}

	updateViewOnly() {
		this.setState({
			viewOnly: !this.state.viewOnly
		})
	}

	saveEdits() {
		console.log("edit order")

		this.props
		.updateOrder({ id: this.state.orderID, data: this.state.activeOrder })
		.unwrap()
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
		const {streetAddress, city, state, zip} = this.state.activeAddress;

		const {numberOfFlavors, numberOfLogs, productsOrdered} = this.state;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;

		if (viewOnly) {
			return (
				<div id='OrderView'>
					<div className='Row'>
						<div id='OrderView_Header'>
							{/* on click EDIT, we change to edit view */}
							<button className='OrderActionButton' onClick={ this.updateViewOnly}>
								<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Edit Order</h4>
							</button>
							{/* on click DELETE, we dispatch delete call with ID*/}
							<button className='OrderActionButton' onClick={(event) => this.deleteCurrOrder(activeTabId, event)}>
								<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Delete Order</h4>
							</button>
						</div>
					</div>
					
				<div className='Row'>
					<div className='Column'>		
						<GeneralInfoView referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus} giftFor={giftFor} giftMessage={giftMessage}/>
					</div>
					<div className='Column'>		
						<CustomerInfoView firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
					</div>
				</div>
				<div className='Row'>
					<div className='Column'>	
						<InvoiceInfoView invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} invoiceStatus={invoiceStatus}/>
		
					</div>
					<div className='Column'>		
						<ShippingInfoView streetAddress={streetAddress} city={city} state={state} zip={zip}/>
					</div>
				</div>
				<div className='Row'>
					<ProductInfoView numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered}/>
				</div>

			</div>
			);
		} else {
			return (
				<div id='OrderView'>
					<div className='Row'>
						<div id='OrderView_Header'>
							{/* on click EDIT, we change to edit view */}
							<button className='OrderActionButton' onClick={this.saveEdits}>
								<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Save Order</h4>
							</button>
							{/* on click DELETE, we dispatch delete call with ID*/}
							<button className='OrderActionButton' onClick={(this.updateViewOnly)}>
								<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Cancel</h4>
							</button>
						</div>
					</div>
					<div className='Row'>
					<div className='Column'>		
					<	GeneralInfoEdit handleChange={this.handleInputActiveOrder} referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus}/>
					</div>
					<div className='Column'>		
					<CustomerInfoEdit handleChange={this.handleInputChange} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
					</div>
				</div>
				<div className='Row'>
					<div className='Column'>	
						<InvoiceInfoEdit handleChange={this.handleInputChange} invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} orderStatus={orderStatus}/>
		
					</div>
					<div className='Column'>		
					<ShippingInfoEdit handleChange={this.handleInputChange} streetAddress={streetAddress} city={city} state={state} zip={zip}/>
					</div>
				</div>
				<div className='Row'>
					<ProductInfoEdit handleChange={this.handleInputChange} numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered}/>
				</div>
			</div>
			);
		}
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
  
export default connect(mapStateToProps, { retrieveCustomer, deleteOrder, retrieveOrder, updateOrder, retrieveShippingAddress, retrieveProducts, findBySKU, findOrderLineByOrderID, retrieveInvoice })(ExistingOrder);

