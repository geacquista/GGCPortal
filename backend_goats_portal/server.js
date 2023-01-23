const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GGC Portal Server." });
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});