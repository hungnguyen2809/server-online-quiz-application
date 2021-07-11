const routes = require("express").Router();

const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");

routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.loginUser);
routes.post("/adminlogin", AuthController.loginAdmin);
routes.post("/refresh-token", AuthController.refreshToken);
routes.post("/unregister-token", AuthController.unregisterTokenRefresh);
routes.post("/userregister", AuthController.registerUser);
routes.post("/foget-password", UserController.forgetPassword);

module.exports = routes;
