const sql = require("./db.js");

// constructor for an INVOICE
const Invoice = function(invoice) {
  this.invoiceNumber = invoice.invoiceNumber;
  this.revenue = invoice.revenue;
  this.expense = invoice.expense;
  this.isPaid = invoice.isPaid;
};


Invoice.getAllPaid = result => {
    sql.query("SELECT * FROM Invoice WHERE isPaid=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("orders: ", res);
      result(null, res);
    });
  };

module.exports = Invoice;