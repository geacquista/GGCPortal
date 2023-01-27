
import React, { Component } from "react";
import { connect } from "react-redux";

import { createOrder, retrieveOrders } from '../../store/order_slice'


// Cards are part of the list
const OrderCard = ({order, color, onClick}) => {
	var numberOfLogs = 0
	// order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

	return(
		<div className='OrderCard' onClick={() => onClick(order)}>
			<div className='OrderCardHeader' style={{backgroundColor: color}}>
				{/* <h4 style={{fontWeight: 'bold'}}>{order.customer.lastName}, {order.customer.firstName}</h4> */}
			</div>
			<div className='OrderCardContent'>
				<h4>Reference: {order.referenceNumber}</h4>
				<h4>Invoice: {(order.invoiceNumber === undefined) ? 'NA' : order.invoiceNumber}</h4>
				<h4>Logs Ordered: {numberOfLogs}</h4>
			</div>
		</div>
	)
}

// Columns are part of the list
const OrderDisplayColumn = ({title, orders, orderCardOnClick}) => {
	return(
		<ul className='OrderDisplayColumn'>
			<li key={title} style={{position: 'sticky', top: '0px'}}><div className='OrderDisplayColumnTitle'><h3 style={{padding: '0px', margin: '0px'}}>{title}</h3></div></li>

			{orders.map((order) => (
				<li><OrderCard key={order.referenceNumber} order={order} color='#90E0C9' onClick={orderCardOnClick} /></li>
			))}
		</ul>
	)
}

// // Active Orders Tab
const ActiveOrders = ({orders, orderCardOnClick}) => {
	console.log(orders.filter(order => order.orderStatus === "Placed"))
	return (
		<div id='OrderDisplayColumns'>
			<OrderDisplayColumn title='Placed' orders={orders.filter(order => order.orderStatus === "Placed")} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Processed' orders={orders.filter(order => order.orderStatus === 'Processed')} orderCardOnClick={orderCardOnClick} />
			<OrderDisplayColumn title='Shipped' orders={orders.filter(order => order.orderStatus === 'Shipped')} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

// Completed Orders Tab
const CompletedOrders = ({orders, orderCardOnClick}) => {
	return (
		<div id='OrderDisplayColumns' style={{display: 'flex', displayDirection: 'column'}}>
			<OrderDisplayColumn title='Completed' orders={orders} orderCardOnClick={orderCardOnClick} />
		</div>
	)
}

class OrderList extends Component {
	constructor(props) {
	  super(props);
      
	}
  
	// This gets the users when the component loads
	componentDidMount() {
	  this.props.retrieveOrders();
	}

  
	render() {
		const {orders} = this.props;
		console.log(this.props);
		const currentActiveOrders = orders.filter(order => (order.orderStatus === "Placed" || order.orderStatus === 'Processed' || order.orderStatus === 'Shipped'));
		let displayContent = <ActiveOrders orders={currentActiveOrders} />
		console.log(currentActiveOrders);




		// const activeContent = tabs.find(tab => tab.id === activeTabId)

		// switch(activeContent.viewType){
		// 	case ViewType.ACTIVE_ORDERS:
		// 		displayContent = <ActiveOrders orders={orders.filter(order => (order.status === 'PLACED' || order.status === 'PROCESSED' || order.status === 'SHIPPED'))} orderCardOnClick={addAndOpenOrderView} />
		// 		break
		// 	case ViewType.COMPLETED_ORDERS:
		// 		displayContent = <CompletedOrders orders={orders.filter(order => order.status === 'COMPLETED')} orderCardOnClick={addAndOpenOrderView} />
		// 		break
		// 	case ViewType.ORDER:
		// 		displayContent = <Order order={activeContent.order}/>
		// 		break
		// 	case ViewType.ADD_ORDER:
		// 		displayContent = <OrderAddNew addOrder={createOrder}/>
		// 		break
		// }


		return(
			<div>{displayContent}</div>
		);

	}
  }
  
  const mapStateToProps = (state) => {
	return {
	  orders: state.orders,
	};
  };
  
export default connect(mapStateToProps, { createOrder, retrieveOrders })(OrderList);

