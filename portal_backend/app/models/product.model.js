const sql = require("./db.js");

// constructor for a PRODUCT
const Product = function(product) {
    //this.productID = product.productID;
    this.name = product.name;
    this.description = product.description;
    this.sku = product.sku;
};

module.exports = Product;
