import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_black.svg'
import add_icon from '../../assets/img/plus_black.svg'

import "../../assets/style/tab_newOrder.css"


import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { updateOrder, deleteOrder, retrieveOrder } from '../../store/order_slice'
import {retrieveShippingAddress} from '../../store/address_slice'
import { retrieveCustomer } from '../../store/customer_slice';
import { retrieveInvoice } from '../../store/invoice_slice';
import { findOrderLineByOrderID } from "../../store/orderline_slice";
import { findBySKU, retrieveProducts } from "../../store/product_slice";

import FlavorSelector from './orderview_components/FlavorSelector';
import {stateOptions, flavorOptions} from '../../assets/util/dropdown.constants'
import { createStringArray } from '../../assets/util/functions';
import { CustomerInfoEdit, GeneralInfoEdit, ProductInfoEdit, ShippingInfoEdit } from './EditComponents'


// ------------------------------ ORDER DETAILS: VIEW --------------------------------- //

const GeneralInfoView = ({referenceNumber, datePlaced, trackingNumber, isGift, orderStatus, giftFor, giftMessage}) => {
	if (isGift) {
		return(
			<div>
				<div id='ExistingOrderGeneralView' className='GenericBackgroundView'>
					<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #</h4></label>
					{referenceNumber}
					</div>
		
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></label>
					{datePlaced}
					</div>
		
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
					{trackingNumber}
					</div>

					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="status"><h4 style={{fontWeight: 'bold'}}>Status</h4></label>
					{orderStatus}
					</div>
				</div>
				<div id='ExistingOrderGeneralViewGift' className='GenericBackgroundView'>
					<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Gift Details</label>
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Gift For</h4></label>
					{giftFor}
					</div>
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></label>
					{giftMessage}
					</div>
				</div>
			</div>
		)
		
	}
	else {
		return(
				<div id='ExistingOrderGeneralView' className='GenericBackgroundView'>
					<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #</h4></label>
					{referenceNumber}
					</div>
		
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></label>
					{datePlaced}
					</div>
		
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
					{trackingNumber}
					</div>

					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="status"><h4 style={{fontWeight: 'bold'}}>Status</h4></label>
					{orderStatus}
					</div>
				</div>
			
			)
		}

	}


const CustomerInfoView = ({firstName, lastName, email, phoneNumber}) => {

	return (
		<div id='' className='GenericBackgroundView'>
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
		<div id='' className='GenericBackgroundView'>
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
			<div id='' className='GenericBackgroundView'>
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
			<div id='' className='GenericBackgroundView'>
			   <div>Missing Invoice</div>
		   </div> 
	   );
	   
	}
}

const ProductInfoView = ({productsOrdered, numberOfFlavors, numberOfLogs}) => {
	return (
		<div id='' className='GenericBackgroundView'>
			<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
			{/* <div className='Row'>
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
			</div> */}
		</div> 
	);	

}

