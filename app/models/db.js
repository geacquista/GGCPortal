const mysql = require("mysql");
//const dbConfig = require("../config/db.cnfg.t2small.js");

// const dbConfig = require("../config/db.cnfg.t3small.js");
const dbConfig = require("../config/secured.cnfg.js");


var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;