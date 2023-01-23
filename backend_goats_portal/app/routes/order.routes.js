module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", orders.create);

  // Retrieve all Orders
  router.get("/", orders.findAll);

  // Retrieve a single Order with id
  router.get("/:id", orders.findOne);

  // router.get("/lastNames", orders.findByLast);
  // router.get("/reference", orders.findByReference);
  // router.get("/invoiceNumber", orders.findByInvoice);

  // Update a Order with id
  router.put("/:id", orders.update);

  // Delete a Order with id
  router.delete("/:id", orders.delete);

  // Delete all Orders
  router.delete("/", orders.deleteAll);

  app.use('/api/orders', router);
};

