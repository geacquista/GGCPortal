import logo from './img/ggc_logo_dropshadow.png';
import {DisplayContent} from '../App.js';

{/*Use 'active' for when the button's screen is being displayed. Anythiing else will be treated as inactive*/}
const NavBarButton = ({text, icon, onClick}) => {
	let iconPath

	switch(icon){
		case DisplayContent.DASHBOARD:
			iconPath = require('./img/home_black.svg').default
			break
		case DisplayContent.ORDERS:
			iconPath = require('./img/order_black.svg').default
			break
		case DisplayContent.INVOICES:
			iconPath = require('./img/invoice_black.svg').default
			break
		case DisplayContent.ORDER_SEARCH:
			iconPath = require('./img/search_black.svg').default
			break
		case DisplayContent.HELP:
			iconPath = require('./img/help_black.svg').default
			break
		case DisplayContent.LOGOUT:
			iconPath = require('./img/logout_black.svg').default
			break
		default:
			console.log(icon)
	}

	return(
		<button className='NavBarButton' onClick={() => onClick(icon)}>
			<img src={iconPath} style={{paddingRight: '10px'}}/>
			<h4>{text}</h4>
		</button>

	)
}

const NavBarButtonActive = ({text, icon, onClick}) => {
	let iconPath

	switch(icon){
		case DisplayContent.DASHBOARD:
			iconPath = require('./img/home_white.svg').default
			break
		case DisplayContent.ORDERS:
			iconPath = require('./img/order_white.svg').default
			break
		case DisplayContent.INVOICES:
			iconPath = require('./img/invoice_white.svg').default
			break
		case DisplayContent.ORDER_SEARCH:
			iconPath = require('./img/search_white.svg').default
			break
		case DisplayContent.HELP:
			iconPath = require('./img/help_white.svg').default
			break
		case DisplayContent.LOGOUT:
			iconPath = require('./img/logout_white.svg').default
			break
		default:
			console.log(icon)
	}

	return(
		<button className='NavBarButtonActive' onClick={() => onClick(icon)}>
			<img src={iconPath} style={{paddingRight: '10px'}}/>
			<h4>{text}</h4>
		</button>

	)
}

const NavBar = ({activeButton, buttonOnClick}) => {
	return(
		<div id='NavBar'>
			<div id='NavBarTop'>
				<img src={logo} height='150' width='150' />
				<h2>G.O.A.T.S.</h2>
				{activeButton === DisplayContent.DASHBOARD ? <NavBarButtonActive text='Dashboard' icon={DisplayContent.DASHBOARD} onClick={buttonOnClick}/> : <NavBarButton text='Dashboard' icon={DisplayContent.DASHBOARD} onClick={buttonOnClick}/>}
				{activeButton === DisplayContent.ORDERS ? <NavBarButtonActive text='Orders' icon={DisplayContent.ORDERS} onClick={buttonOnClick}/> : <NavBarButton text='Orders' icon={DisplayContent.ORDERS} onClick={buttonOnClick}/>}
				{activeButton === DisplayContent.INVOICES ? <NavBarButtonActive text='Invoices' icon={DisplayContent.INVOICES} onClick={buttonOnClick}/> : <NavBarButton text='Invoices' icon={DisplayContent.INVOICES} onClick={buttonOnClick}/>}
				{activeButton === DisplayContent.ORDER_SEARCH ? <NavBarButtonActive text='Order Search' icon={DisplayContent.ORDER_SEARCH} onClick={buttonOnClick}/> : <NavBarButton text='Order Search' icon={DisplayContent.ORDER_SEARCH} onClick={buttonOnClick}/>}
			</div>
			<div id='NavBarBottom'>
				{activeButton === DisplayContent.HELP ? <NavBarButtonActive text='Help' icon={DisplayContent.HELP} onClick={buttonOnClick}/> : <NavBarButton text='Help' icon={DisplayContent.HELP} onClick={buttonOnClick}/>}
				{activeButton === DisplayContent.LOGOUT ? <NavBarButtonActive text='Logout' icon={DisplayContent.LOGOUT} onClick={buttonOnClick}/> : <NavBarButton text='Logout' icon={DisplayContent.LOGOUT} onClick={buttonOnClick}/>}
			</div>
		</div>
	)
}

export default NavBar