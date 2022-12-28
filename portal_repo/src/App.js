import React, { useState } from 'react';

import NavBar from './shared/nav/Navbar';
import './App.css';
import Dashboard from './views/dashboard/Dashboard';
import OrderList from './views/orders/OrdersList';
import Search from './views/search/Search';
import LoginPage from './views/aa_login/LoginPage';
import Invoices from './views/invoices/Invoices';

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
// const UserStatus = {
// 	GGC: 1,
// 	FARM: 2,
// 	LOGGED_OUT: 3,
// 	ADMIN: 4,
// }


function App() {

	/*
	function App
	// get quick stats data
	*/

  // get the initial state of the orders 

  // const [orders, setOrders] = orderSlice.orders

	const [displayContent, setDisplayContent] = useState(ViewIndex.DASHBOARD)
	
  // get status of user
  /**
   * USER STATUS??
   */
	//const [userStatus, setUserStatus] = useState(UserStatus.GGC)

  // depending on user status, will depend which class to run (App will be login?)

  //	{/* if userStatus is ggc show this */}

  // keep viewIndex so NavBar is set with a flag that specifies the specific views allowed to be show
  return (
      <div className="App">
          <header className='App-header'>
            <NavBar activeButton={displayContent} buttonOnClick={setDisplayContent}/>
            {displayContent === ViewIndex.DASHBOARD && <Dashboard/>}
            {displayContent === ViewIndex.ORDERS && <OrderList />}
            {displayContent === ViewIndex.INVOICES && <Invoices />}
            {displayContent === ViewIndex.SEARCH && <Search />}
            {displayContent === ViewIndex.TEST && <Dashboard />}
            {displayContent === ViewIndex.HELP && <Dashboard />}
            {displayContent === ViewIndex.LOGOUT && <LoginPage />}
          </header>
        </div>    
  );


}

export default App;
