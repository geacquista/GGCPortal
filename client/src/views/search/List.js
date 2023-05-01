import React, { Component } from 'react';
import OrderCard from '../orders/orderview_components/OrderCard';
import { connect } from 'react-redux';

import "../../assets/style/search.css"


class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const {customers, shippingAddresses, invoices, orderline} = this.props;

    const filteredData = this.props.orders.filter(el => {
      if (this.props.input === '') {
        return el;
      } else {
        return el.referenceNumber.includes(this.props.input);
      }
    });

    return (
      <div className="grid-container">
        {filteredData.map(order => {
            const filteredCustomer = customers.filter(customer => customer.customerID === order.customerId)[0]
            const filteredAddress = shippingAddresses.filter(address => address.shippingID === order.shippingId)[0]
            const filteredInvoice= invoices.filter(invoice => invoice.orderID === order.orderID)[0]
            const filteredLine = orderline.filter(line => line.lineOrderID === order.orderID)[0]

            return(
            
              <div className='grid-item'>
                <OrderCard
                  key={order.orderID}
                  order={order}

                  color='#90E0C9'
                  customer={filteredCustomer} 
                  address={filteredAddress} 
                  invoice={filteredInvoice} 
                  orderline={filteredLine} 
                />
              </div>
            
        ) 
        }) 
        }
             
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
		invoices: state.invoices,
		shippingAddresses: state.shippingAddresses,
		customers: state.customers,
		orderline: state.orderline,

	};
  };

export default connect(mapStateToProps, {})(List);