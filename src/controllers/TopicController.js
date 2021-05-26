const TopicModel = require("../models/TopicModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");
const { get, map, countBy } = require("lodash");
const configPath = require("../common/configPathImage");
const QuestionSetModel = require("../models/QuestionSetModel");

class TopicController {
	constructor() {}
	_isUndefined = (value) => {
		return typeof value === "undefined";
	};

	getTopics = async (req, res) => {
		try {
			const permission = this._isUndefined(req.query.per) ? 0 : 1;
			const topics = await TopicModel.getTopics(permission);

			let mapTopic = [];
			if (permission === 1) {
				const params = { id_topic: -1, per: -1 };
				const questionSet = await QuestionSetModel.getAllQuestionSet(params);
				let countQS = countBy(questionSet.data, (item) => item.id_topic);
				mapTopic = map(topics.data, (item) => {
					let image = null;
					let countDeThi = 0;
					if (item.image) {
						image = configPath(item.image);
					}
					if (countQS[`${item.id}`] !== undefined) {
						countDeThi = countQS[`${item.id}`];
					}
					return {
						...item,
						image,
						countDeThi,
					};
				});
			} else {
				mapTopic = map(topics.data, (item) => {
					let image = null;
					if (item.image) {
						image = configPath(item.image);
					}
					return {
						...item,
						image,
					};
				});
			}

			return res.send(resServe.success("Success", mapTopic));
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
			if (
				this._isUndefined(name) ||
				this._isUndefined(image) ||
				this._isUndefined(description)
			) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'name' or 'image' or 'description'."
					)
				);
			}
			const payload = { name, image, description };
			const topics = await TopicModel.createTopic(payload);
			const mapTopic = map(topics.data, (item) => {
				let image = null;
				if (item.image) {
					image = configPath(item.image);
				}
				return {
					...item,
					image,
				};
			});

			return res.send(resServe.success("Success", mapTopic));
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
			const topics = await TopicModel.deleteTopic(payload);

			if (_.get(topics, "data") === false) {
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

	updateTopic = async (req, res) => {
		try {
			const { id, name, image, description, status } = req.body;
			if (
				this._isUndefined(id) ||
				this._isUndefined(name) ||
				this._isUndefined(image) ||
				this._isUndefined(description) ||
				this._isUndefined(status)
			) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'id' or 'name' or 'image' or 'description' or 'status'."
					)
				);
			}

			const payload = { id, name, image, description, status };
			const topicUpdate = await TopicModel.updateTopic(payload);
			const mapTopic = map(topicUpdate.data, (item) => {
				let image = null;
				if (item.image) {
					image = configPath(item.image);
				}
				return {
					...item,
					image,
				};
			});

			return res.send(resServe.success("Update Success", mapTopic));
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
