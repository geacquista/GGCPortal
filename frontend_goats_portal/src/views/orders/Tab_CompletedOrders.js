
import React, { Component } from "react";
import { connect } from "react-redux";

import { createOrder, retrieveOrders } from '../../store/order_slice'
import { retrieveCustomers } from '../../store/customer_slice'
import { retrieveOrderLines } from '../../store/orderline_slice'
import { retrieveInvoices }	from '../../store/invoice_slice'

import { OrderDisplayColumn } from "./MainOrderView_Tabs";


// Completed Orders Tab
const CompletedOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} orderCardOnClick={orderCardOnClick} />
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
	}
  
	render() {
		const {orders} = this.props;
		
		const currentCompletedOrders = orders.filter(order => (order.orderStatus === "Complete"));

		return(
			<div id='CompletedOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<CompletedOrders orders={currentCompletedOrders} orderCardOnClick={this.props.orderCardOnClick}/>
				</div>
			</div>		
		);

	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {
	return {
	  orders: state.orders,
	};
  };
  
export default connect(mapStateToProps, { retrieveOrders })(CompletedOrdersTab);

