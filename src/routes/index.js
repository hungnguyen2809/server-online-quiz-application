const express = require("express");
const routes = express.Router();

const AuthRoutes = require("./AuthRoutes");
const DashbroadRoutes = require("./DashbroadRoutes");
const UserRoutes = require("./UserRoutes");
const TopicsRoutes = require("./TopicsRoutes");
const QuestionRoutes = require("./QuestionRoutes");
const QuestionSetRoutes = require("./QuestionSetRoutes");
const UserQuestionRoutes = require("./UserQuestionRoutes");
const PostRoutes = require("./PostRoutes");
const PostCommentRoutes = require("./PostCommentRoutes");
const OtherRoutes = require("./OtherRoutes");

/**
 * Auth
 */
routes.use(AuthRoutes);
/**
 * DashBroad
 */
routes.use(DashbroadRoutes);
/**
 * User
 */
routes.use(UserRoutes);
/**
 * Topics
 */
routes.use(TopicsRoutes);
/**
 * Questions
 */
routes.use(QuestionRoutes);
/**
 * QuestionsSet
 */
routes.use(QuestionSetRoutes);
/**
 * UserQuestion
 */
routes.use(UserQuestionRoutes);
/**
 * Post
 */
routes.use(PostRoutes);
/**
 * PostComment
 */
routes.use(PostCommentRoutes);
/**
 * Other
 */
routes.use(OtherRoutes);

module.exports = routes;
