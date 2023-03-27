import React, {Component} from "react";
import moment from 'moment';
import { connect } from "react-redux";

class OrderCard extends Component {
	constructor(props) {
	  super(props);

	  this.getShippingInfo = this.getShippingInfo.bind(this);
	  this.getCustomerData = this.getCustomerData.bind(this);
	  this.getInvoiceData = this.getInvoiceData.bind(this);
	  this.findOrderLinesByID = this.findOrderLinesByID.bind(this);


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
		const {orderID, referenceNumber, datePlaced, orderStatus, trackingNumber, giftFor, giftMessage, isGift, customerId, shippingId, isSelfOrder} = this.props.order
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
				customerId: customerId,
				shippingId: shippingId,
				isSelfOrder: isSelfOrder,
			}
		})
		this.getShippingInfo(shippingId, customerId);


	}

	getShippingInfo(shippingId, customerId) {
		const filteredAddress = this.props.shippingAddresses.find(address => address.shippingID === shippingId)
		const {streetAddressOne, streetAddressTwo, city, state, zip} = filteredAddress;

		this.setState({
			activeAddress: {
				streetAddressOne: streetAddressOne,
				streetAddressTwo: streetAddressTwo,
				city: city,
				state: state,
				zip: zip,
			}
		});
		this.getCustomerData(customerId);
		
	}

	getCustomerData(customerId) {
		const filteredCustomer = this.props.customers.find(customer => customer.customerID === customerId)
		const {firstName, lastName, email, phoneNumber} = filteredCustomer;
		
		this.setState({
			activeCustomer: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
			} 
		});
		this.findOrderLinesByID();
	
	}

	findOrderLinesByID() {
		const {orderID} = this.props.order
		const {products, orderline} = this.props

		const filteredOrderLines = orderline.filter(line => line.lineOrderID === orderID)
		
		let i = 0;
		let logs = 0;
		let flavors = filteredOrderLines.length;

		const productList = [];
		while (i < flavors) {
			const {name} = products.filter(product => product.sku === filteredOrderLines[i].lineProductID)[0]
			const newProduct = {
				lineOrderID: filteredOrderLines[i].lineOrderID,
				lineProductID: filteredOrderLines[i].lineProductID,
				qtyOrdered: filteredOrderLines[i].qtyOrdered,
				name: name
			}
			productList.push(newProduct)
			
			logs+= filteredOrderLines[i].qtyOrdered;
			i++;

		}

		this.setState({
			productsOrdered: productList,
			numberOfLogs: logs,
			numberOfFlavors: flavors
		});

		this.getInvoiceData(orderID);
		
	}


	getInvoiceData(id) {
		const {invoices} = this.props
		console.log(id)
		console.log(invoices)

		const filteredInvoice = invoices.find(invoice => invoice.orderID === id)		
		this.setState({
			activeInvoice: {
				invoiceNumber: filteredInvoice.invoiceNumber || "NA",
				customerPaid: filteredInvoice.customerPaid,
				revenue: filteredInvoice.revenue,
				expense: filteredInvoice.expense,
				isPaid: filteredInvoice.isPaid,
			}
		});
			
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
		shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		invoices: state.invoices,
		orderline: state.orderline,
		products: state.products
	};
  };
  
export default connect(mapStateToProps, {  })(OrderCard);