import React, {Component} from "react";
import moment from 'moment';
import { connect } from "react-redux";


import { retrieveCustomer } from "../../../store/customer_slice";
import { retrieveInvoice } from "../../../store/invoice_slice";
import { findOrderLineByOrderID } from "../../../store/orderline_slice";
import { retrieveOrder } from "../../../store/order_slice";


class OrderCard extends Component {
	constructor(props) {
	  super(props);

	  this.handleOnClick = this.handleOnClick.bind(this);
	  this.getCustomerData = this.getCustomerData.bind(this);
	  this.getInvoiceData = this.getInvoiceData.bind(this);
	  this.findOrderLinesByID = this.findOrderLinesByID.bind(this);

	  this.state = {
		firstName: "",
		lastName: "",
		referenceNumber: "",
			
		invoiceNumber: "NA",
		numberOfLogs: 0,
		datePlaced: '2022-01-17T05:00:00.000Z',

		cardIDs: {
			orderId: -1,
			customerId: -1,
		}
		
	 };
	}

	handleOnClick(data) {
		this.props.orderCardOnClick(data)
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getCustomerData(this.props.order.customerId, this.props.order)
	}

	getCustomerData(id, order) {
		this.props
			.retrieveCustomer({id})
			.then((data) => {
				console.log(data);
				this.setState({

					firstName: data.payload.firstName,
					lastName: data.payload.lastName,
					datePlaced: order.datePlaced,
					
					cardIDs: {
						orderId: id,
						customerId: data.payload.customerID,
					}

					
				});
				this.getInvoiceData(this.props.order.orderID);
			})
			.catch((e) => {
			console.log(e);
			});
	}

	getInvoiceData(id) {

		this.props
			.retrieveInvoice({id})
			.then((data) => {
				console.log(data);
				this.setState({

					invoiceNumber: data.payload.invoiceNumber || 'NA',
					
				  });
				  this.findOrderLinesByID(this.props.order.orderID);

			  })
			.catch((e) => {
			console.log(e);
			});

	}

	findOrderLinesByID(id) {
		this.props
			.findOrderLineByOrderID({ id })
			.then((data) => {
				console.log(data);

				let i = 0;
				let logs = 0;
				while (i < data.payload.length) {
					logs+= data.payload[i].qtyOrdered;
					console.log(data.payload[i]);
					i++;
				}

				this.setState({
					numberOfLogs: logs
				});
			})
			.catch((e) => {
				console.log(e);
				});
	}
  
	render() {
		const {order, customers, orderline, invoices} = this.props;
		console.log(order);
		console.log(customers);
		console.log(orderline);
		console.log(invoices);


		const {firstName, lastName, invoiceNumber, numberOfLogs, datePlaced} = this.state;

		console.log(datePlaced)


		return (
			<div className='OrderCard' onClick={() => this.handleOnClick(order, lastName)}>
				<div className='OrderCardHeader' style={{ backgroundColor: this.props.color }}>
					<h4 style={{ fontWeight: 'bold' }}>{lastName}, {firstName}</h4>
				</div>
				
				<div className='OrderCardContent'>
					<h4>Reference: {order.referenceNumber}</h4>
					<h4>Invoice: {(invoiceNumber === undefined) ? 'NA' : invoiceNumber}</h4>
					<h4>Logs Ordered: {numberOfLogs}</h4>
					<h4>Date Placed: {moment(datePlaced).format('MM/DD/YYYY')}</h4>
				</div>	
			</div>
		);	
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
		customers: state.customers,
		invoices: state.invoices,
		orderline: state.orderline
	};
  };
  
export default connect(mapStateToProps, { retrieveOrder, retrieveCustomer, findOrderLineByOrderID, retrieveInvoice })(OrderCard);