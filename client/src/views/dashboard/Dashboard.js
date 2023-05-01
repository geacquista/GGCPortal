import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveOrders } from '../../store/order_slice';
import { retrieveInvoices } from '../../store/invoice_slice';
import { retrieveOrderLines } from '../../store/orderline_slice'; 
import { retrieveCustomers } from '../../store/customer_slice';
import { retrieveProducts } from '../../store/product_slice';
import { retrieveShippingAddresses } from '../../store/address_slice';
class Dashboard extends Component{

	componentDidMount() {
		this.props.retrieveInvoices();
		this.props.retrieveOrders();
		this.props.retrieveCustomers();
		this.props.retrieveOrderLines();
		this.props.retrieveProducts();
		this.props.retrieveShippingAddresses();
	}

	render() {

		return (
			<div id='Dashboard'>
				<h1>Dashboard</h1>
				<AllQuickStats orders={this.props.orders} invoices={this.props.invoices}  />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		invoices: state.invoices,
		shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		orderline: state.orderline,
		products: state.products

	};
  };
  
export default connect(mapStateToProps, { 
	retrieveInvoices, retrieveOrders, retrieveCustomers, retrieveOrderLines, retrieveShippingAddresses, retrieveProducts})(Dashboard);
