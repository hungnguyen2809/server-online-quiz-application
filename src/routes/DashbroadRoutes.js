const routes = require("express").Router();
const { verifyToken } = require("./../controllers/middlewares/verifyToken");
const DashbroadController = require("../controllers/DashbroadController");

routes.get(
	"/info-dashbroad",
	verifyToken,
	DashbroadController.getInfoDashbroad
);

module.exports = routes;
