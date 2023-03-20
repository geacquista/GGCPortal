import AllQuickStats from './QuickStats'
import React, { Component } from 'react';
import { connect } from "react-redux";

class Dashboard extends Component{

	render() {

		return (
			<div id='Dashboard'>
				<h1>Dashboard</h1>
				<AllQuickStats orders={this.props.orders} invoices={this.props.invoices}  />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	};
  };
  
export default connect(mapStateToProps, { })(Dashboard);
