const TopicModal = require("./../models/TopicModal");
const resServe = require("./../common/resultServe");
const _ = require("lodash");

class TopicController {
	constructor() {}

	getTopics = async (req, res) => {
		try {
			const topics = await TopicModal.getTopics();
			return res.send(resServe.success("Success", topics.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	createNewTopic = async (req, res) => {
		try {
			let { name, image, description } = req.body;
			if (!name || !image || !description) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'name' or 'image' or 'description'."
					)
				);
			}
			const payload = {
				name,
				image: image === -1 ? null : image,
				description: description === -1 ? null : description,
			};
			const topics = await TopicModal.createTopic(payload);
			return res.send(resServe.success("Success", topics.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	deleteTopic = async (req, res) => {
		try {
			const { id } = req.query;
			if (!id) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate 'id'"));
			}
			const payload = { id };
			const topics = await TopicModal.deleteTopic(payload);

			if(_.get(topics, "data") === false){
				return res.send(resServe.error("Topic not exists."));
			}
			return res.send(resServe.success("Delete Success", topics.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};
}

module.exports = new TopicController();
