import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveOrders } from '../../store/order_slice';
import { retrieveInvoices } from '../../store/invoice_slice';
import {Link} from "react-router-dom";
class Dashboard extends Component{

	componentDidMount() {
		this.props.retrieveInvoices();
		this.props.retrieveOrders();
	}

	render() {

		return (
			<div id='Dashboard'>
				<div style={{textAlign:'right'}}>
					<h1 style={{textAlign:'right'}}>Dashboard</h1>
					<Link to={"/search"} className="nav-link">
						Search
					</Link>
				</div>
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
