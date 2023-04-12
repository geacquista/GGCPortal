// const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
// const User = require("../models/user.model.js");
// const { PermissionTypes } = require("../../client/src/App.js");

// exports.verifyToken = function verifyToken (req, res, next) {
//   let token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!"
//     });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// exports.isAdmin = (req, res, next) => {ß
//   User.findByPk(req.userId)
//   .then(user => {
//     if (user.permissionType === PermissionTypes.ADMIN) {
//         next();
//         return;
//       }
//   });
// };

// exports.isModerator = (req, res, next) => {
//   User.findByPk(req.userId)
//   .then(user => {
//     if (user && user.permissionType === PermissionTypes.FARM) {
//       next();
//     } else {
//       res.status(403).send('Access Denied');
//     }
//   });
// };

// exports.isGGC = (req, res, next) => {
//   User.findByPk(req.userId)
//   .then(user => {
//     if (user && user.permissionType === PermissionTypes.GGC) {
//       next();
//     } else {
//       res.status(403).send('Access Denied');
//     }
//   })
//   .catch(err => {
//     res.status(500).send(err.message);
//   });
// };
