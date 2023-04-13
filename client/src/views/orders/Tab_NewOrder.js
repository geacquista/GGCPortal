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

// export default NewOrder;

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
import FlavorSelector from './orderview_components/FlavorSelector';

const stateOptions = [
	{value: "alabama", label: "AL"},
	{value: "alaska", label: "AK"},
	{value: "arizona", label: "AZ"},
	{value: "arkansas", label: "AR"},
	{value: "california", label: "CA"},
	{value: "colorado", label: "CO"},
	{value: "connecticut", label: "CT"},
	{value: "delaware", label: "DE"},
	{value: "florida", label: "FL"},
	{value: "georgia", label: "GA"},
	{value: "hawaii", label: "HI"},
	{value: "idaho", label: "ID"},
	{value: "illinois", label: "IL"},
	{value: "indiana", label: "IN"},
	{value: "iowa", label: "IA"},
	{value: "kansas", label: "KS"},
	{value: "kentucky", label: "KY"},
	{value: "louisiana", label: "LA"},
	{value: "maine", label: "ME"},
	{value: "maryland", label: "MD"},
	{value: "massachusetts", label: "MA"},
	{value: "michigan", label: "MI"},
	{value: "minnesota", label: "MN"},
	{value: "mississippi", label: "MS"},
	{value: "missouri", label: "MO"},
	{value: "montana", label: "MT"},
	{value: "nebraska", label: "NE"},
	{value: "nevada", label: "NV"},
	{value: "new hampshire", label: "NH"},
	{value: "new jersey", label: "NJ"},
	{value: "new mexico", label: "NM"},
	{value: "new york", label: "NY"},
	{value: "north carolina", label: "NC"},
	{value: "north dakota", label: "ND"},
	{value: "ohio", label: "OH"},
	{value: "oklahoma", label: "OK"},
	{value: "oregon", label: "OR"},
	{value: "pennsylvania", label: "PA"},
	{value: "rhode island", label: "RI"},
	{value: "south carolina", label: "SC"},
	{value: "south dakota", label: "SD"},
	{value: "tennessee", label: "TN"},
	{value: "texas", label: "TX"},
	{value: "utah", label: "UT"},
	{value: "vermont", label: "VT"},
	{value: "virginia", label: "VA"},
	{value: "washington", label: "WA"},
	{value: "west virginia", label: "WV"},
	{value: "wisconsin", label: "WI"},
	{value: "wyoming", label: "WY"}
	];
		
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
					
                  <label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #<span className="required">	*</span></h4></label>
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
                  <label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed<span className="required">	*</span></h4></label>
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
			
			
			<div className='CustomerNameView_Layout'>
				<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="first"><h4 style={{fontWeight: 'bold', paddingRight:'1vw'}}>First <span className="required">	*</span>	</h4></label>
					<input
						type="text"
						className="inputField"
						id="first"
						required
						defaultValue={firstName || ''}
						onChange={handleChange}
						name="first"
						style={{marginRight:'2vw'}}
					/>
				</div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="last"><h4 style={{fontWeight: 'bold'}}>Last <span className="required">	*</span></h4></label>
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
                  <label htmlFor="email"><h4 style={{fontWeight: 'bold'}}>Email <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="email"
                    required
                    defaultValue={email || ''}
                    onChange={ handleChange}
                    name="email"
					style={{width:"85%"}}
                  />
			</div>
			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="phone"><h4 style={{fontWeight: 'bold'}}>Phone <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="phone"
                    required
                    defaultValue={phoneNumber || ''}
                    onChange={handleChange}
                    name="phone"
					style={{width:"85%"}}
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
                  <label htmlFor="streetAddressOne"><h4 style={{fontWeight: 'bold'}}>Street Address One <span className="required">	*</span></h4></label>
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
					<label htmlFor="city"><h4 style={{fontWeight: 'bold'}}>City <span className="required">	*</span></h4></label>
					<input
						type="text"
						className="inputField"
						id="city"
						required
						defaultValue={city || ''}
						onChange={handleChange}
						name="city"
						style={{width:"75%"}}
					/>
					</div>
					<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State <span className="required">	*</span></h4></label>
							<select className="dropdown" value={state} onChange={handleChange}>
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
								defaultValue={zip || ''}
								onChange={handleChange}
								name="zip"
								style={{width:"100%"}}
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


const ProductInfoEdit = ({ handleAddNewFlavor}) => {
	const [flavors, setFlavors] = useState([{ quantity: 0, flavor: 'Plain' }]);

	const handleFlavorChange = (index, quantity, flavor) => {
	  const newFlavors = [...flavors];
	  newFlavors[index] = { quantity, flavor };
	  setFlavors(newFlavors);
	};
  
	const handleAddFlavor = () => {
	  const newFlavors = [...flavors, { quantity: 0, flavor: 'Plain' }];
	  setFlavors(newFlavors);
	};
  
	const handleRemoveFlavor = (index) => {
	  const newFlavors = flavors.filter((flavor, i) => i !== index);
	  setFlavors(newFlavors);
	};
  
	return (
	  <div id="NewOrderProducts" className="GenericBackgroundAdd">
		<label className="BoxDescriptionTitle">Order Details</label>
		{flavors.map((flavor, index) => (
		  <FlavorSelector
			key={index}
			quantity={flavor.quantity}
			flavor={flavor.flavor}
			onChange={(quantity, flavor) => handleFlavorChange(index, quantity, flavor)}
			onRemove={() => handleRemoveFlavor(index)}
		  />
		))}
		<button className='CenterEvenAlignFlexRow addFlavorButton' onClick={handleAddFlavor}>
			<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
			Add Flavor
		</button>
	  </div>
	);

}
// ------------------------------ CLASS STARTS HERE --------------------------------- //

class NewOrder extends Component {
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
		const {products} = this.state;

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

