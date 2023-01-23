module.exports = app => {
  const addresses = require("../controllers/address.controller.js");

  var router = require("express").Router();

  // Create a new Shipping Address
  router.post("/", addresses.create);

  // Retrieve all Shipping Addresss
  router.get("/", addresses.findAll);

  // Retrieve a single Shipping Address with id
  router.get("/:id", addresses.findOne);

  // Update a Shipping Address with id
  router.put("/:id", addresses.update);

  // Delete a Shipping Address with id
  router.delete("/:id", addresses.delete);

  // Delete all Shipping Addresss
  router.delete("/", addresses.deleteAll);

  app.use('/api/shipping_addresses', router);
};
