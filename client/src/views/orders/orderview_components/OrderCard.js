import React, {Component} from "react";
import moment from 'moment';
import { connect } from "react-redux";

class OrderCard extends Component {
	constructor(props) {
	  super(props);

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
			isSelfOrder:""

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
			customerPaid: 0,
			revenue: 0,
			expense: 0,
			invoiceStatus: "",
		},
		productsOrdered: [
			
		],
		numberOfLogs: 0,
		numberOfFlavors: 0,
	  }
	}

	handleOnClick(data) {
		this.props.orderCardOnClick(data)
	}


	componentDidMount() {
		console.log(this.props)
		const {orderID, referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage, isGift, customerId, shippingId, isSelfOrder} = this.props.order;
		const {streetAddressOne, streetAddressTwo, city, state, zip} = this.props.address;
		const {firstName, lastName, email, phoneNumber} = this.props.customer;
		const {invoiceNumber, customerPaid, revenue, expense, invoiceStatus} = this.props.invoice;
		const {products, orderline} = this.props
		
		let i = 0;
		let logs = 0;
		let flavors = orderline.length;

		const productList = [];
		while (i < flavors) {
			const {name} = products.filter(product => product.sku === orderline[i].lineProductID)[0]
			const newProduct = {
				lineOrderID: orderline[i].lineOrderID,
				lineProductID: orderline[i].lineProductID,
				qtyOrdered: orderline[i].qtyOrdered,
				name: name
			}
			productList.push(newProduct)
			
			logs+= orderline[i].qtyOrdered;
			i++;

		}

		this.setState({
			orderID: parseInt(orderID),
			activeOrder: {
				referenceNumber: referenceNumber,
				datePlaced: datePlaced,
				orderStatus: orderStatus,
				trackingNumber: trackingNumber,
				giftFor: giftFor,
				giftMessage: giftMessage,
				isGift: isGift,
				customerId: (customerId),
				shippingId: (shippingId),
				isSelfOrder: isSelfOrder,
			},
			activeAddress: {
				streetAddressOne: streetAddressOne,
				streetAddressTwo: streetAddressTwo,
				city: city,
				state: state,
				zip: zip,
			},
			activeCustomer: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
			} ,
			activeInvoice: {
				invoiceNumber: invoiceNumber || "NA",
				customerPaid: customerPaid,
				revenue: revenue,
				expense: expense,
				invoiceStatus: invoiceStatus,
			},
			productsOrdered: productList,
			numberOfLogs: logs,
			numberOfFlavors: flavors
			
		})
	}



	render() {
		const {color} = this.props;
		const {orderID, activeOrder, activeAddress, activeCustomer, activeInvoice, productsOrdered, numberOfFlavors, numberOfLogs} = this.state

		const existingOrderData = {
			order: {
				orderID: orderID, 
				activeOrder: activeOrder, 
				activeAddress: activeAddress, 
				activeCustomer: activeCustomer, 
				activeInvoice: activeInvoice, 
				productsOrdered: productsOrdered, 
				numberOfFlavors: numberOfFlavors, 
				numberOfLogs: numberOfLogs
			},
			lastName: activeCustomer.lastName
		}

		return (
			<div className='OrderCard' onClick={() => this.handleOnClick(existingOrderData)}>
				<div className='OrderCardHeader' style={{ backgroundColor: color }}>
					<h4 style={{ fontWeight: 'bold' }}>{activeCustomer.lastName}, {activeCustomer.firstName}</h4>
				</div>
				
				<div className='OrderCardContent'>
					<h4>Reference: {activeOrder.referenceNumber}</h4>
					<h4>Invoice: {(activeInvoice.invoiceNumber === undefined) ? 'NA' : activeInvoice.invoiceNumber}</h4>
					<h4>Logs Ordered: {numberOfLogs}</h4>
					<h4>Date Placed: {moment(activeOrder.datePlaced).format('MM/DD/YYYY')}</h4>
				</div>	
			</div>
		);	
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
		products: state.products
	};
  };
  
export default connect(mapStateToProps, {  })(OrderCard);