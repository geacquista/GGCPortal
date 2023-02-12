import React, {Component} from "react";
import { connect } from "react-redux";

class GiftInfo extends Component {
	constructor(props) {
	  super(props);

	  this.getGiftInfo = this.getGiftInfo.bind(this);

	  this.state = {
        giftFor: "",
		giftMessage: "",
		isGift: 1,
	 };
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getGiftInfo(this.props.order)
	}

	getGiftInfo(order) {

        this.setState({
            giftFor: order.giftFor,
            giftMessage: order.giftMessage,
            isGift: order.isGift,
        });

	}

	
	render() {
		const {order} = this.props;

		const {giftFor, giftMessage, isGift} = this.state;

        return (
            <div id='OrderView_Invoice_Details'>
                <table>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Gift Recipient</h4></td>
                        <td><h4>{giftFor}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>
                        <td><h4>{giftMessage}</h4></td>
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
  
export default connect(mapStateToProps, {  })(GiftInfo);