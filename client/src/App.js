import React, { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "./assets/img/ggc_logo_dropshadow.png";

import home_logo from "./assets/img/home_black.svg"

import Login from "./views/aa_login/Login";
import Home from "./views/aa_login/Home";
import Profile from "./views/aa_login/Profile";
import BoardUser from "./views/aa_login/BoardUser";
import BoardModerator from "./views/aa_login/BoardModerator";
import BoardAdmin from "./views/aa_login/BoardAdmin";
import GGCApp from "./GGCApp"

import { logout } from "./store/auth";
import { clearMessage } from "./store/message";
import {NavBarButtonActive, NavBarButton} from "./views/nav/Navbar"
import { retrieveOrders } from './store/order_slice'; 
import { retrieveProducts } from './store/product_slice';
import { retrieveCustomers } from './store/customer_slice';
import { retrieveInvoices } from './store/invoice_slice';
import { retrieveShippingAddresses } from './store/address_slice';
import { retrieveOrderLines } from './store/orderline_slice';


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./views/dashboard/Dashboard";
import MainOrderPane from "./views/orders/MainOrderView_Tabs";
import Search from "./views/search/Search";
import HelpScreen from "./views/help/Help";




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

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      
      showFarmBoard: false,
      showAdminBoard: false,

      activeUser: {
        userID: null,
        email: "",
        nickname: "",
        permissionType: PermissionTypes.LOGGEDOUT
      }
    };
  }

  componentDidMount() {
    const {location, auth} = this.props;

    if (["/login"].includes(location.pathname)) {
      this.props.clearMessage(); // clear message when changing location
    }
    
  }

  logOut() {
    this.props.logout();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { auth } = this.props;
    const { activeUser } = this.state;
  
    return auth.isLoggedIn !== nextProps.auth.isLoggedIn ||
           auth.user !== nextProps.auth.user ||
           activeUser !== nextState.activeUser;
  }


  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    console.log(auth)
    console.log(auth.isLoggedIn)

    if (auth.isLoggedIn && auth.user !== prevState.activeUser) {
      this.setState({
        activeUser: {
          userID: auth.user.userID,
          email: auth.user.email,
          nickname: auth.user.nickname,
          permissionType: auth.user.permissionType
        }
      });
    } else if (!auth.isLoggedIn && prevState.activeUser !== null) {
      this.setState({
        activeUser: {
          userID: null,
          email: "",
          nickname: "",
          permissionType: PermissionTypes.LOGGEDOUT
        }
      });
    }
    else {
      console.log("No state change")
    }
  }

  render() {
    const {orders, invoices, products, customers, shippingAddresses, orderline} = this.props;

    const { showFarmBoard, showAdminBoard } = this.state;
    const { user } = this.props.auth;
    const {activeUser} = this.state;
    console.log(this.props)


    return (
      
        <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <nav className="navbar navbar-expand bg-light" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <Link to={"/"} className="navbar-brand">
            <img alt='logo' src={logo} height='200' width='200' />
            <h2>G.O.A.T.S.</h2>
          </Link>
          <div className="NavBarTop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
          
            {activeUser.userID && activeUser.permissionType ===PermissionTypes.FARM && (
              <li className="nav-item">
                <Link to={"/farm"} className="nav-link">
                  Farm Board
                </Link>
              </li>
            )}
            {activeUser.userID && activeUser.permissionType===PermissionTypes.ADMIN && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {activeUser.userID && (
              <li className="nav-item">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {activeUser.userID ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {activeUser.nickname}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Home
                </Link>
              </li>
              <li>
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>
              <li>
                <Link to={"/search"} className="nav-link">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/help"} className="nav-link">
                  Help
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
        
        <div className="container mt-3 ViewContainer">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            {/*<Route path="/login" element={<Login />} />*/}
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/farm" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            {/* <Route path="/GGCHome" element={<GGCApp/>}/> */}
            <Route path="/orders" element={<MainOrderPane/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/help" element={<HelpScreen/>}/>
          </Routes>
        </div>

    </div>
  );
};

}

const mapStateToProps = (state) => {
    return {
      users: state.users,
     
      auth: state.auth,
      location: state.router.location
    };
  };

export default connect(mapStateToProps, { logout, clearMessage})(App);