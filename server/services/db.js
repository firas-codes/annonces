const mysql = require("mysql2");

const config = require("../config");

module.exports = mysql.createConnection(config.dbparams);