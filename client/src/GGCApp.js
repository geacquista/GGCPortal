import React, { Component } from 'react';
import './App.css';


// Main components
import NavBar from './views/nav/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import MainOrderPane from './views/orders/MainOrderView_Tabs';
import Search from './views/search/Search';
// import Invoices from './views/invoices/Invoices';
import AdminPanel from './views/admin/AdminPanel';

import { connect } from "react-redux";

import { retrieveOrders } from './store/order_slice'; 
import { retrieveProducts } from './store/product_slice';
import { retrieveCustomers } from './store/customer_slice';
import { retrieveInvoices } from './store/invoice_slice';
import { retrieveShippingAddresses } from './store/address_slice';
import { retrieveOrderLines } from './store/orderline_slice';
import Login from './views/aa_login/Login';


// For Navigation
export const ViewIndex = {
	DASHBOARD: 1,
	ORDERS: 2,
	SEARCH: 4,
	HELP: 5,
	LOGOUT: 6,
  TEST: 7
}

export const PermissionTypes = {
	ADMIN: "ADMIN",
	GGC: "GGC",
	FARM: "FARM"
  // Potential for more permissions here
} 

export const InvoiceStatus = {
	MISSING: "Missing",
	WAITING: "Waiting",
	SENT: "PaymentSent",
  RECIEVED: "PaymentRecieved"
} 

export const OrderStatus = {
	PLACED: "Missing",
	PROCESSED: "Waiting",
	SHIPPED: "Shipped",
  COMPLETE: "Complete",
  ARCHIVE: "Archive"
} 

class GGCApp extends Component {
  constructor(props) {
    super(props);
    this.setDisplayContent = this.setDisplayContent.bind(this);

    this.state = {
      displayContent: ViewIndex.DASHBOARD
    }
  }

  componentDidMount() {
		this.props.retrieveOrders();
		this.props.retrieveInvoices();
		this.props.retrieveShippingAddresses();
		this.props.retrieveCustomers();
        this.props.retrieveProducts();
		this.props.retrieveOrderLines();


	}

  setDisplayContent(newContent) {
    this.setState({displayContent: newContent})

  }

  
  render() {
    const {orders, invoices, products, customers, shippingAddresses, orderline} = this.props;

    const {displayContent} = this.state;

    return (
      <div className="App">
          <header className='App-header'>

            {/* TODO: Make sure on refresh the link is _____goatsportal.com/ ||| aka: localhost:3000/ */}
            <NavBar activeButton={displayContent} buttonOnClick={this.setDisplayContent}/>
            {displayContent === ViewIndex.DASHBOARD && <Dashboard orders={orders} invoices={invoices}/>} 
            {displayContent === ViewIndex.ORDERS  && <MainOrderPane/>} 
            {/* {displayContent === ViewIndex.INVOICES  && <Invoices/>}  */}
            {displayContent === ViewIndex.SEARCH  && <Search orders={orders}/>} 
            {displayContent === ViewIndex.TEST && <AdminPanel/>} 
            {displayContent === ViewIndex.HELP && <Dashboard/>} 
            {displayContent === ViewIndex.LOGOUT && <Login/>} 
          </header>
        </div>    
  );
  }
}

const mapStateToProps = (state) => {
    return {
      orders: state.orders,
      shippingAddresses: state.shippingAddresses,
      customers: state.customers,
      invoices: state.invoices,
      orderline: state.orderline,
      products: state.products,
      auth: state.auth
    };
  };
  
export default connect(mapStateToProps, { retrieveCustomers, retrieveOrders, retrieveShippingAddresses, retrieveProducts, retrieveInvoices, retrieveOrderLines })(GGCApp);