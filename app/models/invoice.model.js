const sql = require("./db.js");

// constructor for an INVOICE
const Invoice = function(invoice) {
  this.orderID == invoice.orderID;
  this.invoiceNumber = invoice.invoiceNumber;
  this.customerPaid = invoice.customerPaid;
  this.revenue = invoice.revenue;
  this.expense = invoice.expense;
  this.invoiceStatus = invoice.invoiceStatus;
};

/**
 * @param {*} newInvoice 
 * @param {*} result 
 */
//  Invoice.create = (newInvoice, result) => {

//   // could change query formatting here to be consistent throughout
//   var query = "INSERT INTO `Invoice` (`orderID`, `invoiceNumber`, `customerPaid`, `revenue`, `expense`, `isPaid`) VALUES (?,?,?,?,?);"
//   sql.query(query,
//     [newInvoice.orderID, newInvoice.invoiceNumber, newInvoice.customerPaid, newInvoice.revenue, newInvoice.expense, newInvoice.isPaid], function (err, res) {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created invoice: ", {...newInvoice });
//     result(null, {...newInvoice });
//   });
// };

/**
 * 
 * @param {{*}}  
 * @param {*} result 
 */
Invoice.getAll = (invoiceNumber, result) => {
    let query = "SELECT * FROM `Invoice`";

    if (invoiceNumber) {
      query += ` WHERE invoiceNumber LIKE '%${invoiceNumber}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      var data = JSON.parse(JSON.stringify(res))
      console.log("invoices: ", data);
      result(null, data);
    });
  };

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
Invoice.findById = (id, result) => {
  sql.query(`SELECT * FROM Invoice WHERE orderID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var data = JSON.parse(JSON.stringify(res[0]))
      console.log("found invoice: ", data);
      result(null, data);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

/**
 * 
 * @param {*} id 
 * @param {*} invoice 
 * @param {*} result 
 */
Invoice.updateById = (id, invoice, result) => {
  sql.query(
    "UPDATE Invoice SET invoiceNumber = ?, customerPaid = ?, revenue = ?, expense = ?, invoiceStatus = ? WHERE orderID = ?",
    [invoice.invoiceNumber, invoice.customerPaid, invoice.revenue, invoice.expense, invoice.invoiceStatus, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated invoice: ", { ...invoice });
      result(null, {...invoice });
    }
  );
};

/**
 * Removes invoice with the id passed to the function
 * @param {*} id 
 * @param {*} result 
 */
Invoice.remove = (id, result) => {
  sql.query("DELETE FROM Invoice WHERE orderID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted invoice with id: ", id);
    result(null, res);
  });
};

/**
 * REMOVES ALL invoiceS
 * @param {*} result 
 */
Invoice.removeAll = result => {
  sql.query("DELETE FROM Invoice", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} invoices`);
    result(null, res);
  });
};


Invoice.getAllPaid = result => {
    sql.query("SELECT * FROM Invoice WHERE invoiceStatus='PaymentRecieved'", (err, res) => {
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