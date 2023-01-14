const sql = require("./db.js");

// constructor for a ORDER_STATUS
const OrderStatus = function(order_status) {
    //this.statusID = order_status.statusID
    this.status = order_status.status;
};

module.exports = OrderStatus;
