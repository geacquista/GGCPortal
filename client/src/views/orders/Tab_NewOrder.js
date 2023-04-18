import add_icon from '../../assets/img/plus_black.svg'
import edit_icon from '../../assets/img/edit_white.svg'
import delete_icon from '../../assets/img/trash_black.svg'
import "../../assets/style/tab_newOrder.css"

import React, { useState, Component } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import { createOrder } from '../../store/order_slice'
import {createShippingAddress} from '../../store/address_slice'
import { createCustomer, createCustomerWithAddress, updateCustomer } from '../../store/customer_slice';
import { createOrderLine } from "../../store/orderline_slice";
import { updateInvoice } from '../../store/invoice_slice' ;
import {stateOptions} from '../../assets/util/dropdown.constants'
import FlavorSelector from './orderview_components/FlavorSelector'
import { filteredList } from '../../assets/util/functions'
		
// ------------------------------ INVOICE VIEW : NEW ORDER --------------------------------- //

const default_state = {
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
			invoiceStatus: "Missing",
		},
		productsOrdered: [
			{ quantity: 1, flavor: 'Plain' },
		],
		numberOfLogs: 0,
		numberOfFlavors: 0,
		viewOnly: false,
		isSelfOrderToggle:false,
		isGiftToggle:false
}

// ------------------------------ CLASS STARTS HERE --------------------------------- //

class NewOrder extends Component {
	constructor(props) {
	  super(props);

	  	// Form edit handlers
		this.handleInputActiveOrder = this.handleInputActiveOrder.bind(this);
		this.handleInputActiveCustomer = this.handleInputActiveCustomer.bind(this);
		this.handleInputActiveAddress = this.handleInputActiveAddress.bind(this);

		this.handleFlavorChange = this.handleFlavorChange.bind(this);
		this.handleAddFlavor = this.handleAddFlavor.bind(this);
		this.handleRemoveFlavor = this.handleRemoveFlavor.bind(this);

		this.handleCustomerPaid = this.handleCustomerPaid.bind(this);
		

		// Toggle handlers
		this.handleSelfOrderChange = this.handleSelfOrderChange.bind(this)
		this.handleIsGiftChange = this.handleIsGiftChange.bind(this)


		// Operations
		this.deleteCurrOrder = this.deleteCurrOrder.bind(this)
		this.submitOrder = this.submitOrder.bind(this)

		this.refreshState = this.refreshState.bind(this)

		// Set default state
	  	this.state = default_state
	}

	// NOT WORKING
	refreshState() {
		this.setState({
			...default_state
		})
	}

	// RENDERING COMPONENTS
	renderFlavorSelectors = () => {
		return this.state.productsOrdered.map((flavor, index) => (
		  <FlavorSelector
			key={index}
			quantity={flavor.quantity}
			flavor={flavor.flavor}
			onChange={(quantity, flavor) => this.handleFlavorChange(index, quantity, flavor)}
			onRemove={() => this.handleRemoveFlavor(index)}
			products={this.props.products}
		  />
		));
	  };

	 renderInvoiceView = () => {
		return (
			<div id='NewInvoiceView' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle'>Invoice</label>
			   	<div className='MissingBackground'>
					Invoice Generated Upon Save
				</div>
				<div className="OrderViewHeaderNew_Inner">
					
                  <label htmlFor="customerPaid"><h4 style={{fontWeight: 'bold'}}><i>Internal Use Only:</i>  Customer Paid</h4></label>
                  <input
                    type="decimal"
                    className="inputField"
                    id="customerPaid"
                    required
                    value={this.state.customerPaid}
                    onChange={this.handleCustomerPaid}
                    name="customerPaid"
                  />
                </div>
		   </div> 
	   );
	 } 

