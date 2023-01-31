module.exports = app => {
    const orderline = require("../controllers/orderline.controller.js");
    var router = require("express").Router();
  
    // Create a new orderline
    router.post("/", orderline.create);

    // Retrieve all orderlines
    router.get("/", orderline.findAll);

    // Retrieve a single orderline with id
    router.get("/:id", orderline.findOne);

    // Update a orderline with id
    router.put("/:id", orderline.update);

    // Delete a orderline with id
    router.delete("/:id", orderline.delete);

    // Delete all orderlines
    router.delete("/", orderline.deleteAll);
  
    app.use('/api/orderline', router);
  };