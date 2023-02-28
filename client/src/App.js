import React, { useState } from 'react';
import './App.css';

// Main components
import NavBar from './views/nav/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import MainOrderPane from './views/orders/MainOrderView_Tabs';
import Search from './views/search/Search';
// import Invoices from './views/invoices/Invoices';
import AdminPanel from './views/admin/AdminPanel';

// For Navigation
export const ViewIndex = {
	DASHBOARD: 1,
	ORDERS: 2,
	// INVOICES: 3,
	SEARCH: 4,
	HELP: 5,
	LOGOUT: 6,
  TEST: 7
}

export const PermissionTypes = {
	ADMIN: "Administrator",
	GGC: "Gompei's Goat Cheese - Operations Access",
	FARM: "Farm Permissions"
  // Potential for more permissions here
} 

// Will this be controlled by the state?
// const UserStatus = {
// 	LOGGED_IN: 1,
// 	LOGGED_OUT: 2,
// }


function App() {

	const [displayContent, setDisplayContent] = useState(ViewIndex.DASHBOARD)
  
  return (
      <div className="App">
          <header className='App-header'>

            {/* TODO: Make sure on refresh the link is _____goatsportal.com/ ||| aka: localhost:3000/ */}
            <NavBar activeButton={displayContent} buttonOnClick={setDisplayContent}/>
            {displayContent === ViewIndex.DASHBOARD && <Dashboard/>} 
            {displayContent === ViewIndex.ORDERS  && <MainOrderPane/>} 
            {/* {displayContent === ViewIndex.INVOICES  && <Invoices/>}  */}
            {displayContent === ViewIndex.SEARCH  && <Search/>} 
            {displayContent === ViewIndex.TEST && <AdminPanel/>} 
            {displayContent === ViewIndex.HELP && <Dashboard/>} 
            {displayContent === ViewIndex.LOGOUT && <Dashboard/>} 
          </header>
        </div>    
  );


}

export default App;
