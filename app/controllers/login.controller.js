// const config = require("../config/auth.config");
const User = require("../models/user.model");


// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
  console.log(req.body)
  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with email ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with email " + req.body.email
        });
      }
    } else {

      if (req.body.password!= data.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log("loggin in")

      res.send(data);
    }
  })   
};
