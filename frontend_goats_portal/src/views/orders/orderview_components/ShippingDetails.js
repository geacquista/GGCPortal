import React, {Component} from "react";
import { connect } from "react-redux";

import { retrieveShippingAddress } from "../../../store/address_slice";


class ShippingInfo extends Component {
	constructor(props) {
	  super(props);

	  this.getShippingInfo = this.getShippingInfo.bind(this);

	  this.state = {
        shippingID: "",
		streetAddressOne: "",
        streetAddressTwo: "",
		city: "",
        state: "",
        zip: ""
      };
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getShippingInfo(this.props.order.shippingId)
	}

	getShippingInfo(id) {
        this.props
			.retrieveShippingAddress({id})
			.then((data) => {
				console.log(data);
				this.setState({
                    shippingID: data.payload.shippingID,
					streetAddressOne: data.payload.streetAddressOne,
					streetAddressTwo: data.payload.streetAddressTwo,
                    city: data.payload.city,
                    state: data.payload.state,
                    zip: data.payload.zip,
				});
			})
			.catch((e) => {
			console.log(e);
			});
	}

	
	render() {
        // const {order, recipient, shippingAddresses} = this.props;

		const {order, shippingAddresses} = this.props;

		const {streetAddressOne, streetAddressTwo, city, state, zip} = this.state;
        console.log(shippingAddresses)

        return (
            <div id='OrderView_Shipping_Details'>
                <table>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Street Address</h4></td>
                        <td>
                            <h4>{streetAddressOne}
                            <br></br> {streetAddressTwo}
                            <br></br> {city}, {state}<br></br>{zip}
                            </h4>
                        </td>
                    </tr>
                    {/* <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
                        <td><h4>{order.shipmentTrackingNumber}</h4></td>
                    </tr> */}
                    {/* <tr>
                        {order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
                        {order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
                    </tr> */}
                </table>
			</div>
        );	
        
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
        shippingAddresses: state.shippingAddresses

	};
  };
  
export default connect(mapStateToProps, { retrieveShippingAddress })(ShippingInfo);