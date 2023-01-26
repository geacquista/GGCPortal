const sql = require("./db.js");

// constructor for a PRODUCT
const Product = function(product) {
    //this.productID = product.productID;
    this.name = product.name;
    this.description = product.description;
    this.sku = product.sku;
};


/**
 * [COMPLETE] Inserts a new product into the database
 * @param {*} newProduct 
 * @param {*} result 
 */
 Product.create = (newProduct, result) => {

    // could change query formatting here to be consistent throughout
    var query = "INSERT INTO `Product` (`name`, `description`, `sku`) VALUES ('"+newProduct.name+"', '"+newProduct.description+"','"+newProduct.sku+"');"
    sql.query(query, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created product: ", { productID: res.insertId, ...newProduct });
      result(null, { productID: res.insertId, ...newProduct });
    });
  };
  
  /**
   * 
   * @param {{*}} sku 
   * @param {*} result 
   */
  Product.getAll = (sku, name, result) => {
      let query = "SELECT * FROM `Product`";
    
      if (sku) {
        query += ` WHERE sku LIKE '%${sku}%'`;
      }
      else if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
      }
    
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        var data = JSON.parse(JSON.stringify(res))
        console.log("products: ", data);
        result(null, data);
      });
    };
  
  /**
   * 
   * @param {*} id 
   * @param {*} result 
   */
  Product.findById = (id, result) => {
    sql.query(`SELECT * FROM Product WHERE productID = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Product with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  /**
   * 
   * @param {*} id 
   * @param {*} product 
   * @param {*} result 
   */
  Product.updateById = (id, product, result) => {
    sql.query(
      "UPDATE Product SET name = ?, description = ?, sku = ? WHERE productID = ?",
      [product.name, product.description, product.sku, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Product with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated product: ", { productID: id, ...product });
        result(null, { productID: id, ...product });
      }
    );
  };
  
  /**
   * Removes product with the id passed to the function
   * @param {*} id 
   * @param {*} result 
   */
  Product.remove = (id, result) => {
    sql.query("DELETE FROM Product WHERE productID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted product with id: ", id);
      result(null, res);
    });
  };
  
  /**
   * REMOVES ALL productS
   * @param {*} result 
   */
  Product.removeAll = result => {
    sql.query("DELETE FROM Product", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} products`);
      result(null, res);
    });
  };


module.exports = Product;
