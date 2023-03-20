
import React, { Component } from "react";
import { connect } from "react-redux";

import { retrieveOrders } from '../../store/order_slice'
import { OrderDisplayColumn } from "./MainOrderView_Tabs";

// Active Orders Tab
const ActiveOrders = ({orders, orderCardOnClick, products, customers, shippingAddresses,invoices, orderline}) => {
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn key= {'Placed'} title='Placed' orders={orders.filter(order => order.orderStatus === "Placed")}  orderCardOnClick={orderCardOnClick} products={products}/>
			<OrderDisplayColumn key= {'Processed'} title='Processed' orders={orders.filter(order => order.orderStatus === 'Processed')} orderCardOnClick={orderCardOnClick} products={products} />
			<OrderDisplayColumn key= {'Shipped'} title='Shipped' orders={orders.filter(order => order.orderStatus === 'Shipped')} orderCardOnClick={orderCardOnClick} products={products}/>
		</div>
	)
}

class ActiveOrdersTab extends Component {
	constructor(props) {
	  super(props);
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	//   this.props.retrieveOrders();
	}
  
	render() {
		const {orders, products, shippingAddresses, customers, invoices,orderline} = this.props;
		const currentActiveOrders = orders.filter(order => (order.orderStatus === "Placed" || order.orderStatus === 'Processed' || order.orderStatus === 'Shipped'));		

		
		return(
			<div id='ActiveOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<ActiveOrders orders={currentActiveOrders} products={products} shippingAddresses={orderline} customers={customers} invoices={invoices} orderline={orderline} orderCardOnClick={this.props.orderCardOnClick}/>
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
  
export default connect(mapStateToProps, { })(ActiveOrdersTab);