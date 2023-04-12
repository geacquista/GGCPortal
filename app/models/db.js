const mysql = require("mysql2");
//const dbConfig = require("../config/db.cnfg.t2small.js");

//const dbConfig = require("../config/secured.cnfg.js");
const dbConfig = require("../config/local.cnfig.js");



var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;