const sql = require("./db.js");

// constructor for a ORDER_LINE
const OrderLine = function(order_line) {
    //this.lineOrderID = order_line.lineOrderID
    //this.lineProductID = order_line.lineProductID;
    this.qtyOrder = order_line.qtyOrder;
};

module.exports = OrderLine;
