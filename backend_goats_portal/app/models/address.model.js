const sql = require("./db.js");

// constructor for a SHIPPING_ADDRESS
const ShippingAddress = function(shipping_address) {
  this.streetAddressOne = shipping_address.streetAddressOne;
  this.streetAddressTwo = shipping_address.streetAddressTwo;
  this.city = shipping_address.city;
  this.zip = shipping_address.zip;
};

module.exports = ShippingAddress;
