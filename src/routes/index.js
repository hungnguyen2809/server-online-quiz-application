const express = require("express");
const routes = express.Router();
const verifyToken = require("./../controllers/middlewares/verifyToken");

const UserController = require("./../controllers/UserController");
const AuthController = require("./../controllers/AuthController");

// Auth
routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.login);
routes.post("/userregister", AuthController.register);

// User
routes.get("/users", verifyToken, UserController.find);
routes.put("/users", verifyToken, UserController.updateInfo);

module.exports = routes;
