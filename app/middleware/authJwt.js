import { PermissionTypes } from "../../client/src/App.js";
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const User = require("../models/user.model.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userID)
  .then(user => {
      if (user.permissionType === PermissionTypes.ADMIN) {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
};

isFarmRole = (req, res, next) => {
  User.findById(req.userId)
  .then(user => {
    if (user.permissionType === PermissionTypes.FARM) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Farm Role!"
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isFarmRole: isFarmRole,
};
module.exports = authJwt;
