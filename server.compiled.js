"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var express = require("express");
var cors = require("cors");
var app = express();
var corsOptions = {
  origin: "http://goatsportalne-env.eba-jgwabt4g.us-east-1.elasticbeanstalk.com/"
};
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
