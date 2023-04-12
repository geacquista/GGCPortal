import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveOrders } from '../../store/order_slice';
import { retrieveInvoices } from '../../store/invoice_slice';
class Dashboard extends Component{

	componentDidMount() {
		this.props.retrieveInvoices();
		this.props.retrieveOrders();
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
		invoices: state.invoices

	};
  };
  
export default connect(mapStateToProps, { retrieveInvoices, retrieveOrders})(Dashboard);
