const OrderLine = require("../models/orderline.model.js");

 // Create and Save a new OrderLine
 exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
 
   // Create a OrderLine
   const product = new OrderLine({
      lineOrderID: req.body.lineOrderID,
      lineProductID: req.body.lineProductID,
      qtyOrdered: req.body.qtyOrdered
   });
 
   // Save OrderLine in the database
   OrderLine.create(product, (err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the OrderLine."
       });
     else res.send(data);
   });
 };
 
 /**
  * Get all users in the database, it also accepts permissionType for a filter
  * @param {*} req 
  * @param {*} res 
  */
 exports.findAll = (req, res) => {
     const orderID = req.query.orderID;
     OrderLine.getAll(orderID, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving users."
         });
       else res.send(data);
     });
   };
 
 // Find a single OrderLine by Id
 exports.findOne = (req, res) => {
   OrderLine.findById(req.params.id, (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found OrderLine with id ${req.params.id}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving OrderLine with id " + req.params.id
         });
       }
     } else res.send(data);
   });
 };
 
 // Update a OrderLine identified by the id in the request
 exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
   console.log(req.body);
 
   OrderLine.updateById(
     req.params.id,
     new OrderLine(req.body),
     (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found OrderLine with id ${req.params.id}.`
           });
         } else {
           res.status(500).send({
             message: "Error updating OrderLine with id " + req.params.id
           });
         }
       } else res.send(data);
     }
   );
 };
 
 // Delete a OrderLine with the specified id in the request
 exports.delete = (req, res) => {
   OrderLine.remove(req.params.id, (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found OrderLine with id ${req.params.id}.`
         });
       } else {
         res.status(500).send({
           message: "Could not delete OrderLine with id " + req.params.id
         });
       }
     } else res.send({ message: `OrderLine was deleted successfully!` });
   });
 };
 
 // Delete all OrderLines from the database.
 exports.deleteAll = (req, res) => {
   OrderLine.removeAll((err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all products."
       });
     else res.send({ message: `All OrderLines were deleted successfully!` });
   });
 };
 