module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", products.create);

    // Retrieve all Users
    router.get("/", products.findAll);

    // Retrieve a single User with id
    router.get("/:id", products.findOne);

    // Update a User with id
    router.put("/:id", products.update);

    // Delete a User with id
    router.delete("/:id", products.delete);

    // Delete all Users
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
  };