
import React, { Component } from "react";
import { connect } from "react-redux";

import { retrieveOrders } from '../../store/order_slice'

import { OrderDisplayColumn } from "./MainOrderView_Tabs";


// Completed Orders Tab
const CompletedOrders = ({orders, orderCardOnClick, products, shippingAddresses, invoices, orderline, customers}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} customers={customers} shippingAddresses={shippingAddresses} invoices={invoices} orderline={orderline} orderCardOnClick={orderCardOnClick} products={products} />
		</div>
	)
}

class CompletedOrdersTab extends Component {
	constructor(props) {
	  super(props);
      
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	//   this.props.retrieveOrders();
	}
  
	render() {
		const {orders, products, shippingAddresses, customers, orderline, invoices} = this.props;
		
		const currentCompletedOrders = orders.filter(order => (order.orderStatus === "Complete"));

		return(
			<div id='CompletedOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<CompletedOrders orders={currentCompletedOrders} products={products} shippingAddresses={shippingAddresses} customers={customers} invoices={invoices} orderline={orderline} orderCardOnClick={this.props.orderCardOnClick}/>
				</div>
			</div>		
		);

	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {
	return {
	 	orders: state.orders,
	 	shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		invoices: state.invoices,
		orderline: state.orderline,
		products: state.products
	};
  };
  
export default connect(mapStateToProps, { retrieveOrders })(CompletedOrdersTab);

