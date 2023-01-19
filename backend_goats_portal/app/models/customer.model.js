const sql = require("./db.js");

// constructor for an CUSTOMER
const Customer = function(customer) {
  this.firstName = customer.firstName;
  this.lastName = customer.lastName;
  this.phoneNumber = customer.phoneNumber;
  this.email = customer.email;
  //this.shippingID = customer.shippingID;
};

module.exports = Customer;
