module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);

    // Retrieve all Users
    router.get("/", user.findAll);
  
    app.use('/api/users', router);
  };