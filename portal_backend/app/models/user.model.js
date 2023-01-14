const sql = require("./db.js");

// constructor for a User
const User = function(user) {
    this.email = user.email,
    this.password = user.password,
    this.nickname = user.nickname,
    this.permissionType = user.permissionType;
};

User.create = (newUser, result) => {
  // var query = "INSERT INTO Order SET ?"
  var query = "INSERT INTO `Users` (`email`, `password`, `nickname`, `permissionType`) VALUES ('"+newUser.email+"', '"+newUser.password+"','"+newUser.nickname+"' ,'"+newUser.permissionType+"');"
  sql.query(query, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { userID: res.insertId, ...newUser });
    result(null, { userID: res.insertId, ...newUser });
  });
};

User.getAll = (permissionType, result) => {
    let query = "SELECT * FROM `Users`";
  
    if (permissionType) {
      query += ` WHERE permissionType LIKE '%${permissionType}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      var data = JSON.parse(JSON.stringify(res))
      console.log("users: ", data);
      result(null, data);
    });
  };

module.exports = User;