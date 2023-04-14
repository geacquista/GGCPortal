import add_icon from '../../assets/img/plus_black.svg'
import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_black.svg'
import "../../assets/style/tab_newOrder.css"

import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { createOrder } from '../../store/order_slice'
import {createShippingAddress} from '../../store/address_slice'
import { createCustomer } from '../../store/customer_slice';
import { createOrderLine } from "../../store/orderline_slice";
import { retrieveProducts } from "../../store/product_slice";
import Dropdown  from './orderview_components/Dropdown';
import {stateOptions} from '../../assets/util/dropdown.constants'
import { CustomerInfoEdit, GeneralInfoEdit, ProductInfoEdit, ShippingInfoEdit } from './EditComponents'

		
// ------------------------------ VIEW --------------------------------- //


const InvoiceInfoView = ({invoiceNumber, revenue, expense, orderStatus}) => {

		return (
			<div id='NewInvoiceView' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle'>Invoice</label>
			   	<div className='MissingBackground'>Invoice Generated Upon Save</div>
		   </div> 
	   );
	
}





// ------------------------------ CLASS STARTS HERE --------------------------------- //

class NewOrder extends Component {
	constructor(props) {
	  super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleTo = this.handleInputChange.bind(this)
		this.refreshState = this.refreshState.bind(this)

		this.handleSelfOrderChange = this.handleSelfOrderChange.bind(this)
		this.handleIsGiftChange = this.handleIsGiftChange.bind(this)


		this.deleteCurrOrder = this.deleteCurrOrder.bind(this)
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
			isGift: 0,
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

	// NOT WORKING
	refreshState() {
		this.setState({
				orderID: -1,
				activeOrder: {
					referenceNumber: "",
					datePlaced: "",
					orderStatus: "Placed",
					trackingNumber: "",
					giftFor: "",
					giftMessage: "",
					isGift: 0,
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
			  
		})

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
		console.log("clicking")
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
		const {products} = this.props;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;
	
		const {isGiftToggle, isSelfOrderToggle} = this.state;
			return (
				<div id='OrderViewNew'>
					<div id='OrderViewHeaderNew' >
						<div className='OrderViewHeaderNew_Inner'>
							<label htmlFor="status" className='StatusBackgroundAdd'><i>Status: </i> {orderStatus}</label>
						</div>
						<div className='OrderViewHeaderNew_Inner'>

							{/* on click CANCEL, we clear all fields*/}
							<button className='CancelButton' onClick={(this.refreshState)} style={{ flex:"wrap"}}>
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
					<div className='MainContainer'>
						<div id='LeftSideNew'>
							<GeneralInfoEdit handleChange={this.handleInputActiveOrder} referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus}/>
							<ProductInfoEdit handleChange={this.handleInputChange} numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={productsOrdered} products={products}/>
							<InvoiceInfoView handleChange={this.handleInputChange} invoiceNumber={invoiceNumber} revenue={revenue} expense={expense} orderStatus={orderStatus}/>
							
							
							
							
						</div>
						<div id="RightSideNew">
							<CustomerInfoEdit handleChange={this.handleInputChange} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
							<ShippingInfoEdit handleChange={this.handleInputChange} streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip}/>
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
  
export default connect(mapStateToProps, { createOrder, createCustomer, createOrderLine, createShippingAddress, createOrderLine })(NewOrder);

