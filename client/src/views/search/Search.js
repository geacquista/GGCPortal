import List from "./List";
import React, { Component } from 'react'
import { connect } from "react-redux";
import "../../assets/style/search.css"


class Search extends Component {
	constructor(props) {
		super(props)

		this.inputHandler = this.inputHandler.bind(this);

		this.state = {
			orders: props.orders,
			customers: props.customers,
			shippingAddresses: props.shippingAddresses,
			invoices: props.invoices,
			orderline: props.orderline,
			textInput: ""
		}
	}

	setTextInput(text) {
		this.setState({
			textInput: text,
		});
	}

	inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		this.setTextInput(lowerCase);
	};

	render() {
		return (
			<div id='Search'>
				<div id='OrdersDisplay' style={{display: 'flex', displayDirection: 'column'}}>
				<h1>Search Orders</h1>

				<div>
					<label><i>Searching Reference Number</i></label>
						<input  className="SearchBar"
							id="outlined-basic"
							onChange={this.inputHandler}
							variant="outlined"
							fullWidth
							label="Search"
						/>
				</div>

				<div id='SearchView'>
					<List input={this.state.textInput} orders={this.state.orders} customers={this.state.customers} shippingAddresses={this.state.shippingAddresses} invoices={this.state.invoices} orderline={this.state.orderline}/>
				</div>
			</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        orders: state.orders,
		invoices: state.invoices,
		shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		orderline: state.orderline,
	};
  };
  
export default connect(mapStateToProps, {})(Search); 