	 renderGeneralInfoEdit = () => {
		return(
            <div id='NewOrderGeneral' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
                <div className="OrderViewHeaderNew_Inner">
					
                  <label htmlFor="referenceNumber"><h4 style={{fontWeight: 'bold'}}>Reference #<span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="referenceNumber"
                    required
                    value={this.state.activeOrder.referenceNumber}
                    onChange={this.handleInputActiveOrder}
                    name="referenceNumber"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="datePlaced"><h4 style={{fontWeight: 'bold'}}>Date Placed<span className="required">	*</span></h4></label>
                  <input
                    type="date"
                    className="inputField"
                    id="datePlaced"
                    value={this.state.activeOrder.datePlaced || ''}
                    onChange={this.handleInputActiveOrder}
                    name="datePlaced"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="trackingNumber"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
				    <input
                    type="text"
                    className="inputField"
                    id="trackingNumber"
                    value={this.state.activeOrder.trackingNumber || ''}
                    name="trackingNumber"
					style={{ boxShadow:"none"}}
					disabled
                  />
                </div>

            </div>
        
	)
	 }

	renderCustomerInfoEdit = () => {
		const {firstName, lastName, email, phoneNumber } = this.state.activeCustomer;
		const handleChange = this.handleInputActiveCustomer
		return (
			<div id='NewOrderCustomer' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle'>
				{!this.state.isSelfOrderToggle ? (
					"Customer Information"
					) : (
						"Pickup Information"
					)

				}
				</label>
				<div className='CustomerNameView_Layout'>
					<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="firstName"><h4 style={{fontWeight: 'bold', paddingRight:'1vw'}}>First <span className="required">	*</span>	</h4></label>
						<input
							type="text"
							className="inputField"
							id="firstName"
							required
							value={firstName || ''}
							onChange={handleChange}
							name="firstName"
							style={{marginRight:'2vw'}}
						/>
					</div>
					<div className="OrderViewHeaderNew_Inner">
					  <label htmlFor="lastName"><h4 style={{fontWeight: 'bold'}}>Last <span className="required">	*</span></h4></label>
					  <input
						type="text"
						className="inputField"
						id="lastName"
						required
						value={lastName || ''}
						onChange={handleChange}
						name="lastName"
					  />
					</div>
				</div>
	
				<div className='OrderViewHeaderNew_Inner'>
					  <label htmlFor="email"><h4 style={{fontWeight: 'bold'}}>Email <span className="required">	*</span></h4></label>
					  <input
						type="text"
						className="inputField"
						id="email"
						required
						value={email || ''}
						onChange={ handleChange}
						name="email"
						style={{width:"85%"}}
					  />
				</div>
				<div className='OrderViewHeaderNew_Inner'>
					  <label htmlFor="phoneNumber"><h4 style={{fontWeight: 'bold'}}>Phone <span className="required">	*</span></h4></label>
					  <input
						type="text"
						className="inputField"
						id="phoneNumber"
						required
						value={phoneNumber || ''}
						onChange={handleChange}
						name="phoneNumber"
						style={{width:"85%"}}
					  />
				</div>
			</div>
		)
	}

	renderGiftEditInfo = ()  => {
		const {giftFor, giftMessage} = this.state.activeOrder;
		const handleChange = this.handleInputActiveOrder;

		return (
			<div id='NewOrderCustomer' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle'>Gift Information</label>		
				<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="giftFor"><h4 style={{fontWeight: 'bold'}}>Gift For <span className="required">	*</span>	</h4></label>
						<input
							type="text"
							className="inputField"
							id="giftFor"
							required
							value={giftFor || ''}
							onChange={handleChange}
							name="giftFor"
						/>
					</div>
					<div className="OrderViewHeaderNew_Inner">
					  <label htmlFor="giftMessage"><h4 style={{fontWeight: 'bold'}}>Gift Message <span className="required">	*</span></h4></label>
					  <input
						type="textarea" rows="4" cols="50"
						className="inputField"
						id="giftMessage"
						required
						value={giftMessage || ''}
						onChange={handleChange}
						name="giftMessage"
					  />
					</div>
			</div>
		);
	}
	
