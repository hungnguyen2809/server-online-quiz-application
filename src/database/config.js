const mysql = require("mysql2");
require("dotenv").config();
const { IS_PRODUCT } = require("./../constants");

const HOST = IS_PRODUCT ? process.env.DB_HOST_PRODUCT : process.env.DB_HOST_DEV;
const USER = IS_PRODUCT ? process.env.DB_USER_PRODUCT : process.env.DB_USER_DEV;
const PASSWORD = IS_PRODUCT ? process.env.DB_PASS_PRODUCT : process.env.DB_PASS_DEV;
const DBNAME = IS_PRODUCT	? process.env.DB_NAME_PRODUCT : process.env.DB_NAME_DEV;

const connectDB = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DBNAME,
	// insecureAuth: true,
});

module.exports = connectDB;
