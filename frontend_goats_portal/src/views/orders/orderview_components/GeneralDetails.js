import React, {Component} from "react";
import { connect } from "react-redux";

class GeneralInfo extends Component {
	constructor(props) {
	  super(props);

	  this.getGeneralInfo = this.getGeneralInfo.bind(this);

	  this.state = {
        referenceNumber: "",
		datePlaced: "",
        orderStatus: "",
        trackingNumber: "",
	 };
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getGeneralInfo(this.props.order)
	}

	getGeneralInfo(order) {
        this.setState({
            referenceNumber: order.referenceNumber,
            datePlaced: order.datePlaced,
            orderStatus: order.orderStatus,
            trackingNumber: order.trackingNumber
        });
	}
	
	render() {
		const {order} = this.props;

		const {referenceNumber, datePlaced, orderStatus, trackingNumber} = this.state;

        return (
            <div id='OrderView_General_Details'>
                <table>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
                        <td><h4>{referenceNumber}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
                        <td><h4>{datePlaced}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
                        <td><h4>{trackingNumber}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Status</h4></td>
                        <td><h4>{orderStatus}</h4></td>
                    </tr>
                </table>
            </div>
        );	
        
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
	};
  };
  
export default connect(mapStateToProps, {  })(GeneralInfo);