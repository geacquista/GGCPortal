import React, { useState } from 'react';
import { Counter } from './extra/counter/Counter';
import NavBar from './shared/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import Orders from './views/orders/Orders';
import orderSlice from './store/orderSlice';
import Invoices from './views/invoices/Invoices';
import './App.css';

export const ViewIndex = {
	DASHBOARD: 1,
	ORDERS: 2,
	INVOICES: 3,
	SEARCH: 4,
	HELP: 5,
	LOGOUT: 6,
  TEST: 7
}

const UserStatus = {
	GGC: 1,
	FARM: 2,
	LOGGED_OUT: 3,
	ADMIN: 4,
}


function App() {

  // const this is where we get the state of the orders
  // get the initial state of the orders 

  // const [orders, setOrders] = orderSlice


	const [displayContent, setDisplayContent] = useState(ViewIndex.DASHBOARD)
	
  // get status of user
  const [userStatus, setUserStatus] = useState(ViewIndex.GGC)


  //THIS IS WHERE YOU CALL ORDER ACTIONS 

  // depending on user status, will depend which class to run (App will be login?)

  // make it so you dont have to send setDisplayContent getQuickStatsData etc. (get it from the state)
  return (
      <div className="App">
          <header className='App-header'>
            <NavBar activeButton={displayContent} buttonOnClick={setDisplayContent}/>
            {displayContent == ViewIndex.DASHBOARD && <Dashboard 
            // setDisplayContent={setDisplayContent} getQuickStatsData={getQuickStatsData}
            />}

            {displayContent == ViewIndex.ORDERS && <Orders />}
            {displayContent == ViewIndex.INVOICES && <Orders 
            // updateOrder={updateOrder} deleteOrder={deleteOrder} getOrders={getOrders}
            />}
            {/* {displayContent == ViewIndex.INVOICES && <Invoices 
            // updateOrder={updateOrder} deleteOrder={deleteOrder} getOrders={getOrders}
            />} */}
            {displayContent == ViewIndex.SEARCH && <Orders/>}
            {displayContent == ViewIndex.TEST}
            {displayContent == ViewIndex.HELP && <Dashboard setDisplayContent={setDisplayContent} 
            // getQuickStatsData={getQuickStatsData}
            />}
            {displayContent == ViewIndex.LOGOUT && <Dashboard setDisplayContent={setDisplayContent} 
            // getQuickStatsData={getQuickStatsData}
            />}
          </header>
        </div>    
  );
}

export default App;
