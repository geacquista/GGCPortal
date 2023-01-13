
  /**
   * 
   *     const order = {
      id: {},
      referenceNumber: '',
      invoiceNumber: '',
      status: 'PLACED',
      datePlaced: '',
      revenue: 0,
      isSelfOrder: true,
      isGift: false,
      giftFor: '',
      giftMessage: '',
      shipmentTrackingNumber: '',
      customer: {
        id: {},
        email: 'gr-ggcexec@wpi.edu',
        firstName: 'Gompei\'s',
        lastName: 'Goat-Cheese',
        phoneNumber: '',
    
      },
      productsOrdered: [{
        id: '1',
        quantity: 3,
        product: {
          id: 'jPL6',
          name: 'plain',
          productDescription: 'A six oz log of plain goat cheese',
        }	
      }],
      shippingAddress: {
        id: '1',
        firstName: 'Gompei\'s',
        lastName: 'Goat-Cheese',
        streetAddress: '100 Institute Road\nMailbox #',
        city: 'Worcester',
        state: 'MA',
        zipCode: '01609',
      },
      invoice: {
        id: '1',
        invoiceNumber: '',
        expense: 0,
        isPaid: false,
      },
    };
      const {inputs, handleInputChange, handleSubmit} = useOrderForm(order)
    
      let recipient
      if(order.isGift){
          recipient = order.giftFor
  
      } else{
          recipient = order.customer.firstName + ' ' + order.customer.lastName 
      }
  
      var numberOfFlavors = 0
      order.productsOrdered.forEach(product => numberOfFlavors++)
  
      var numberOfLogs = 0
      order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)
   */

import React, { Component } from "react";
import { connect } from "react-redux";

import { createOrder } from "../../actions/order_actions";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeDatePlaced = this.onChangeDatePlaced.bind(this);
    this.onChangeIsGift = this.onChangeIsGift.bind(this);
    this.onChangeGiftFor = this.onChangeGiftFor.bind(this);
    this.onChangeGiftMessage = this.onChangeGiftMessage.bind(this);
    this.onChangeTrackingNumber = this.onChangeTrackingNumber.bind(this);
    this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
    this.onChangeShippingID = this.onChangeShippingID.bind(this);
    this.onChangeCustomerID = this.onChangeCustomerID.bind(this);
    this.onChangeReferenceNumber = this.onChangeReferenceNumber.bind(this);

    
    this.saveOrder = this.saveOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.state = {
      id: null,

      datePlaced: "",
      isGift: true,
      giftFor: "",
      giftMessage: "", 
      trackingNumber:"", 

      orderStatusId:"", 
      shippingId:"", 
      customerId:"", 

      referenceNumber:"",

      submitted: false,
    };
  }

  onChangeDatePlaced(e) {
    this.setState({
      datePlaced: e.target.value,
    });
  }

  onChangeIsGift(e) {
    this.setState({
      isGift: e.target.value,
    });
  }

  onChangeGiftFor(e) {
    this.setState({
      giftFor: e.target.value,
    });
  }
  onChangeGiftMessage(e) {
    this.setState({
      giftMessage: e.target.value,
    });
  }
  onChangeTrackingNumber(e) {
    this.setState({
      trackingNumber: e.target.value,
    });
  }
  onChangeOrderStatus(e) {
    this.setState({
      orderStatusId: e.target.value,
    });
  }
  onChangeShippingID(e) {
    this.setState({
      shippingId: e.target.value,
    });
  }
  onChangeCustomerID(e) {
    this.setState({
      customerId: e.target.value,
    });
  }
  onChangeReferenceNumber(e) {
    this.setState({
      referenceNumber: e.target.value,
    });
  }

  saveOrder() {
    const { datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber} = this.state;

    this.props
      .createOrder(datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber)
      .then((data) => {
        this.setState({
          id: data.id,

          datePlaced: data.datePlaced,
          isGift: data.isGift,
          giftFor: data.giftFor,
          giftMessage: data.giftMessage, 
          trackingNumber:data.trackingNumber, 
    
          orderStatusId:data.orderStatusId, 
          shippingId:data.shippingId, 
          customerId:data.customerId, 
    
          referenceNumber:data.referenceNumber,
  
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOrder() {
    this.setState({
      id: null,

      datePlaced: "",
      isGift: true,
      giftFor: "",
      giftMessage: "", 
      trackingNumber:"", 

      orderStatusId:null, 
      shippingId:null, 
      customerId:null, 

      referenceNumber:"",

      submitted: false,
    });
  }

  render() {
    return (
        <div id='OrderDetails'>
            <h1>TEST:admin?</h1>
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newOrder}>
                    Add
                  </button>
                </div>
              ) : (
              <div>
                <div id='OrderView_Header'>
                    {/**on submit i want to dispatch the createOrder action and  */}
                    <button onClick={this.saveOrder} type="submit">Save</button>
                    <button onClick={this.newOrder}>Cancel</button>
                </div>
                
                <div className="form-group">
                  <label htmlFor="date">Date Placed</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    required
                    value={this.state.datePlaced}
                    onChange={this.onChangeDatePlaced}
                    name="date"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="isGift">Is Gift</label>
                  <input
                    type="checkbox"
                    className="form-control"
                    id="isGift"
                    value={this.state.isGift}
                    onChange={this.onChangeIsGift}
                    name="isGift"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="giftFor">Gift For</label>
                  <input
                    type="text"
                    className="form-control"
                    id="giftFor"
                    value={this.state.giftFor}
                    onChange={this.onChangeGiftFor}
                    name="giftFor"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Gift Message</label>
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    value={this.state.giftMessage}
                    onChange={this.onChangeGiftMessage}
                    name="message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tracking">Tracking Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tracking"
                    value={this.state.trackingNumber}
                    onChange={this.onChangeTrackingNumber}
                    name="tracking"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Order Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    required
                    value={this.state.orderStatusId}
                    onChange={this.onChangeOrderStatus}
                    name="status"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shipping">Shipping Info</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipping"
                    required
                    value={this.state.shippingId}
                    onChange={this.onChangeShippingID}
                    name="shipping"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer">Customer Info</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customer"
                    required
                    value={this.state.customerId}
                    onChange={this.onChangeCustomerID}
                    name="customer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reference">Reference Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="reference"
                    required
                    value={this.state.referenceNumber}
                    onChange={this.onChangeReferenceNumber}
                    name="reference"
                  />
                </div>

              </div>
            )}

        </div>
    );
  }
}

export default connect(null, { createOrder })(CreateOrder);