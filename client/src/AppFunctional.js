import React, { useState,useEffect } from "react";
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
import '../../client/src/assets/style/navbar.css';
import '../../client/src/assets/style/dashboard.css';
import "./App.css";
import Dashboard from "./views/dashboard/Dashboard";
import MainOrderPane from "./views/orders/MainOrderView_Tabs";
import Search from "./views/search/Search";
import HelpScreen from "./views/help/Help";
import FarmView from "./views/farm_view/farm_view";
import AdminPanel from "./views/admin/AdminPanel";



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

const AppComp = ({ 
  auth, 
  orders, 
  invoices, 
  products, 
  customers, 
  shippingAddresses, 
  orderline, 
  clearMessage, 
  logout 
}) => {
  const [showFarmBoard, setShowFarmBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [activeUser, setActiveUser] = useState({
    userID: null,
    email: "",
    nickname: "",
    permissionType: PermissionTypes.LOGGEDOUT
  });

  const location = useLocation();

  useEffect(() => {
    if (["/login"].includes(location.pathname)) {
      clearMessage(); // clear message when changing location
    }
  }, [location.pathname, clearMessage]);

  // useEffect(() => {
  //   if (auth.isLoggedIn && auth.user !== activeUser) {
  //     setActiveUser({
  //       userID: auth.user.userID,
  //       email: auth.user.email,
  //       nickname: auth.user.nickname,
  //       permissionType: auth.user.permissionType
  //     });
  //   } else if (!auth.isLoggedIn && activeUser !== null) {
  //     setActiveUser({
  //       userID: null,
  //       email: "",
  //       nickname: "",
  //       permissionType: PermissionTypes.LOGGEDOUT
  //     });
  //   }
  // }, [auth.isLoggedIn, auth.user, activeUser]);

  const logOut = () => {
    logout();
    setActiveUser({
      userID: null,
      email: "",
      nickname: "",
      permissionType: PermissionTypes.LOGGEDOUT
    });
  };

    return (
      
      <div className="landing-page">
      <nav className="navbar bg-light NavBar" id={"navbar-special"}>
        <div id={'branding'}>
          <img alt='logo' src={logo} height='200' width='200' />
          <h2 className="navbar-brand">G.O.A.T.S.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'} }>
        
          {activeUser.userID && activeUser.permissionType ===PermissionTypes.FARM && (
            <><li className="nav-item">
                <Link to={"/dashboard-farm"} className="nav-link">
                  Dashboard
                </Link>
              </li><li>
                  <Link to={"/orders-farm"} className="nav-link">
                    Orders
                  </Link>

                </li></>
          )}

         
          {activeUser.userID && activeUser.permissionType !==PermissionTypes.FARM && (
              <div className="navbar-nav ml-auto" style={{display:'flex', flexDirection:'column'}}>
                  <li className="nav-item">
                      <Link to={"/dashboard"} className="nav-link">
                        Dashboard
                      </Link>
                      </li><li>
                        <Link to={"/orders"} className="nav-link">
                        Orders
                      </Link>

                  </li>
              </div>
            
          )}

          {activeUser.userID && activeUser.permissionType===PermissionTypes.ADMIN && (
            <div className="navbar-nav ml-auto" style={{display:'flex', flexDirection:'column'}}>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            </div>
          )}
        </div>

        {activeUser.userID ? (
          <div className="navbar-nav ml-auto" style={{display:'flex'}}>
            <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>
            <div className="NavBarBottom">
            <li className="nav-item">
                <Link to={"/help"} className="nav-link">
                  Help
                </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                Log Out {activeUser.nickname}
              </a>
            </li>
          </div>

          </div>
        ) : (
            <div className="navbar-nav" style={{display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
              <div>
                <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Home
                </Link>
              </li>
                <li className="nav-item">
                  <Link to={"/orders"} className="nav-link">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>
              </div>
              <div>
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
            </div>
        )}
      </nav>
        
       <div className="container mt-3">
        <Routes>
          <Route path="/" element={<MainOrderPane />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/orders" element={<MainOrderPane/>}/>

          <Route path="/dashboard-farm" element={<FarmView />} />
          <Route path="/orders-farm" element={<FarmView />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/help" element={<HelpScreen/>}/>

          {/* <Route path="/GGCHome" element={<GGCApp/>}/> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>

    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      users: state.users,
      auth: state.auth,
      location: state.router.location
    };
  };

export default connect(mapStateToProps, { logout, clearMessage})(AppComp);