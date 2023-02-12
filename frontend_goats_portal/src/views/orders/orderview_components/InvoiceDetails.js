import React, {Component} from "react";
import { connect } from "react-redux";

import { retrieveInvoice } from "../../../store/invoice_slice";

class InvoiceInfo extends Component {
	constructor(props) {
	  super(props);

	  this.getInvoiceData = this.getInvoiceData.bind(this);

	  this.state = {
        orderID: "",
		invoiceNumber: "NA",
		revenue: "",
		expense: "",
		isPaid: "",
	 };
	}

	// This gets the users when the component loads
	componentDidMount() {
		this.getInvoiceData(this.props.order.orderID)
	}

	getInvoiceData(id) {
		this.props
			.retrieveInvoice({id})
			.then((data) => {
				console.log(data);
				this.setState({
                    orderID: data.payload.orderID,
					invoiceNumber: data.payload.invoiceNumber,
					revenue: data.payload.revenue,
                    expense: data.payload.expense,
                    isPaid: data.payload.isPaid,
				});
			})
			.catch((e) => {
			console.log(e);
			});
	}

	
	render() {
		const {invoices} = this.props;
		console.log(invoices);

		const {invoiceNumber, revenue, expense, isPaid} = this.state;
        console.log(invoiceNumber)

        if (invoiceNumber) {
            return (
                <div id='OrderView_Invoice_Details'>
                   <table>
                       <tr>
                           <td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
                           <td><h4>{invoiceNumber}</h4></td>
                       </tr>
                       <tr>
                           <td><h4 style={{fontWeight: 'bold'}}>Revenue</h4></td>
                           <td><h4>{revenue}</h4></td>
                       </tr>
                       <tr>
                           <td><h4 style={{fontWeight: 'bold'}}>Expense</h4></td>
                           <td><h4>{expense}</h4></td>
                       </tr>
                   </table>
               </div> 
           );	
        }
        else {
            return (
                <div id='OrderView_Invoice_Details'>
                   <div>Missing Invoice</div>
               </div> 
           );
           
        }

		
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
		invoices: state.invoices,
	};
  };
  
export default connect(mapStateToProps, { retrieveInvoice })(InvoiceInfo);