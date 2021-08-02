const PostModal = require("../models/PostModal");
const resServer = require("./../common/resultServe");
const { checkUndefined } = require("./../common/methodServer");
const { toNumber } = require("lodash");

class PostController {
	constructor() {}

	getAllPost = async (req, res) => {
		try {
			const { per, offset } = req.query;
			if (!offset) {
				return res.send(resServer.error("Bad request, invalidate 'offset' "));
			}
			const permission = checkUndefined(per) ? 0 : per;
			const posts = await PostModal.getAllPost(permission, toNumber(offset));
			return res.send(resServer.success(null, posts.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};

	createNewPost = async (req, res) => {
		const { id_user, content, image } = req.body;
		if (!id_user || !content || checkUndefined(image)) {
			return res.send(
				resServer.error("Bad request, invalidate 'id_user', 'content', 'image'")
			);
		}

		const payload = { id_user, content, image };
		const post = await PostModal.createNewPost(payload);
		return res.send(resServer.success(null, post.data));
	};

	getPostByID = async (req, res) => {
		try {
			const { id_post } = req.query;
			if (!id_post) {
				return res.send(resServer.error("Bad request, invalidate 'id_post' "));
			}

			const post = await PostModal.getPostById(id_post);
			return res.send(resServer.success(null, post.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};

	updatePost = async (req, res) => {
		try {
			const { id_post, content, image, status } = req.body;
			if (
				checkUndefined(id_post) ||
				checkUndefined(content) ||
				checkUndefined(image)
			) {
				return res.send(
					resServer.error(
						"Bad request, invalidate 'id_post', 'content', 'image'"
					)
				);
			}

			const newStatus = status ? status : 1;
			if (toNumber(newStatus) !== 1 && toNumber(newStatus) !== 0) {
				return res.send(resServer.error("Status had value 1 or 0"));
			}

			const payload = { id_post, content, image, newStatus };
			const postUpdate = await PostModal.updatePost(payload);

			return res.send(resServer.success(null, postUpdate.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};

	createPostComment = async (req, res) => {
		try {
			const { id_post, id_user, comment, image } = req.body;
			if (!id_post || !id_user || !comment || checkUndefined(image)) {
				return res.send(
					resServer.error(
						"Bad request, invalidate 'id_post', 'id_user', 'comment', 'image'"
					)
				);
			}

			const params = { id_post, id_user, comment, image };
			const post_cmt = await PostModal.createPostComment(params);
			return res.send(resServer.success(null, post_cmt.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};

	getPostCommentByID = async (req, res) => {
		try {
			let { id_post, per } = req.query;
			if (!id_post) {
				return res.send(resServer.error("Bad request, invalidate 'id_post'"));
			}
			per = checkUndefined(per) ? 0 : per;

			const post_cmt = await PostModal.getPostCommentByID(id_post, per);
			return res.send(resServer.success(null, post_cmt.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};

	updatePostComment = async (req, res) => {
		try {
			let { id_post_cmt, comment, image, status } = req.body;
			if (
				!id_post_cmt ||
				checkUndefined(comment) ||
				checkUndefined(image) ||
				checkUndefined(status)
			) {
				return res.send(
					resServer.error(
						"Bad request, invalidate 'id_post_cmt', 'comment', 'image', 'status'"
					)
				);
			}

			const payload = { id_post_cmt, comment, image, status };
			const post_cmt = await PostModal.updatePostComment(payload);
			return res.send(resServer.success(null, post_cmt.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServer.error(sqlMessage));
			}
			return res.send(resServer.error(ex.message));
		}
	};
}

module.exports = new PostController();
