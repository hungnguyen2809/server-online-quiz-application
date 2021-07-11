const routes = require("express").Router();
const { verifyToken } = require("./../controllers/middlewares/verifyToken");
const UserController = require("../controllers/UserController");

routes.get("/users", verifyToken, UserController.find);
routes.post("/users-infor", verifyToken, UserController.updateInfo);
// routes.post(
// 	"/users-avatar",
// 	[verifyToken, uploadImg],
// 	UserController.updateAvatar
// );
routes.post("/users-avatar", [verifyToken], UserController.updateAvatar);
routes.get("/users-all", verifyToken, UserController.getAllUserBy);
routes.post(
	"/users/update-info-admin",
	[verifyToken],
	UserController.updateInfoUserAdmin
);

module.exports = routes;
