import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveOrders } from '../../store/order_slice';
import { retrieveInvoices } from '../../store/invoice_slice';
import {Link} from "react-router-dom";
import searchIcon from "../../assets/img/search_black.svg";
import add_icon from "../../assets/img/plus_white.svg";
class Dashboard extends Component{

	componentDidMount() {
		this.props.retrieveInvoices();
		this.props.retrieveOrders();
	}

	render() {

		return (
			<div id='Dashboard'>
				<div style={{textAlign:'right', justifyContent:"space-around"}}>
					<h1 style={{textAlign:'right'}}>Dashboard</h1>
					<button id={'search-button'}>
						<Link to={"/search"} className="nav-link">Search Orders</Link>
						<img alt='search icon' src={searchIcon} height='25' width='25' />
					</button>
				</div>
				<AllQuickStats orders={this.props.orders} invoices={this.props.invoices}  />
				<button id='addOrderDash' className='OrderActionButton'>
					<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
					<h4>Add Order</h4>
				</button>
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
