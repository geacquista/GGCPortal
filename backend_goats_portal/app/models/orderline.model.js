const sql = require("./db.js");

// constructor for a ORDER_LINE
const OrderLine = function(order_line) {
    this.lineOrderID = order_line.lineOrderID
    this.lineProductID = order_line.lineProductID;
    this.qtyOrdered = order_line.qtyOrdered;
};


/**
 * [COMPLETE] Inserts a new orderLine into the database
 * @param {*} newOrderLine 
 * @param {*} result 
 */
 OrderLine.create = (newOrderLine, result) => {

    // could change query formatting here to be consistent throughout
    var query = "INSERT INTO `OrderLine` (`lineOrderID`, `lineProductID`, `qtyOrdered`) VALUES ('"+newOrderLine.lineOrderID+"', '"+newOrderLine.lineProductID+"','"+newOrderLine.qtyOrdered+"');"
    sql.query(query, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created orderLine: ", {...newOrderLine });
      result(null, { ...newOrderLine });
    });
  };
  
  /**
   * 
   * @param {*} result 
   */
  OrderLine.getAll = (orderID, result) => {
      let query = "SELECT * FROM `OrderLine`";

      if (orderID) {
        query += ` WHERE lineOrderID LIKE '%${orderID}%'`;
      }


    
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        var data = JSON.parse(JSON.stringify(res))
        console.log("orderLines: ", data);
        result(null, data);
      });
    };
  
  
  /**
   * 
   * @param {*} id 
   * @param {*} orderLine 
   * @param {*} result 
   */
  OrderLine.updateById = (id, orderLine, result) => {
    sql.query(
      "UPDATE OrderLine SET productID = ?, qtyOrdered = ? WHERE lineOrderID = ? AND lineProductID = ?",
      [orderLine.productID, orderLine.qtyOrdered, id.orderLineID, id.lineProductID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found OrderLine with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated orderLine: ", { ...orderLine });
        result(null, {...orderLine });
      }
    );
  };
  
  /**
   * Removes orderLine with the id passed to the function
   * @param {*} id 
   * @param {*} result 
   */
  OrderLine.remove = (id, result) => {
    sql.query("DELETE FROM OrderLine WHERE orderLineID = ? AND productLineID", 
    [id.orderLineID, id.lineProductID], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found OrderLine with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted orderLine with id: ", id);
      result(null, res);
    });
  };
  
  /**
   * REMOVES ALL orderLines
   * @param {*} result 
   */
  OrderLine.removeAll = result => {
    sql.query("DELETE FROM OrderLine", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} orderLines`);
      result(null, res);
    });
  };


module.exports = OrderLine;
