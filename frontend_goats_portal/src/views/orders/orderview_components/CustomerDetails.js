import React, {Component} from "react";
import { connect } from "react-redux";

import { retrieveCustomer } from "../../../store/customer_slice";

class CustomerInfo extends Component {
	constructor(props) {
	  super(props);

	  this.getCustomerData = this.getCustomerData.bind(this);

	  this.state = {
        customerID: "",
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
        customerShippingId: "",
	 };
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getCustomerData(this.props.order.customerId)
	}

	getCustomerData(id) {
		this.props
			.retrieveCustomer({id})
			.then((data) => {
				console.log(data);
				this.setState({
                    customerID: data.payload.customerID,
					firstName: data.payload.firstName,
					lastName: data.payload.lastName,
                    email: data.payload.email,
                    phoneNumber: data.payload.phoneNumber,
                    customerShippingId: data.payload.customerShippingId,										
				});
			})
			.catch((e) => {
			console.log(e);
			});
	}

	
	render() {
		const {order, customers} = this.props;
		console.log(order);
		console.log(customers);

		const {firstName, lastName, email, phoneNumber} = this.state;

		return (
            <div id='OrderView_Customer_Details'>
                <table>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Name</h4></td>
                        <td><h4>{firstName} {lastName}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
                        <td><h4>{email}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
                        <td><h4>{phoneNumber}</h4></td>
                    </tr>
                </table>
            </div>
		);	
	}
  }
  
  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
		customers: state.customers,
	};
  };
  
export default connect(mapStateToProps, { retrieveCustomer })(CustomerInfo);