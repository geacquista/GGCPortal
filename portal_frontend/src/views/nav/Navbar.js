import logo from '../../shared_assets/img/ggc_logo_dropshadow.png';
import {ViewIndex} from '../../App.js';
import '../../shared_assets/style/navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';

const NavBarButton = ({text, icon, onClick}) => {
	let iconPath
	let link

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('../../shared_assets/img/home_black.svg')
			link = ''
			break
		case ViewIndex.ORDERS:
			iconPath = require('../../shared_assets/img/order_black.svg')
			link = 'Orders'
			break
		case ViewIndex.INVOICES:
			iconPath = require('../../shared_assets/img/invoice_black.svg')
			link = 'Invoices'
			break
		case ViewIndex.SEARCH:
			iconPath = require('../../shared_assets/img/search_black.svg')
			link = 'Search'
			break
		case ViewIndex.HELP:
			iconPath = require('../../shared_assets/img/help_black.svg')
			link = 'Help'
			break
		case ViewIndex.LOGOUT:
			iconPath = require('../../shared_assets/img/logout_black.svg')
			link = 'Login'
			break
		case ViewIndex.TEST:
			iconPath = require('../../shared_assets/img/attachment_black.svg')
			link = 'Test'
			break
		default:
			console.log(icon)
	}

	return(
		<Link to={link}>
			<button className='NavBarButton' onClick={() => onClick(icon)}>
				<img src={iconPath} alt='nav' style={{paddingRight: '10px'}}/>
				<h4>{text}</h4>
			</button>
		</Link>
	)
}

const NavBarButtonActive = ({text, icon, onClick}) => {
	let iconPath
	let link

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('../../shared_assets/img/home_white.svg')
			link = ''
			break
		case ViewIndex.ORDERS:
			iconPath = require('../../shared_assets/img/order_white.svg')
			link = 'Orders'
			break
		case ViewIndex.INVOICES:
			iconPath = require('../../shared_assets/img/invoice_white.svg')
			link = 'Invoices'
			break
		case ViewIndex.SEARCH:
			iconPath = require('../../shared_assets/img/search_white.svg')
			link = 'Search'
			break
		case ViewIndex.HELP:
			iconPath = require('../../shared_assets/img/help_white.svg')
			link = 'Help'
			break
		case ViewIndex.LOGOUT:
			iconPath = require('../../shared_assets/img/logout_white.svg')
			link = 'Login'
			break
		case ViewIndex.TEST:
			iconPath = require('../../shared_assets/img/attachment_white.svg')
			link = 'Test'
			break
		default:
			console.log(icon)
	}

	return(
		<Link to={link}>
			<button className='NavBarButtonActive' onClick={() => onClick(icon)}>
				<img src={iconPath} alt='nav' style={{paddingRight: '10px'}}/>
				<h4>{text}</h4>
			</button>
		</Link>
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