	renderShippingEditInfo = () => {
		const {streetAddressOne, streetAddressTwo, city, state, zip} = this.state.activeAddress;
		const handleChange = this.handleInputActiveAddress;
		return (
			<div id='NewOrderShipping' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle' >Shipping Information</label>
				<div className="OrderViewHeaderNew_Inner">
					  <label htmlFor="streetAddressOne"><h4 style={{fontWeight: 'bold'}}>Street Address One <span className="required">	*</span></h4></label>
					  <input
						type="text"
						className="inputField"
						id="streetAddressOne"
						required
						value={streetAddressOne || ''}
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
						value={streetAddressTwo || ''}
						onChange={handleChange}
						name="streetAddressTwo"
						style={{width:"65%"}}
					  />
					</div>
					<div className="OrderViewHeaderNew_Inner">
						<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="city"><h4 style={{fontWeight: 'bold'}}>City <span className="required">	*</span></h4></label>
						<input
							type="text"
							className="inputField"
							id="city"
							required
							value={city || ''}
							onChange={handleChange}
							name="city"
							style={{width:"75%"}}
						/>
						</div>
						<div className="OrderViewHeaderNew_Inner">
							<label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State <span className="required">	*</span></h4></label>
								<select className="dropdown" value={state} onChange={handleChange} name="state">
									<option value="">--Select--</option>
									{stateOptions.map((option) => (
										<option key={option.value} value={option.value}>
										{option.label}
										</option>
									))}
									</select>
						</div>
						<div className="OrderViewHeaderNew_Inner">
							  <label htmlFor="zip"><h4 style={{fontWeight: 'bold'}}>Zip <span className="required">	*</span></h4></label>
								<input
									type="text"
									className="inputField"
									id="zip"
									required
									value={zip || ''}
									onChange={handleChange}
									name="zip"
									style={{width:"100%"}}
								/>
							</div>
					</div>
		</div>
		)
	}
	


	//------ HANDLERS --------//
	handleFlavorChange(index, quantity, flavor) {
		const newFlavors = [...this.state.productsOrdered];
		newFlavors[index] = { quantity, flavor };
		this.setState({ productsOrdered: newFlavors });
	}
	
	handleAddFlavor() {
	const newFlavors = [...this.state.productsOrdered, { quantity: 1, flavor: 'jPL5' }];
	this.setState({ productsOrdered: newFlavors });
	}

