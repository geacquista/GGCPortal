import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./views/aa_login/Login";
import Home from "./views/aa_login/Home";
import Profile from "./views/aa_login/Profile";
import BoardGGCUser from "./views/aa_login/BoardUser";
import BoardFarmUser from "./views/aa_login/BoardModerator";
import BoardAdmin from "./views/aa_login/BoardAdmin";

import { logout } from "./store/auth";

import EventBus from "./common/EventBus";
import Dashboard from "./views/dashboard/Dashboard";
import { ViewIndex } from "./App";
import MainOrderView_Tabs from "./views/orders/MainOrderView_Tabs";
import Search from "./views/search/Search";
import AdminPanel from "./views/admin/AdminPanel";

class AppLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFarmView: false,
      showAdminBoard: false
    };

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const { user: currentUser } = this.props.auth

    if (currentUser) {
      this.setState({
        showModeratorBoard: currentUser.permissionType.includes("FARM"),
        showAdminBoard: currentUser.roles.includes("ADMIN")
      });
    } else {
      this.setState({
        showModeratorBoard: false,
        showAdminBoard: false
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.dispatch(logout());
  }

  render() {
    const { user: currentUser } = this.props.auth;
    const { showFarmView: showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Dashboard />}></Route> 
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<MainOrderView_Tabs/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<AdminPanel />} />


            <Route path="/user" element={<BoardGGCUser />} />
            <Route path="/mod" element={<BoardFarmUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
  );
  }
}


const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      orders: state.orders,
      shippingAddresses: state.shippingAddresses,
      customers: state.customers,
      invoices: state.invoices,
      orderline: state.orderline,
      products: state.products
    };
  };
export default connect(mapStateToProps)(AppLogin);
