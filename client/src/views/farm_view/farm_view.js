import React, { Component } from 'react';

const InvoiceInfoEdit = ({invoiceNumber, revenue, expense, invoiceStatus, handleChange}) => {
  return (
    <div id='OrderView_Invoice_Details'>
      <div className="form-group">
                <label htmlFor="invoiceNumber"><h4 style={{fontWeight: 'bold'}}>Invoice Number</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="invoiceNumber"
                  required
                  defaultValue={invoiceNumber || ''}
                  onChange={handleChange}
                  name="invoiceNumber"
                />
              </div>
      <div> 
        <h4 style={{fontWeight: 'bold'}}>Revenue</h4>
        <h4>{revenue}</h4>
          <h4 style={{fontWeight: 'bold'}}>Expense</h4>
        <h4>{expense}</h4>
      </div>
      

     </div> 
   );	

}


class FarmView extends Component {

  
  render() {
    return (
      <div>
        <h1>FARM BOARD</h1>
        <p>Welcome to the farm screen!</p>
       
      </div>
    );
  }
}

export default FarmView;
