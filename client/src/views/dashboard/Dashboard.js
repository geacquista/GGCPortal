import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";

import { retrieveOrders } from '../../store/order_slice'
import { retrieveProducts } from '../../store/product_slice';
import { retrieveCustomers } from '../../store/customer_slice';
import { retrieveInvoices } from '../../store/invoice_slice';
import { retrieveShippingAddresses } from '../../store/address_slice';
import { retrieveOrderLines } from '../../store/orderline_slice';


class Dashboard extends Component{

	render() {

		return (
			<div id='Dashboard'>
				<h1>Dashboard</h1>
				<AllQuickStats orders={this.props.orders} invoices={this.props.invoices} shippingAddresses={this.props.shippingAddresses} customers={this.props.customers} products={this.props.products} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	};
  };
  
export default connect(mapStateToProps, { retrieveCustomers, retrieveOrders, retrieveShippingAddresses, retrieveProducts, retrieveInvoices, retrieveOrderLines })(Dashboard);
