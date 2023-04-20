import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_black.svg'
import add_icon from '../../assets/img/plus_black.svg'

import "../../assets/style/tab_newOrder.css"


import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { updateOrder, deleteOrder, retrieveOrder, retrieveOrders } from '../../store/order_slice'
import {retrieveShippingAddress, updateShippingAddress, retrieveShippingAddresses} from '../../store/address_slice'
import { retrieveCustomer, updateCustomer, retrieveCustomers } from '../../store/customer_slice';
import { retrieveInvoice, updateInvoice, retrieveInvoices } from '../../store/invoice_slice';
import { updateOrderLine, retrieveOrderLines, deleteOrderLine, createOrderLine } from '../../store/orderline_slice'

import FlavorSelector from './orderview_components/FlavorSelector';
import {stateOptions, flavorOptions} from '../../assets/util/dropdown.constants'
import { CustomerInfoEdit, GeneralInfoEdit, GiftInfoEdit, ProductInfoEdit, ShippingInfoEdit } from './EditComponents'
import { filteredList, objectsEqual } from '../../assets/util/functions'

// ------------------------------ ORDER DETAILS: VIEW --------------------------------- //

const GeneralInfoView = ({referenceNumber, datePlaced, trackingNumber, isGift, orderStatus, giftFor, giftMessage, isSelfOrderToggle}) => {
	
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
		
					{!isSelfOrderToggle ? (<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
						{trackingNumber}
					</div>): null}

					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="status"><h4 style={{fontWeight: 'bold'}}>Status</h4></label>
					{orderStatus}
					</div>
				</div>
			
			)
		}


const CustomerInfoView = ({firstName, lastName, email, phoneNumber, isSelfOrderToggle}) => {

	return (
		<div id='' className='GenericBackgroundView'>
			{ isSelfOrderToggle ? (<label className='BoxDescriptionTitle' style={{alignItems:"center"}}> Pickup Information</label>)
			:(<label className='BoxDescriptionTitle' style={{alignItems:"center"}}> Customer Information</label>)}
			<div>
				<div className="OrderViewHeaderNew_Inner">
					<h4 style={{fontWeight: 'bold'}}>Name</h4>
					<div>{firstName} {lastName}</div>
				</div>
				<div className="OrderViewHeaderNew_Inner">
					<h4 style={{fontWeight: 'bold'}}>Email</h4>
					<div>{email} </div>
				</div>
				<div className="OrderViewHeaderNew_Inner">
					<h4 style={{fontWeight: 'bold'}}>Phone</h4>
					<div>{phoneNumber}</div>
				</div>
			</div>
		</div>
	);	
}

const ShippingInfoView = ({  streetAddressOne, streetAddressTwo, city, state, zip}) => {
		return (
			<div id='' className='GenericBackgroundView'>
				<label className='BoxDescriptionTitle'>Shipping Address</label>
	
					<div> 
						<h4>{streetAddressOne}
							<br></br> {streetAddressTwo}
							<br></br> {city}, {state}<br></br>{zip}
						</h4>
					</div>
	
			</div>
		)
}

const InvoiceInfoView = ({invoiceNumber, customerPaid, revenue, expense, invoiceStatus}) => {
	if (invoiceNumber === 'NA') {
		return (
			<div id='NewInvoiceView' className='GenericBackgroundView'>
				<label className='BoxDescriptionTitle'>Invoice</label>
			   	<div className='MissingBackground'>
					Missing!
				 </div>
				<div className="OrderViewHeaderNew_Inner">
				<div> 
					<h4 style={{fontWeight: 'bold'}}>Invoice Number: {invoiceNumber}</h4>
					<h4 style={{fontWeight: 'bold'}}>Customer Paid: ${customerPaid}</h4>

					<h4 style={{fontWeight: 'bold'}}>Invoice Status: {invoiceStatus}</h4> 
				</div>
				
				</div>

		   </div> 
	   );
	}
	else {
		return (

			<div id='NewInvoiceView' className='GenericBackgroundView'>
					<label className='BoxDescriptionTitle'>Invoice</label>
				<div> 
					<h4 style={{fontWeight: 'bold'}}>Customer Paid: ${customerPaid}</h4>
					<h4 style={{fontWeight: 'bold'}}>Invoice Number: {invoiceNumber}</h4>
					<h4 style={{fontWeight: 'bold'}}>Profit: ${customerPaid-expense}</h4>  					{/* revenue */}

				    <h4 style={{fontWeight: 'bold'}}>Expense: ${expense} </h4>
					<h4 style={{fontWeight: 'bold'}}>Invoice Status: {invoiceStatus}</h4>
				</div>
		   </div> 
	   );
	   
	}
}

