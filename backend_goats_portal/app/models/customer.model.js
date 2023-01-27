const sql = require("./db.js");

// constructor for a CUSTOMER
const Customer = function(customer) {
  this.firstName = customer.firstName;
  this.lastName = customer.lastName;
  this.phoneNumber = customer.phoneNumber;
  this.email = customer.email;
  this.customerShippingID = customer.shippingID;
};


/**
 * [COMPLETE] Inserts a new customer into the database
 * @param {*} newCustomer 
 * @param {*} result 
 */
 Customer.create = (newCustomer, result) => {

  // could change query formatting here to be consistent throughout
  var query = "INSERT INTO `Customer` (`firstName`, `lastName`, `phoneNumber`, `email`) VALUES (?,?,?,?);"
  sql.query(query,
    [newCustomer.firstName, newCustomer.lastName, newCustomer.phoneNumber, newCustomer.email], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { customerID: res.insertId, ...newCustomer });
    result(null, { customerID: res.insertId, ...newCustomer });
  });
};

Customer.createWithAddress = (newCustomer, result) => {

  // could change query formatting here to be consistent throughout
  var query = "INSERT INTO `Customer` (`firstName`, `lastName`, `phoneNumber`, `email`, `customerShippingId) VALUES (?,?,?,?,?);"
  sql.query(query,
    [newCustomer.firstName, newCustomer.lastName, newCustomer.phoneNumber, newCustomer.email, newCustomerShippingID.customerShippingId], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { customerID: res.insertId, ...newCustomer });
    result(null, { customerID: res.insertId, ...newCustomer });
  });
};

/**
 * 
 * @param {{*}}  
 * @param {*} result 
 */
Customer.getAll = (result) => {
    let query = "SELECT * FROM `Customer`";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      var data = JSON.parse(JSON.stringify(res))
      console.log("customers: ", data);
      result(null, data);
    });
  };

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
Customer.findById = (id, result) => {
  sql.query(`SELECT * FROM Customer WHERE customerID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

/**
 * 
 * @param {*} id 
 * @param {*} customer 
 * @param {*} result 
 */
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE Customer SET email = ?, password = ?, nickname = ?, permissionType = ? WHERE customerID = ?",
    [customer.email, customer.password, customer.nickname, this.permissionType, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { ...customer });
      result(null, {...customer });
    }
  );
};

/**
 * Removes customer with the id passed to the function
 * @param {*} id 
 * @param {*} result 
 */
Customer.remove = (id, result) => {
  sql.query("DELETE FROM Customer WHERE customerID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

/**
 * REMOVES ALL customers
 * @param {*} result 
 */
Customer.removeAll = result => {
  sql.query("DELETE FROM Customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
