module.exports = app => {
    const invoices = require("../controllers/invoice.controller.js")
  
    var router = require("express").Router();
  
    // Create a new Invoices
    router.post("/", invoices.create);
  
    // Retrieve all Invoices
    router.get("/", invoices.findAll);
  
    // Retrieve all paid Invoices
    router.get("/paid", invoices.findAllPaid);
  
    // Retrieve a single Invoice with id
    router.get("/:id", invoices.findOne);
  
    // Update a Invoice with id
    router.put("/:id", invoices.update);
  
    // Delete a Invoices with id
    router.delete("/:id", invoices.delete);
  
    // Delete all Invoices
    router.delete("/", invoices.deleteAll);
  
    app.use('/api/invoices', router);
  };
  