const ProductInfoView = ({productsOrdered, numberOfFlavors, numberOfLogs}) => {
	return (
		<div id='' className='GenericBackgroundView'>
			<label className='BoxDescriptionTitle'>Flavor Information</label>
				<div className='FlavorInfo'> 
						<div>
							<div className='OrderViewHeaderNew_Inner'>
								<h4 style={{fontWeight: 'bold'}}>Name</h4>
								<h4 style={{fontWeight: 'bold'}}>SKU</h4>
								<h4 style={{fontWeight: 'bold'}}>Qty</h4>

							</div>
							<div className='FlavorLabel'>
							{productsOrdered.map((product) => (
								<div className='OrderViewHeaderNew_Inner' key={product.lineProductID}>
									<label>{product.name}</label>
									<label>{product.lineProductID}</label>
									<label>{product.qtyOrdered}</label>
								</div>
							))}
							</div>
							
						</div>
						<div className='Column'>
							<h4 style={{fontWeight: 'bold'}}>At a Glance:</h4>
							<p><strong>Total Number of Logs:</strong> {numberOfLogs}</p>
							<p><strong>Total Number of Flavors:</strong> {numberOfFlavors}</p>
						</div>
					</div>

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

export const GiftInfoView = ({giftFor, giftMessage}) => {

	return (
		<div id='NewOrderCustomer' className='GenericBackgroundView'>
			<label className='BoxDescriptionTitle'>Gift Information</label>		
			<div className="OrderViewHeaderNew_Inner">
				<h4 style={{fontWeight: 'bold'}}>Gift For </h4>
				<div>
					{giftFor}
				</div>

				</div>
				<div className="OrderViewHeaderNew_Inner">
					<h4 style={{fontWeight: 'bold'}}>Gift Message </h4>
					<div>
						{giftMessage}
					</div>
                </div>
		</div>
	);
}

// ------------------------------ CLASS STARTS HERE --------------------------------- //

class ExistingOrder extends Component {
	constructor(props) {
	  super(props);
	  this.handleInputActiveOrder = this.handleInputActiveOrder.bind(this);
	  this.handleInputActiveCustomer = this.handleInputActiveCustomer.bind(this);
	  this.handleInputActiveAddress = this.handleInputActiveAddress.bind(this);
	  this.handleInputActiveInvoice = this.handleInputActiveInvoice.bind(this);

	  this.handleFlavorChange = this.handleFlavorChange.bind(this);
	  this.handleAddFlavor = this.handleAddFlavor.bind(this);
	  this.handleRemoveFlavor = this.handleRemoveFlavor.bind(this);

	  this.handleSelfOrderChange = this.handleSelfOrderChange.bind(this)
	  this.handleIsGiftChange = this.handleIsGiftChange.bind(this)

	  this.deleteCurrentOrder = this.deleteCurrentOrder.bind(this)
	  this.handleCancelPopup = this.handleCancelPopup.bind(this);

	  this.updateViewOnly = this.updateViewOnly.bind(this)
	  this.saveEdits = this.saveEdits.bind(this)

	//   this.updateState = this.updateState.bind(this)

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
		changingFlavors: [

		],
		numberOfLogs: 0,
		numberOfFlavors: 0,
		viewOnly: true,
		showDeletePopup: false,
		isSelfOrderToggle: false,
		isGiftToggle:false,
		setSaved: false,
	  }

	}

	componentDidMount() {
		const {orderID, activeOrder, activeAddress, activeCustomer, activeInvoice, productsOrdered, numberOfFlavors, numberOfLogs} = this.props.order
		this.setState({
			...this.state,
			orderID: orderID,
			activeOrder: activeOrder,
			activeAddress: activeAddress,
			activeCustomer: activeCustomer,
			activeInvoice: activeInvoice,
			productsOrdered: productsOrdered,
			numberOfFlavors: numberOfFlavors,
			numberOfLogs: numberOfLogs,
			isSelfOrderToggle: (activeOrder.isSelfOrder === 1),
			isGiftToggle: (activeOrder.isGift === 1),
			changingFlavors: [...productsOrdered],
		})
	}

	componentDidUpdate(prevProps, prevState) {

		const {orderID, changingFlavors} = this.state;
			const {customerId} = this.state.activeOrder;

		if(prevState.setSaved !== this.state.setSaved) {
			this.props.retrieveInvoices();
			this.props.retrieveOrders();
			this.props.retrieveCustomers();
			this.props.retrieveOrderLines();
			this.props.retrieveShippingAddresses();
			
			
			// console.log("order ", orderID)
			// this.props.retrieveInvoice(orderID);
			// this.props.retrieveOrder(orderID);
			// this.props.retrieveCustomer(customerId);

			// changingFlavors.forEach(async (product) => {
			// 	const lineOrderID = this.state.orderID;
			// 	const lineProductID = product.lineProductID;
	
			// 	await this.props.findOrderLineByOrderID({ lineOrderID, lineProductID });
			// });	
			
		}
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


	handleFlavorChange(index, quantity, flavor, name) {
		const newFlavors = [...this.state.changingFlavors];
		newFlavors[index] = { qtyOrdered:quantity, lineProductID: flavor, name, lineOrderID: this.state.orderID };
		this.setState({ changingFlavors: newFlavors });
	  }

	handleAddFlavor() {
	const newFlavors = [...this.state.changingFlavors, { qtyOrdered: 1, lineProductID: 'jPL5', name:"Plain", lineOrderID: this.state.orderID }];
	this.setState({ changingFlavors: newFlavors });
	}

	handleRemoveFlavor(index) {
	const newFlavors = this.state.changingFlavors.filter((flavor, i) => i !== index);
	this.setState({ changingFlavors: newFlavors });
	} 

	handleAddQty(index) {
		const newFlavors = [...this.state.changingFlavors];
		const newQuantity = newFlavors[index].qtyOrdered + 1;
		newFlavors[index] = { ...newFlavors[index], qtyOrdered: newQuantity };
		this.setState({ changingFlavors: newFlavors });
	  }
	  
	  handleSubQty(index) {
		const newFlavors = [...this.state.changingFlavors];
		const newQuantity = newFlavors[index].qtyOrdered - 1;
		if (newQuantity > 0) {
		  newFlavors[index] = { ...newFlavors[index], qtyOrdered: newQuantity };
		  this.setState({ changingFlavors: newFlavors });
		}
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
    }

	handleInputActiveCustomer(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
			activeCustomer: {
				...this.state.activeCustomer,
				[name]: value
			}
        });

    }

	handleInputActiveAddress(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
			activeAddress: {
				...this.state.activeAddress,
				[name]: value
			}
        });
    }

	handleInputActiveInvoice(e) {
		this.setState({
			activeInvoice: {
				...this.state.activeInvoice,
				customerPaid: e.target.value
			}
		})
	}


	renderFlavorSelectors = () => {
		console.log(this.state)
		return this.state.changingFlavors.map((product, index) => (
		  <FlavorSelector
			key={index}
			quantity={product.qtyOrdered}
			flavor={product.lineProductID}
			onChange={(quantity, flavor, name) => this.handleFlavorChange(index, quantity, flavor, name)}
			onRemove={() => this.handleRemoveFlavor(index)}

			onAddQty={() => this.handleAddQty(index)}
  			onSubQty={() => this.handleSubQty(index)}
			products={this.props.products}
		  />
		));
	  };


	updateViewOnly() {
		this.setState({
			viewOnly: !this.state.viewOnly
		})
	}

	async saveEdits() {
		const { orderID, activeOrder, activeInvoice, activeAddress, activeCustomer, productsOrdered, changingFlavors } = this.state;
		console.log(this.state.activeOrder);
	  
		try {
			
			if(!this.state.activeOrder.shippingId === 1) {
				await this.props.updateShippingAddress({ id: activeOrder.shippingId, data: activeAddress });
				console.log('Shipping address updated');
			}
		  
			await this.props.updateCustomer({ id: activeOrder.customerId, data: activeCustomer });
			console.log('Customer updated');
			await this.props.updateOrder({ id: orderID, data: activeOrder });
			console.log('Order updated');
			await this.props.updateInvoice({ id: orderID, data: activeInvoice });
		 	 console.log('Invoice updated');
	  
		  // operations on productsOrdered and changingFlavors
		  if (!objectsEqual(productsOrdered, changingFlavors)) {
			console.log(productsOrdered)
			for (let product of productsOrdered) {

			  const lineOrderID = product.lineOrderID;
			  const lineProductID = product.lineProductID;

			  const id = {
				lineOrderID,
				lineProductID
			  }

	  
			  await this.props.deleteOrderLine({id: id});
			  console.log(`Order line deleted for flavor ${lineProductID}`);
			}

			console.log(changingFlavors)
			for (let product of changingFlavors) {
				console.log(product)
				const lineOrderID = product.lineOrderID;
				const lineProductID = product.lineProductID;
			  	const qtyOrdered = product.qtyOrdered;

				  await this.props.createOrderLine({ lineOrderID: lineOrderID, lineProductID:lineProductID, qtyOrdered:qtyOrdered });
			  console.log(`Order line created for flavor ${lineProductID}`);
			}
	  
			// update state
			this.setState({
			  ...this.state,
			  productsOrdered: changingFlavors
			});
		  }
	  
		  // update state
		  this.setState({
			...this.state,
			setSaved: true
		  });

		} catch (error) {
		  console.log(error);
		}
	  }
	  

	deleteCurrentOrder(id, event) {
		this.props
			.deleteOrder({id: (this.state.orderID)}) 
			.then(() => {
				this.setState({ showDeletePopup: false });
				this.props.orderCardOnDelete(id, event)

			})
			.catch((e) => {
				console.log(e);
			});
		
	}

	handleCancelPopup() {
		this.setState({ showDeletePopup: false });
	}


	// ----- Toggles ------- //
	handleSelfOrderChange(e) {
		this.setState({
			...this.state,
			isSelfOrderToggle: !this.state.isSelfOrderToggle,
			activeOrder: {
				...this.state.activeOrder,
				isSelfOrder: this.state.isSelfOrderToggle ? 0 : 1
			},
		})
	}
	
	handleIsGiftChange(e) {
		this.setState({
			...this.state,
			isGiftToggle: !this.state.isGiftToggle,
			activeOrder: {
				...this.state.activeOrder,
				isGift: this.state.isGiftToggle ? 0 : 1,
				giftFor:'',
				giftMessage: '',
			},
		})
	}

	renderViewOnly = () => {

		const {products, activeTabId} = this.props
		const {referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage, isGift, isSelfOrder} = this.state.activeOrder;
		const {firstName, lastName, email, phoneNumber } = this.state.activeCustomer;
		const {streetAddressOne,streetAddressTwo, city, state, zip} = this.state.activeAddress;

		const {isGiftToggle, isSelfOrderToggle} = this.state;

		const {numberOfFlavors, numberOfLogs, productsOrdered,changingFlavors, showDeletePopup} = this.state;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;
		return (
			<div id='OrderViewNew'>
				<div id='OrderViewHeaderNew' >
					<div className='OrderViewHeaderNew_Inner'>
						<label htmlFor="status" className='StatusBackgroundEditView'><i>Status: </i> {orderStatus}</label>
					</div>
					<div className='OrderViewHeaderNew_Inner'>

						{/* on click CANCEL, we clear all fields*/}
						<button className='CancelButton' onClick={() => this.setState({ showDeletePopup: true })} style={{ flex:"wrap"}}>
							<img src={delete_icon} alt='edit order' style={{paddingRight: '10px'}}/>
							<h4>Delete Order</h4>
						</button>	
						{showDeletePopup && (
							<div className="popup-overlay">
							<div className="popup-content">
								<h2>Are you sure you want to delete?</h2>
								<button onClick={(event) => this.deleteCurrentOrder(activeTabId, event)}>Delete</button>
								<button onClick={this.handleCancelPopup}>Cancel</button>
							</div>
							</div>
						)}
						{/* on click EDIT, we change to edit view */}
						<button className='SaveNewOrderActionButton' onClick={this.updateViewOnly}>
							<img src={edit_icon} alt='delete order' style={{paddingRight: '10px'}}/>
							<h4>Edit Order</h4>							
						</button>
					</div>
				</div>
					<div className='MainContainer'>
						<div id='LeftSideNew'>
							<GeneralInfoView referenceNumber={referenceNumber} datePlaced= {datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus} isSelfOrderToggle={isSelfOrderToggle}/>
							<InvoiceInfoView invoiceNumber={invoiceNumber} customerPaid={customerPaid} revenue={revenue} expense={expense} invoiceStatus={invoiceStatus}/>
							<ProductInfoView numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={changingFlavors} products={products}/>

						</div>
						<div id="RightSideNew">
							<CustomerInfoView isSelfOrderToggle={isSelfOrderToggle} firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber}/>
							{!isSelfOrderToggle ? (<ShippingInfoView streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip}/>):null}
							{isGiftToggle ? (<GiftInfoView isGift={isGift} giftFor={giftFor} giftMessage={giftMessage}/>) : null}
							
								<div className='ToggleWrapper'>
									{isSelfOrderToggle ? (<div className='OrderViewHeaderNew_Inner'>
										<label className='BoxDescriptionTitle'>Self Order</label>
										
									</div>) : null}

									{isGiftToggle ? (<div className='OrderViewHeaderNew_Inner'>
										<label className='BoxDescriptionTitle'>Order Is Gift</label>
									</div>) : null}
								</div>
						</div>
									
			</div>
				
		</div>
		);
	}

	renderEditView = () => {
		const {referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage} = this.state.activeOrder;
		const {firstName, lastName, email, phoneNumber } = this.state.activeCustomer;
		const {streetAddressOne,streetAddressTwo, city, state, zip} = this.state.activeAddress;

		const {isGiftToggle, isSelfOrderToggle} = this.state;

		const {numberOfFlavors, numberOfLogs, productsOrdered, changingFlavors} = this.state;
		const {products} = this.props;

		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.state.activeInvoice;
		return (
			<div id='OrderViewNew'>
				<div id='OrderViewHeaderNew' >
					<div className='ToggleWrapper'>
						<div className='OrderViewHeaderNew_Inner'>
							<label className='BoxDescriptionTitle'>Self Order</label>
							<label className="switch">
								<input type="checkbox" id="isSelfOrderToggle" checked={isSelfOrderToggle} onChange={this.handleSelfOrderChange} />
								<span className="slider round"></span>
							</label>
						</div>
						<div className='OrderViewHeaderNew_Inner'>
							<label className='BoxDescriptionTitle'>Is Gift?</label>
							<label className="switch">
								<input type="checkbox" id="isGiftToggle" checked={isGiftToggle} onChange={this.handleIsGiftChange} />
								<span className="slider round"></span>
							</label>
						</div>
					</div>
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
				<div className='MainContainer'>
					<div id='LeftSideNew'>
						<GeneralInfoEdit referenceNumber={referenceNumber} datePlaced={datePlaced} trackingNumber={trackingNumber} orderStatus={orderStatus} handleChange={this.handleInputActiveOrder}/>						
						{/* <ProductInfoEdit handleAddNewFlavor={this.handleAddFlavor} handleRemoveFlavor={this.handleRemoveFlavor} handleFlavorChange={this.handleFlavorChange} productsOrdered={changingFlavors} products={products}/> */}
						<InvoiceInfoView invoiceNumber={invoiceNumber} customerPaid={customerPaid} revenue={revenue} expense={expense} invoiceStatus={invoiceStatus} handleChange={this.handleInputActiveInvoice}/>

						<ProductInfoView numberOfFlavors={numberOfFlavors} numberOfLogs={numberOfLogs} productsOrdered={changingFlavors} products={products}/>
						<i>edit not yet implemented for flavors</i>

						{/* <div id="NewOrderProducts" className="GenericBackgroundAdd">
							<label className="BoxDescriptionTitle">Flavor Information</label>
							{this.renderFlavorSelectors()}
							<button className='CenterEvenAlignFlexRow addFlavorButton' onClick={this.handleAddFlavor}>
								<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
								Add Flavor
							</button>
						</div> */}
					</div>
					<div id="RightSideNew">
						<CustomerInfoEdit firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} handleChange={this.handleInputActiveCustomer}/>

						{!this.state.isSelfOrderToggle && (						
							<ShippingInfoEdit streetAddressOne={streetAddressOne} streetAddressTwo={streetAddressTwo} city={city} state={state} zip={zip} handleChange={()=> this.handleInputActiveAddress}/>
						)}
						{this.state.isGiftToggle && (
							<GiftInfoEdit giftFor={giftFor} giftMessage={giftMessage} handleChange={()=> this.handleInputActiveOrder}/>
						)}
					</div>
				</div>
			</div>
		);
	}
  
	render() {

		const {viewOnly} = this.state;

		if (viewOnly) {
			return this.renderViewOnly()
			
		} else {
			return this.renderEditView()		
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
  
export default connect(mapStateToProps, { 
	deleteOrder, retrieveOrder, retrieveOrders, updateOrder, 
	updateCustomer, retrieveCustomer, retrieveCustomers,
	updateInvoice, retrieveInvoice, retrieveInvoices,
	retrieveShippingAddress, updateShippingAddress, retrieveShippingAddresses, 
	retrieveOrderLines, deleteOrderLine, updateOrderLine,  createOrderLine
 })(ExistingOrder);

