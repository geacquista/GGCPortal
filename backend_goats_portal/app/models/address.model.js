const sql = require("./db.js");

// constructor for a SHIPPING_ADDRESS
const ShippingAddress = function(shipping_address) {
  this.streetAddressOne = shipping_address.streetAddressOne;
  this.streetAddressTwo = shipping_address.streetAddressTwo;
  this.state = shipping_address.state;
  this.city = shipping_address.city;
  this.zip = shipping_address.zip;
};

/**
 * [COMPLETE] Inserts a new shippingAddress into the database
 * @param {*} newShippingAddress 
 * @param {*} result 
 */
 ShippingAddress.create = (newShippingAddress, result) => {

  // could change query formatting here to be consistent throughout
  var query = "INSERT INTO `ShippingAddress` (`streetAddressOne`, `streetAddressTwo`, `state`, `city`, `zip`) VALUES (?,?,?,?,?);"
  sql.query(query,
    [newShippingAddress.streetAddressOne, newShippingAddress.streetAddressTwo, newShippingAddress.state, newShippingAddress.city, newShippingAddress.zip], 
    function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shippingAddress: ", { shippingAddressID: res.insertId, ...newShippingAddress });
    result(null, { shippingAddressID: res.insertId, ...newShippingAddress });
  });
};

/**
 * 
 * @param {{*}}  
 * @param {*} result 
 */
ShippingAddress.getAll = (result) => {
    let query = "SELECT * FROM `ShippingAddress`";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      var data = JSON.parse(JSON.stringify(res))
      console.log("shippingAddresss: ", data);
      result(null, data);
    });
  };

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
ShippingAddress.findById = (id, result) => {
  sql.query(`SELECT * FROM ShippingAddress WHERE shippingAddressID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shippingAddress: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ShippingAddress with the id
    result({ kind: "not_found" }, null);
  });
};

/**
 * 
 * @param {*} id 
 * @param {*} shippingAddress 
 * @param {*} result 
 */
ShippingAddress.updateById = (id, shippingAddress, result) => {
  sql.query(
    "UPDATE ShippingAddress SET email = ?, password = ?, nickname = ?, permissionType = ? WHERE shippingAddressID = ?",
    [shippingAddress.email, shippingAddress.password, shippingAddress.nickname, this.permissionType, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ShippingAddress with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shippingAddress: ", { ...shippingAddress });
      result(null, {...shippingAddress });
    }
  );
};

/**
 * Removes shippingAddress with the id passed to the function
 * @param {*} id 
 * @param {*} result 
 */
ShippingAddress.remove = (id, result) => {
  sql.query("DELETE FROM ShippingAddress WHERE shippingAddressID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ShippingAddress with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shippingAddress with id: ", id);
    result(null, res);
  });
};

/**
 * REMOVES ALL shippingAddresss
 * @param {*} result 
 */
ShippingAddress.removeAll = result => {
  sql.query("DELETE FROM ShippingAddress", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} shippingAddresses`);
    result(null, res);
  });
};

module.exports = ShippingAddress;
