
import React, { Component } from "react";
import { connect } from "react-redux";

import { OrderDisplayColumn } from "./MainOrderView_Tabs";

// Active Orders Tab
const ActiveOrders = ({orders, orderCardOnClick, products, customers, shippingAddresses,invoices, orderline}) => {
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn style={{borderRight:"2px"}} key= {'Placed'} title='Placed' orders={orders.filter(order => order.orderStatus === "Placed")} customers={customers} shippingAddresses={shippingAddresses} invoices={invoices} orderline={orderline}  orderCardOnClick={orderCardOnClick} products={products}/>
			<OrderDisplayColumn key= {'Processed'} title='Processed' orders={orders.filter(order => order.orderStatus === 'Processed')} customers={customers}  shippingAddresses={shippingAddresses} invoices={invoices} orderline={orderline}  orderCardOnClick={orderCardOnClick} products={products} />
			<OrderDisplayColumn key= {'Shipped'} title='Shipped' orders={orders.filter(order => order.orderStatus === 'Shipped')} customers={customers}  shippingAddresses={shippingAddresses} invoices={invoices} orderline={orderline}  orderCardOnClick={orderCardOnClick} products={products}/>
		</div>
	)
}

class ActiveOrdersTab extends Component {
	constructor(props) {
	  super(props);
	}
  
	// This gets the users when the component loads
	componentDidMount() {

		
	}
  
	render() {
		const {orders, products, shippingAddresses, customers, invoices,orderline} = this.props;
		const currentActiveOrders = orders.filter(order => (order.orderStatus === "Placed" || order.orderStatus === 'Processed' || order.orderStatus === 'Shipped'));		

		
		return(
			<div id='ActiveOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<ActiveOrders orders={currentActiveOrders} products={products} shippingAddresses={shippingAddresses} customers={customers} invoices={invoices} orderline={orderline} orderCardOnClick={this.props.orderCardOnClick}/>
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