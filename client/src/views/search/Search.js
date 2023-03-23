import TextField from "@material-ui/core/TextField"
import List from "./List";
import React, { Component } from 'react'
import { connect } from "react-redux";


class Search extends Component {
	constructor(props) {
		super(props)

		this.inputHandler = this.inputHandler.bind(this);

		this.state = {
			orders: props.orders,
			customers: props.customers,
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
				<h1>Search Orders</h1>
				<div className="search">
					<TextField
					id="outlined-basic"
					onChange={this.inputHandler}
					variant="outlined"
					fullWidth
					label="Search"
					/>
				</div>
				<List input={this.state.textInput} orders={this.state.orders} customers={this.state.customers}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        orders: state.orders,
		customers: state.customers
	};
  };
  
export default connect(mapStateToProps, {})(Search); 