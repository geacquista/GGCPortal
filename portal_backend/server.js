const express = require("express");
const cors = require("cors");
const app = express();
// const mysql = require('mysql')

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GGC Portal Server." });
});

require("./app/routes/order.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});