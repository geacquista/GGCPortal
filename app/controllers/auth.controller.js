const config = require("../config/auth.config");
const User = require("../models/user.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    nickname: req.body.nickname,
    permissionType: req.body.permissionType, 
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.signin = (req, res) => {
  const email = req.query.email;
    User.findByEmail(email, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.userID }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.userID,
      username: user.username,
      email: user.email,
      permissionType: user.permissionType,
      accessToken: token
    });

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
