const express = require("express");
const routes = express.Router();

const UserController = require("./../controllers/UserController");
const AuthController = require("./../controllers/AuthController");

// Auth
routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.login);
routes.post("/userregister", AuthController.register);

// User
routes.get("/users/:id", UserController.find);
routes.put("/users", UserController.updateInfo);

module.exports = routes;
