const sql = require("./db.js");

// constructor for a User
const User = function(user) {
    this.email = user.email,
    this.password = user.password,
    this.nickname = user.nickname,
    this.permissionType = user.permissionType;
};

/**
 * [COMPLETE] Inserts a new user into the database
 * @param {*} newUser 
 * @param {*} result 
 */
User.create = (newUser, result) => {

  // could change query formatting here to be consistent throughout
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

/**
 * 
 * @param {{*}} permissionType 
 * @param {*} result 
 */
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

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
User.findById = (id, result) => {
  sql.query(`SELECT * FROM Users WHERE userID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

/**
 * 
 * @param {*} id 
 * @param {*} user 
 * @param {*} result 
 */
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE Users SET email = ?, password = ?, nickname = ?, permissionType = ? WHERE userID = ?",
    [user.email, user.password, user.nickname, this.permissionType, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

/**
 * Removes user with the id passed to the function
 * @param {*} id 
 * @param {*} result 
 */
User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE userID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

/**
 * REMOVES ALL USERS
 * @param {*} result 
 */
User.removeAll = result => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;