import React, { useState, useContext } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from './shared/nav/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import Orders from './views/orders/OrdersList';
import Search from './views/search/Search'
import orderSlice from './store/order_slice';
import Invoices from './views/invoices/Invoices';
import './App.css';
import LoginPage from './views/aa_login/LoginPage';
import NavRouter from './shared/nav/NavRouter'
// import { Counter } from './extra/counter/Counter';


// For Navigation
export const ViewIndex = {
	DASHBOARD: 1,
	ORDERS: 2,
	INVOICES: 3,
	SEARCH: 4,
	HELP: 5,
	LOGOUT: 6,
  TEST: 7
}

// Will this be controlled by the state?
const UserStatus = {
	GGC: 1,
	FARM: 2,
	LOGGED_OUT: 3,
	ADMIN: 4,
}


function App() {

	/*
	function App
	// get quick stats data
	*/

  // get the initial state of the orders 

  // const [orders, setOrders] = orderSlice.orders

	const [displayContent, setDisplayContent] = useState(ViewIndex.DASHBOARD)
	
  // get status of user
	const [userStatus, setUserStatus] = useState(UserStatus.GGC)

  // depending on user status, will depend which class to run (App will be login?)

  //	{/* if userStatus is ggc show this */}

  // keep viewIndex so NavBar is set with a flag that specifies the specific views allowed to be show
  return (
      <div className="App">
          <header className='App-header'>
            <NavBar activeButton={displayContent} buttonOnClick={setDisplayContent}/>
            <NavRouter/>
            {displayContent === ViewIndex.DASHBOARD }
            {displayContent === ViewIndex.ORDERS }
            {displayContent === ViewIndex.INVOICES }
            {displayContent === ViewIndex.SEARCH }
            {displayContent === ViewIndex.TEST}
            {displayContent === ViewIndex.HELP }
            {displayContent === ViewIndex.LOGOUT }
            
            {/* {displayContent === ViewIndex.DASHBOARD && <Dashboard/>}
            {displayContent === ViewIndex.ORDERS && <Orders/>}
            {displayContent === ViewIndex.INVOICES && <Invoices/>}
            {displayContent === ViewIndex.SEARCH && <Search/>}
            {displayContent === ViewIndex.TEST}
            {displayContent === ViewIndex.HELP && <Dashboard/>}
            {displayContent === ViewIndex.LOGOUT && <LoginPage/>} */}
          </header>
        </div>    
  );


}

export default App;
