import logo from '../../assets/img/ggc_logo_dropshadow.png';
import {ViewIndex} from '../../GGCApp';
import '../../assets/style/navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';

export const NavBarButton = ({text, icon, onClick}) => {
	let iconPath
	let link

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('../../assets/img/home_black.svg')
			link = ''
			break
		case ViewIndex.ORDERS:
			iconPath = require('../../assets/img/order_black.svg')
			link = 'orders'
			break
		case ViewIndex.INVOICES:
			iconPath = require('../../assets/img/invoice_black.svg')
			link = 'invoices'
			break
		case ViewIndex.SEARCH:
			iconPath = require('../../assets/img/search_black.svg')
			link = 'search'
			break
		case ViewIndex.HELP:
			iconPath = require('../../assets/img/help_black.svg')
			link = 'help'
			break
		case ViewIndex.LOGOUT:
			iconPath = require('../../assets/img/logout_black.svg')
			link = 'login'
			break
		case ViewIndex.TEST:
			iconPath = require('../../assets/img/attachment_black.svg')
			link = 'test'
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

export const NavBarButtonActive = ({text, icon, onClick}) => {
	let iconPath
	let link

	switch(icon){
		case ViewIndex.DASHBOARD:
			iconPath = require('../../assets/img/home_white.svg')
			link = ''
			break
		case ViewIndex.ORDERS:
			iconPath = require('../../assets/img/order_white.svg')
			link = 'orders'
			break
		case ViewIndex.INVOICES:
			iconPath = require('../../assets/img/invoice_white.svg')
			link = 'invoices'
			break
		case ViewIndex.SEARCH:
			iconPath = require('../../assets/img/search_white.svg')
			link = 'search'
			break
		case ViewIndex.HELP:
			iconPath = require('../../assets/img/help_white.svg')
			link = 'help'
			break
		case ViewIndex.LOGOUT:
			iconPath = require('../../assets/img/logout_white.svg')
			link = 'login'
			break
		case ViewIndex.TEST:
			iconPath = require('../../assets/img/attachment_white.svg')
			link = 'admin'
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

export const NavBar = ({activeButton, buttonOnClick}) => {
	return(
		<div id='NavBar'>
			<div id='NavBarTop'>
				<img alt='logo' src={logo} height='200' width='200' />
				<h2>G.O.A.T.S.</h2>
				{activeButton === ViewIndex.DASHBOARD ? <NavBarButtonActive text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/> : <NavBarButton text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.ORDERS ? <NavBarButtonActive text='Orders' icon={ViewIndex.ORDERS} onClick={buttonOnClick}/> : <NavBarButton text='Orders' icon={ViewIndex.ORDERS} onClick={buttonOnClick}/>}
				{/* {activeButton === ViewIndex.INVOICES ? <NavBarButtonActive text='Invoices' icon={ViewIndex.INVOICES} onClick={buttonOnClick}/> : <NavBarButton text='Invoices' icon={ViewIndex.INVOICES} onClick={buttonOnClick}/>} */}
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

export const NavBarTest = ({activeButton, buttonOnClick}) => {
	return(
		<div id='NavBar'>
			<div id='NavBarTop'>
				<img alt='logo' src={logo} height='200' width='200' />
				<h2>G.O.A.T.S.</h2>
				{activeButton === ViewIndex.DASHBOARD ? <NavBarButtonActive text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/> : <NavBarButton text='Dashboard' icon={ViewIndex.DASHBOARD} onClick={buttonOnClick}/>}
				{activeButton === ViewIndex.TEST ? <NavBarButtonActive text='Test' icon={ViewIndex.TEST} onClick={buttonOnClick}/> : <NavBarButton text='Test' icon={ViewIndex.TEST} onClick={buttonOnClick}/>}
			</div>
			<div id='NavBarBottom'>
				{activeButton === ViewIndex.LOGOUT ? <NavBarButtonActive text='Logout' icon={ViewIndex.LOGOUT} onClick={buttonOnClick}/> : <NavBarButton text='Logout' icon={ViewIndex.LOGOUT} onClick={buttonOnClick}/>}
			</div>
		</div>
	)
}

export default NavBar