	handleRemoveFlavor(index) {
	const newFlavors = this.state.productsOrdered.filter((flavor, i) => i !== index);
	this.setState({ productsOrdered: newFlavors });
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

	// Toggles
	handleSelfOrderChange(e) {
		this.setState({
			...this.state,
			isSelfOrderToggle: !this.state.isSelfOrderToggle,
			activeOrder: {
				...this.state.activeOrder,
				isSelfOrder: this.state.isSelfOrderToggle ? 0 : 1
			},
			activeAddress: {
				shippingId: 1
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
	
	// Invoice add-new
	handleCustomerPaid(e) {
		this.setState({
			activeInvoice: {
				...this.state.activeInvoice,
				customerPaid: e.target.value
			}
		})
	}


	//------- CRUD ------//

	// Good luck to the next person who has to look at this code
	async submitOrder() {
		const {activeAddress, activeCustomer, isGiftToggle} = this.state;

		try {
			const addressExists = filteredList({
				list: this.props.shippingAddresses,
				activeObject: activeAddress,
				fieldsToCheck: ["streetAddressOne", "streetAddressTwo", "city", "state", "zip"],
			});
	
			if (addressExists) {
				this.setState({
					...this.state,
					activeOrder: {
						...this.state.activeOrder,
						shippingId: addressExists.shippingID
					}
				});
			} else {
				const {streetAddressOne, streetAddressTwo, city, state, zip} = this.state.activeAddress;
				//create an address and get the new shippingId
				const data = await this.props.createShippingAddress({streetAddressOne, streetAddressTwo, city, state, zip});
				this.setState({
					...this.state,
					activeOrder: {
						...this.state.activeOrder,
						shippingId: data.payload.shippingID
					}
				});
				
			}
	
			const customerExists = filteredList({
				list: this.props.customers,
				activeObject: activeCustomer,
				fieldsToCheck: ["email"],
			});
	
			if (customerExists) {
			// take the customerId that exists and dont do anything to it
				this.setState({
					...this.state,
					activeOrder: {
						...this.state.activeOrder,
						customerId: customerExists.customerID
					}
				})
				// WEIRD CASE: if it exists, and addresses are not the same, update it in the backend
				if (!isGiftToggle && customerExists.customerShippingId !== this.state.activeOrder.shippingId) {
					// update the customer's most recent shipping address
					await this.props.updateCustomer({ id: this.state.activeOrder.customerId, data: this.state.activeCustomer });
				}
	
			} else {

				const {firstName, lastName, email, phoneNumber} = this.state.activeCustomer;
				const customerShippingId = this.state.activeOrder.shippingId;

				if (isGiftToggle) {
					//add the customer without an address mapped to it				
					const data = await this.props.createCustomer({firstName, lastName, email, phoneNumber});
					this.setState({
						...this.state,
						activeOrder: {
							...this.state.activeOrder,
							customerId: data.payload.customerID
						}
					});
				} else {
					// just adding the customer mapped to the address
					const data = await this.props.createCustomerWithAddress({firstName, lastName, email, phoneNumber, customerShippingId});
					this.setState({
						...this.state,
						activeOrder: {
							...this.state.activeOrder,
							customerId: data.payload.customerID
						}
					});
				}
				
			} 
	
			console.log(this.state.activeOrder)
			const { referenceNumber, datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatus, shippingId, customerId, isSelfOrder } = this.state.activeOrder;
	
			// add the order and get orderID
			const orderData = await this.props.createOrder({ referenceNumber, datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatus, shippingId, customerId, isSelfOrder });
			
			this.setState({
				...this.state,
				orderID: orderData.payload.orderID
			});

			const {orderID, activeInvoice, productsOrdered} = this.state;

			if(activeInvoice.customerPaid > 0) {
				const data = await this.props.updateInvoice({ id: orderID, data: activeInvoice });
			}

			//iterate through my list of productsOrdered, for each add orderline (newOrderID, sku, quantity)

			productsOrdered.forEach(async (product) => {
				const lineOrderID = this.state.orderID;
				const lineProductID = product.flavor;
				const qtyOrdered = product.quantity;
			  
				await this.props.createOrderLine({ lineOrderID, lineProductID, qtyOrdered });
			  });			  

			
		} catch (error) {

			//TODO render an im sorry message
			console.log(error)
		}

		this.refreshState()
	}

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
		const {streetAddressOne,streetAddressTwo, city, state, zip} = this.state.activeAddress;
	
		const {isGiftToggle, isSelfOrderToggle} = this.state;

			return (
				<div id='OrderViewNew'>
					<div id='OrderViewHeaderNew' >
						<div className='ToggleWrapper'>
							<div className='OrderViewHeaderNew_Inner'>
								<label className='BoxDescriptionTitle'>Self Order</label>
								<label className="switch">
									<input type="checkbox" id="self_order_toggle" checked={isSelfOrderToggle} onChange={this.handleSelfOrderChange} />
									<span className="slider round"></span>
								</label>
							</div>
							<div className='OrderViewHeaderNew_Inner'>
								<label className='BoxDescriptionTitle'>Is Gift?</label>
								<label className="switch">
									<input type="checkbox" id="is_gift_toggle" checked={isGiftToggle} onChange={this.handleIsGiftChange} />
									<span className="slider round"></span>
								</label>
							</div>
						</div>
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
							<button className='SaveNewOrderActionButton' onClick={this.submitOrder}>
								<img src={edit_icon} alt='add order' style={{paddingRight: '10px'}}/>
								<h4>Save Order</h4>
							</button>	
						</div>
					</div>
					<div className='MainContainer'>
						<div id='LeftSideNew'>
							{this.renderGeneralInfoEdit()}
							<div id="NewOrderProducts" className="GenericBackgroundAdd">
								<label className="BoxDescriptionTitle">Order Details</label>
								{this.renderFlavorSelectors()}
								<button className='CenterEvenAlignFlexRow addFlavorButton' onClick={this.handleAddFlavor}>
									<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
									Add Flavor
								</button>
							</div>
							{this.renderInvoiceView()}
							
						</div>
						<div id="RightSideNew">
							{this.renderCustomerInfoEdit()}
							{!this.state.isSelfOrderToggle && this.renderShippingEditInfo()}
							{this.state.isGiftToggle && this.renderGiftEditInfo()}
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
  
export default connect(mapStateToProps, { createOrder, createCustomer, createCustomerWithAddress, updateCustomer, updateInvoice, createShippingAddress, createOrderLine })(NewOrder);

