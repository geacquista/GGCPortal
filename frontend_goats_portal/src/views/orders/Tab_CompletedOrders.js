
import React, { Component } from "react";
import { connect } from "react-redux";

import { createOrder, retrieveOrders } from '../../store/order_slice'
import { retrieveCustomers } from '../../store/customer_slice'
import { retrieveOrderLines } from '../../store/orderline_slice'
import { retrieveInvoices }	from '../../store/invoice_slice'
import { OrderCard } from "./orderview_components/OrderCard";


// Columns are part of the list
const OrderDisplayColumn = ({title, orders, customers, orderCardOnClick}) => {

	return(
		<ul className='OrderDisplayColumn'>
			<li key={title} style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>

			{orders.map((order) => (
				<li><OrderCard key={order.orderID} order={order} customer={customers.filter(customer => customer.customerID === order.customerId)[0]} color='#90E0C9' orderCardOnClick={orderCardOnClick} /></li>
			))}
		</ul>
	)
}

// Completed Orders Tab
const CompletedOrders = ({orders, customers, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} customers={customers} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

class CompletedOrdersTab extends Component {
	constructor(props) {
	  super(props);
      
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	  this.props.retrieveOrders();
	  this.props.retrieveCustomers();
	  this.props.retrieveInvoices();
	  this.props.retrieveOrderLines();
	}
  
	render() {
		const {orders, customers, orderline, invoices} = this.props;

		const data = {
			orders,
			customers,
			orderline,
			invoices
		}
		
		const currentCompletedOrders = orders.filter(order => (order.orderStatus === "Complete"));

		return(
			<div id='CompletedOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<CompletedOrders orders={currentCompletedOrders} customers={customers} orderCardOnClick={this.props.orderCardOnClick}/>
				</div>
			</div>		
		);

	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {
	return {
	  orders: state.orders,
	  customers: state.customers,
	  orderline: state.orderline,
	  invoices: state.invoices,
	};
  };
  
export default connect(mapStateToProps, { createOrder, retrieveOrders, retrieveCustomers, retrieveOrderLines, retrieveInvoices })(CompletedOrdersTab);

