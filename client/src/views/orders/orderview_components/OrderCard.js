import React, {Component} from "react";
import moment from 'moment';
import { connect } from "react-redux";


import { retrieveShippingAddress } from '../../../store/address_slice'
import { retrieveCustomer } from '../../../store/customer_slice';
import { retrieveInvoice } from '../../../store/invoice_slice';
import { findOrderLineByOrderID } from "../../../store/orderline_slice";
import { retrieveProducts } from "../../../store/product_slice";


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
			revenue: "",
			expense: "",
			isPaid: "",
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
        this.props.retrieveProducts();
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
        this.props
			.retrieveShippingAddress({id: shippingId})
			.then((data) => {
				this.setState({
					activeAddress: {
						streetAddressOne: data.payload.streetAddressOne,
						streetAddressTwo: data.payload.streetAddressTwo,
						city: data.payload.city,
						state: data.payload.state,
						zip: data.payload.zip,
					}
				});
				this.getCustomerData(customerId);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	getCustomerData(id) {
		const {orderID} = this.state

		this.props
			.retrieveCustomer({id})
			.then((data) => {
				this.setState({
                    activeCustomer: {
						firstName: data.payload.firstName,
						lastName: data.payload.lastName,
						email: data.payload.email,
						phoneNumber: data.payload.phoneNumber,
					} 
				});
				this.findOrderLinesByID(orderID);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	findOrderLinesByID(id) {
		const {products} = this.props
		this.props
			.findOrderLineByOrderID({ id })
			.then((data) => {
				let i = 0;
				let logs = 0;
                let flavors = data.payload.length;

				const productList = [];
				while (i < flavors) {
					const {name} = products.filter(product => product.sku === data.payload[i].lineProductID)[0]
                    const newProduct = {
                        lineOrderID: data.payload[i].lineOrderID,
                        lineProductID: data.payload[i].lineProductID,
                        qtyOrdered: data.payload[i].qtyOrdered,
						name: name
                    }
					productList.push(newProduct)
					
                    logs+= data.payload[i].qtyOrdered;
					i++;

				}

				this.setState({
					productsOrdered: productList,
					numberOfLogs: logs,
                    numberOfFlavors: flavors
				});

				this.getInvoiceData(id);
				
			})
			.catch((e) => {
				console.log(e);
			});
	}


	getInvoiceData(id) {
		this.props
			.retrieveInvoice({id})
			.then((data) => {
				this.setState({
					activeInvoice: {
						invoiceNumber: data.payload.invoiceNumber,
						revenue: data.payload.revenue,
						expense: data.payload.expense,
						isPaid: data.payload.isPaid,
					}
				});
			})
			.catch((e) => {
			console.log(e);
			});
	}

	render() {
		const {color} = this.props;
		const {orderID, activeOrder, activeAddress, activeCustomer, activeInvoice, productsOrdered, numberOfFlavors, numberOfLogs} = this.state

		const existingOrderData = {
			order: {
				orderID:orderID, 
				activeOrder: activeOrder, 
				activeAddress: activeAddress, 
				activeCustomer: activeCustomer, 
				activeInvoice:activeInvoice, 
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
  
export default connect(mapStateToProps, { retrieveProducts, retrieveShippingAddress, retrieveCustomer, findOrderLineByOrderID, retrieveInvoice })(OrderCard);