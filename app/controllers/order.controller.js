 const Order = require("../models/order.model.js");

 // Create and Save a new Order
 exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
 
   // Create a Order
   const order = new Order({
    referenceNumber: req.body.referenceNumber,
    datePlaced: req.body.datePlaced,
    // datePlaced: moment(req.body.datePlaced).format('YYYY-MM-DD HH:mm:ss'),
    isGift: req.body.isGift,
    giftFor: req.body.giftFor,
    giftMessage: req.body.giftMessage,
    trackingNumber: req.body.trackingNumber,
    orderStatus: req.body.orderStatus,
    shippingId: req.body.shippingId,
    customerId: req.body.customerId,  
    isSelfOrder: req.body.isSelfOrder
   });
 
   // Save Order in the database
   Order.create(order, (err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Order."
       });
     else res.send(data);
   });
 };
 
 /**
  * Get all orders in the database, it also accepts lastName for a filter
  * @param {*} req 
  * @param {*} res 
  */
 exports.findAll = (req, res) => {
     const lastName = req.query.lastName;
     const referenceNumber = req.query. referenceNumber;
     Order.getAll(lastName, referenceNumber, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving orders."
         });
       else res.send(data);
     });
   };
 
 // Find a single Order by Id
 exports.findOne = (req, res) => {
   Order.findById(parseInt(req.params.id), (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Order with id ${req.params.id}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving Order with id " + req.params.id
         });
       }
     } else res.send(data);
   });
 };
 
 // Update a Order identified by the id in the request
 exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   }
   console.log(req.body);
 
   Order.updateById(
     parseInt(req.params.id),
     new Order(req.body),
     (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Order with id ${req.params.id}.`
           });
         } else {
           res.status(500).send({
             message: "Error updating Order with id " + req.params.id
           });
         }
       } else res.send(data);
     }
   );
 };
 
 // Delete a Order with the specified id in the request
 exports.delete = (req, res) => {
   Order.remove(req.params.id, (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Order with id ${req.params.id}.`
         });
       } else {
         res.status(500).send({
           message: "Could not delete Order with id " + req.params.id
         });
       }
     } else res.send({ message: `Order was deleted successfully!` });
   });
 };
 
 // Delete all Orders from the database.
 exports.deleteAll = (req, res) => {
   Order.removeAll((err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all orders."
       });
     else res.send({ message: `All Orders were deleted successfully!` });
   });
 };