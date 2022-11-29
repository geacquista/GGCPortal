import '../style/navbar.css'
import React from 'react';

import Dashboard from '../../views/dashboard/Dashboard';
import Orders from '../../views/orders/OrdersList';
import Search from '../../views/search/Search'
import Invoices from '../../views/invoices/Invoices';
import LoginPage from '../../views/aa_login/LoginPage';

import { Route, Routes } from "react-router-dom";

function NavRouter () {

    return (
            <main>
                <Routes>
                    <Route exact path="/" element = {
                        <Dashboard/>
                    }/>
                    <Route exact path="/Orders" element = {
                        <Orders />
                    }/>
                    <Route exact path="/Invoices" element = {
                        <Invoices  />
                    }/>
                    <Route exact path="/Search" element = {
                        <Search />
                    }/>
                    <Route exact path="/Test" element = {
                        <Search />
                    }/>
                    <Route exact path="/Help" element = {
                        <Dashboard />
                    }/>
                    <Route exact path="/Login" element = {
                        <LoginPage />
                    }/>
                </Routes>
            </main>
    );
}

export default NavRouter;