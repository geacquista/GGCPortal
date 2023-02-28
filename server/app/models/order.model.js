const sql = require("./db.js");

// constructor for an ORDER
const Order = function(order) {
  //orderID is the pk AI
  this.datePlaced = order.datePlaced;
  this.isGift = order.isGift;
  this.giftFor = order.giftFor;
  this.giftMessage = order.giftMessage;
  this.trackingNumber = order.trackingNumber;
  this.orderStatus = order.orderStatus;
  this.shippingId = order.shippingId;
  this.customerId = order.customerId;
  this.referenceNumber = order.referenceNumber;
  this.isSelfOrder = order.isSelfOrder
};


/**
 * [COMPLETE] Inserts a new order into the database
 * @param {*} newOrder 
 * @param {*} result 
 */
 Order.create = (newOrder, result) => {
  // could change query formatting here to be consistent throughout
  var query = "INSERT INTO `Order` (`datePlaced`, `isGift`, `giftFor`, `giftMessage`, `trackingNumber`,`orderStatus`,`shippingId`,`customerId`,`referenceNumber`,`isSelfOrder`) VALUES (?,?,?,?,?,?,?,?,?,?);"
  sql.query(query,
    [newOrder.datePlaced, newOrder.isGift, newOrder.giftFor, newOrder.giftMessage, newOrder.trackingNumber, newOrder.orderStatus, newOrder.shippingId, newOrder.customerId, newOrder.referenceNumber, newOrder.isSelfOrder], 
    function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { orderID: res.insertId, ...newOrder });
    result(null, { orderID: res.insertId, ...newOrder });
  });
};

/**
 * @param {{*}} lastName, referenceNumber, invoiceNumber 
 * @param {*} result 
 */
/**
 * 
 * @param {*} param0 
 * @param {*} result 
 */
Order.getAll = (lastName,referenceNumber, result) => {
    let query = "SELECT * FROM `Order`";
  
    if (lastName) {
      query += ` WHERE lastName LIKE '%${lastName}%'`;
    } 
    else if (referenceNumber) {
      query += ` WHERE referenceNumber LIKE '%${referenceNumber}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      var data = JSON.parse(JSON.stringify(res))
      console.log("orders: ", data);
      result(null, data);
    });
  };

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
Order.findById = (id, result) => {
  sql.query(`SELECT * FROM Order WHERE orderID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
  });
};

/**
 * 
 * @param {*} id 
 * @param {*} order 
 * @param {*} result 
 */
Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE Order SET datePlaced = ?, isGift = ?, giftFor = ?, giftMessage = ?, trackingNumber = ?, orderStatus = ?, shippingId = ?, customerId = ?, referenceNumber = ?, isSelfOrder = ? WHERE orderID = ?",
    [order.datePlaced, order.isGift, order.giftFor, order.giftMessage, order.trackingNumber, order.orderStatus, order.shippingId, order.customerId, order.referenceNumber, order.isSelfOrder, id], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { orderID: id, ...order });
      result(null, { orderID: id, ...order });
    }
  );
};

/**
 * Removes order with the id passed to the function
 * @param {*} id 
 * @param {*} result 
 */
Order.remove = (id, result) => {
  sql.query("DELETE FROM `Order` WHERE `orderID` = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

/**
 * REMOVES ALL orders
 * @param {*} result 
 */
Order.removeAll = result => {
  sql.query("DELETE FROM Order", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};



module.exports = Order;
