import logo from './img/ggc_logo_dropshadow.png';
import {ViewIndex} from '../App.js';
import '../style/navbar.css'
import React from 'react';

const NavBarButton = ({text, icon, onClick}) => {
	let iconPath

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('./img/home_black.svg')
			break
		case ViewIndex.ORDERS:
			iconPath = require('./img/order_black.svg')
			break
		case ViewIndex.INVOICES:
			iconPath = require('./img/invoice_black.svg')
			break
		case ViewIndex.SEARCH:
			iconPath = require('./img/search_black.svg')
			break
		case ViewIndex.HELP:
			iconPath = require('./img/help_black.svg')
			break
		case ViewIndex.LOGOUT:
			iconPath = require('./img/logout_black.svg')
			break
		case ViewIndex.TEST:
			iconPath = require('./img/attachment_black.svg')
			break
		default:
			console.log(icon)
	}

	return(
		<button className='NavBarButton' onClick={() => onClick(icon)}>
			<img src={iconPath} alt='nav' style={{paddingRight: '10px'}}/>
			<h4>{text}</h4>
		</button>

	)
}

const NavBarButtonActive = ({text, icon, onClick}) => {
	let iconPath

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('./img/home_white.svg')
			break
		case ViewIndex.ORDERS:
			iconPath = require('./img/order_white.svg')
			break
		case ViewIndex.INVOICES:
			iconPath = require('./img/invoice_white.svg')
			break
		case ViewIndex.SEARCH:
			iconPath = require('./img/search_white.svg')
			break
		case ViewIndex.HELP:
			iconPath = require('./img/help_white.svg')
			break
		case ViewIndex.LOGOUT:
			iconPath = require('./img/logout_white.svg')
			break
		case ViewIndex.TEST:
			iconPath = require('./img/attachment_white.svg')
			break
		default:
			console.log(icon)
	}

	return(
		<button className='NavBarButtonActive' onClick={() => onClick(icon)}>
			<img src={iconPath} alt='nav' style={{paddingRight: '10px'}}/>
			<h4>{text}</h4>
		</button>

	)
}

const NavBar = ({activeButton, buttonOnClick}) => {
	return(
		<div id='NavBar'>
			<div id='NavBarTop'>
				<img alt='logo' src={logo} height='200' width='200' />
				<h2>G.O.A.T.S.</h2>
				{activeButton === ViewIndex.DASHBOARD ? <NavBarButtonActive text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/> : <NavBarButton text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.ORDERS ? <NavBarButtonActive text='Orders' icon={ViewIndex.ORDERS} onClick={buttonOnClick}/> : <NavBarButton text='Orders' icon={ViewIndex.ORDERS} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.INVOICES ? <NavBarButtonActive text='Invoices' icon={ViewIndex.INVOICES} onClick={buttonOnClick}/> : <NavBarButton text='Invoices' icon={ViewIndex.INVOICES} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.SEARCH ? <NavBarButtonActive text='Order Search' icon={ViewIndex.SEARCH} onClick={buttonOnClick}/> : <NavBarButton text='Order Search' icon={ViewIndex.SEARCH} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.TEST ? <NavBarButtonActive text='Test' icon={ViewIndex.TEST} onClick={buttonOnClick}/> : <NavBarButton text='Test' icon={ViewIndex.TEST} onClick={buttonOnClick}/>}
			</div>
			<div id='NavBarBottom'>
				{activeButton === ViewIndex.HELP ? <NavBarButtonActive text='Help' icon={ViewIndex.HELP} onClick={buttonOnClick}/> : <NavBarButton text='Help' icon={ViewIndex.HELP} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.LOGOUT ? <NavBarButtonActive text='Logout' icon={ViewIndex.LOGOUT} onClick={buttonOnClick}/> : <NavBarButton text='Logout' icon={ViewIndex.LOGOUT} onClick={buttonOnClick}/>}
			</div>
		</div>
	)
}

export default NavBar