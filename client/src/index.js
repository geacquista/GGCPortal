/**
 * index.js is the launching point for the React server
 */
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './store_cfg'; // provides the data
import App from './App'; // launches the components 
import AppComp from './AppFunctional'
import reportWebVitals from './reportWebVitals';
import './index.css'; 
import { BrowserRouter } from 'react-router-dom';

// As of React 18
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppComp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
