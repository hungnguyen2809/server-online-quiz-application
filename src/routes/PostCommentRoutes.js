const routes = require("express").Router();
const PostController = require("../controllers/PostController");
const { verifyToken } = require("../controllers/middlewares/verifyToken");

routes.post(
	"/post-cmt/create-post-cmt",
	verifyToken,
	PostController.createPostComment
);
routes.get(
	"/post-cmt/get-comment",
	verifyToken,
	PostController.getPostCommentByID
);
routes.post(
	"/post-cmt/update-post-cmt",
	verifyToken,
	PostController.updatePostComment
);

module.exports = routes;
