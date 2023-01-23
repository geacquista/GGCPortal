const ShippingAddress = require("../models/shippingAddress.model.js");

// Create and Save a new Address
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ShippingAddress
  const shippingAddress = new ShippingAddress({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  });

  // Save ShippingAddress in the database
  ShippingAddress.create(shippingAddress, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ShippingAddress."
      });
    else res.send(data);
  });
};

/**
 * Get all shippingAddresss in the database, it also accepts permissionType for a filter
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) => {
    ShippingAddress.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shippingAddresss."
        });
      else res.send(data);
    });
  };

// Find a single ShippingAddress by Id
exports.findOne = (req, res) => {
  ShippingAddress.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ShippingAddress with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ShippingAddress with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a ShippingAddress identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  ShippingAddress.updateById(
    req.params.id,
    new ShippingAddress(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ShippingAddress with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ShippingAddress with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ShippingAddress with the specified id in the request
exports.delete = (req, res) => {
  ShippingAddress.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ShippingAddress with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ShippingAddress with id " + req.params.id
        });
      }
    } else res.send({ message: `ShippingAddress was deleted successfully!` });
  });
};

// Delete all ShippingAddresss from the database.
exports.deleteAll = (req, res) => {
  ShippingAddress.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shippingAddresss."
      });
    else res.send({ message: `All ShippingAddresss were deleted successfully!` });
  });
};
