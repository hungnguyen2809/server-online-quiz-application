const mysql = require("mysql");
require("dotenv").config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const DBNAME = process.env.DB_NAME;

const connectDB = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DBNAME,
	insecureAuth: true,
});

module.exports = connectDB;
