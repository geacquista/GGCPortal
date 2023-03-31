"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var express = require("express");
var cors = require("cors");
var app = express();
var corsOptions = _defineProperty({
  origin: "http://goatsportalne-env.eba-jgwabt4g.us-east-1.elasticbeanstalk.com/"
}, "origin", "http://localhost:3001");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](_path["default"].join(__dirname, 'client', 'build')));
// simple route
app.get("/", function (req, res) {
  res.json({
    message: "Welcome to GGC Portal Server."
  });
});

//ROUTES GO HERE
require("./app/routes/address.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/orderline.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// set port, listen for requests
// 3001 local
// rds 3306
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});
