"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const express = require("express");
const cors = require("cors");
const app = express();

// var corsOptions = {
//   origin: 'http://goats-portal.us-east-1.elasticbeanstalk.com' || 'http://localhost:3001'
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(_path.default.join(__dirname, 'client', 'build')));
// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to GGC Portal Server."
  });
});

//API ROUTES GO HERE
require("./app/routes/address.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/orderline.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/board.routes.js")(app);
require("./app/routes/login.routes.js")(app);

// set port, listen for requests
// 3001 local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
