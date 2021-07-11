const routes = require("express").Router();
const PostController = require("../controllers/PostController");
const { verifyToken } = require("./../controllers/middlewares/verifyToken");

routes.get("/post/get-all", verifyToken, PostController.getAllPost);
routes.get("/post/get-post-id", verifyToken, PostController.getPostByID);
routes.post("/post/create-post", verifyToken, PostController.createNewPost);
routes.post("/post/update-post", verifyToken, PostController.updatePost);

module.exports = routes;