const InvoiceInfoEdit = ({invoiceNumber, customerPaid, revenue, expense, invoiceStatus, handleChange}) => {
		return (
			<div id='OrderView_Invoice_Details' className='GenericBackgroundAdd'>
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
					<h4 style={{fontWeight: 'bold'}}>Customer Paid</h4>
					<h4>{customerPaid}</h4>
					<h4 style={{fontWeight: 'bold'}}>Revenue</h4>
					<h4>{revenue}</h4>
				    <h4 style={{fontWeight: 'bold'}}>Expense</h4>
					<h4>{expense}</h4>
					<h4 style={{fontWeight: 'bold'}}>Invoice Status</h4>
					<h4>{invoiceStatus}</h4>
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
		this.deleteOrderConfirm = this.deleteOrderConfirm.bind(this)

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
			customerId: 0,
			shippingId: 0,
			isSelfOrder:"",

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
		isSelfOrderToggle: false,
		isGiftToggle:true,
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

	deleteOrderConfirm(id,event) {

	}
  
	render() {

		const {order, activeTabId, products} = this.props;
		const {viewOnly} = this.state;

		const {referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage, isGift, isSelfOrder} = this.state.activeOrder;
		const {firstName, lastName, email, phoneNumber } = this.state.activeCustomer;
		const {streetAddressOne,streetAddressTwo, city, state, zip} = this.state.activeAddress;

		const {isGiftToggle, isSelfOrderToggle} = this.state;

		const {numberOfFlavors, numberOfLogs, productsOrdered} = this.state;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;

		if (viewOnly) {
			return (
				<div id='OrderViewNew'>
					<div id='OrderViewHeaderNew' >
						<div className='OrderViewHeaderNew_Inner'>
							<label htmlFor="status" className='StatusBackgroundEditView'><i>Status: </i> {orderStatus}</label>
						</div>
						<div className='OrderViewHeaderNew_Inner'>

							{/* on click CANCEL, we clear all fields*/}
							<button className='CancelButton' onClick={(this.deleteOrderConfirm)} style={{ flex:"wrap"}}>
								<img src={delete_icon} alt='edit order' style={{paddingRight: '10px'}}/>
								<h4>Delete Order</h4>
							</button>	
							{/* on click EDIT, we change to edit view */}
							<button className='SaveNewOrderActionButton' onClick={this.updateViewOnly}>
								<img src={edit_icon} alt='delete order' style={{paddingRight: '10px'}}/>
								<h4>Edit Order</h4>							
							</button>
						</div>
					</div>
					<div className='MainContainer'>
						<div id='LeftSideNew'>
							<GeneralInfoView referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus} isGift={isGift} giftFor={giftFor} giftMessage={giftMessage}/>
							{/* <ProductInfoView numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered} products={products}/> */}
							<InvoiceInfoView invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} orderStatus={orderStatus}/>
							
							
							
							
						</div>
						<div id="RightSideNew">
							<CustomerInfoView firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
							<ShippingInfoView  streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip}/>
							<div className='ToggleWrapper'>
								<div className='OrderViewHeaderNew_Inner'>
									<label className='BoxDescriptionTitle'>Self Order</label>
									<div className="switch">
										<input type="checkbox" id="toggle" checked={isSelfOrderToggle} onChange={this.handleSelfOrderChange} />
										<label></label>
									</div>
								</div>
								<div className='OrderViewHeaderNew_Inner'>
									<label className='BoxDescriptionTitle'>Is Gift?</label>
									<div className="switch">
										<input type="checkbox" id="toggle" checked={isGiftToggle} onChange={this.handleIsGiftChange} />
										<label></label>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			);
		} else {
			return (
				<div id='OrderView'>
					<div id='OrderViewHeaderNew' >
						<div className='OrderViewHeaderNew_Inner'>
							<label htmlFor="status" className='StatusBackgroundAdd'><i>Status: </i> {orderStatus}</label>
						</div>
						
						<div className='OrderViewHeaderNew_Inner'>
							{/* on click DELETE, we dispatch delete call with ID*/}
							<button className='CancelButton' onClick={(this.updateViewOnly)}>
								<img src={delete_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Cancel</h4>
							</button>
							{/* on click SAVE, we save to db */}
							<button className='SaveNewOrderActionButton' onClick={this.saveEdits}>
								<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Save Order</h4>
							</button>
							
						</div>
					</div>
					<div className='MainContainer'>
						<div id='LeftSideNew'>
							<GeneralInfoEdit handleChange={this.handleInputActiveOrder} referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus}/>
							<ProductInfoEdit handleChange={this.handleInputChange} numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered} products={products}/>
							<InvoiceInfoView handleChange={this.handleInputChange} invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} orderStatus={orderStatus}/>
							
							<div className='ToggleWrapper'>
								<div className='OrderViewHeaderNew_Inner'>
									<label className='BoxDescriptionTitle'>Self Order</label>
									<div className="switch">
										<input type="checkbox" id="toggle" checked={isSelfOrderToggle} onChange={this.handleSelfOrderChange} />
										<label></label>
									</div>
								</div>
								<div className='OrderViewHeaderNew_Inner'>
									<label className='BoxDescriptionTitle'>Is Gift?</label>
									<div className="switch">
										<input type="checkbox" id="toggle" checked={isGiftToggle} onChange={this.handleIsGiftChange} />
										<label></label>
									</div>
								</div>
							</div>
							
							
						</div>
						<div id="RightSideNew">
							<CustomerInfoEdit handleChange={this.handleInputChange} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
							
							<ShippingInfoEdit handleChange={this.handleInputChange} streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip}/>

						</div>
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

