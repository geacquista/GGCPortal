
import React, { Component } from "react";
import { connect } from "react-redux";

import { createOrder, retrieveOrders } from '../../store/order_slice'
import { retrieveCustomers } from '../../store/customer_slice'
import { retrieveOrderLines } from '../../store/orderline_slice'
import { retrieveInvoices }	from '../../store/invoice_slice'
import { OrderDisplayColumn } from "./MainOrderView_Tabs";

// // Active Orders Tab
const ActiveOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn key= {'Placed'} title='Placed' orders={orders.filter(order => order.orderStatus === "Placed")}  orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn key= {'Processed'} title='Processed' orders={orders.filter(order => order.orderStatus === 'Processed')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn key= {'Shipped'} title='Shipped' orders={orders.filter(order => order.orderStatus === 'Shipped')} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

class ActiveOrdersTab extends Component {
	constructor(props) {
	  super(props);
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	  this.props.retrieveOrders();
	}
  
	render() {
		const {orders, customers, orderline, invoices} = this.props;
		

		console.log(this.props)
		return(
			<div id='ActiveOrders'>	
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
					<ActiveOrders orders={orders} orderCardOnClick={this.props.orderCardOnClick}/>
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
  
export default connect(mapStateToProps, { retrieveOrders, })(ActiveOrdersTab);