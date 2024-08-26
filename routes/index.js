const express = require('express')
const router = express.Router()
// const homeController = require("../controllers/home");
const postsController = require("../controllers/post");
const { getRecentPosts } = require('../middleware/recentPosts');

// @desc Main page
// @route GET /
router.get('/', getRecentPosts, postsController.getFeed);

// @desc GET blog post
// @route GET /:id
router.get("/:id", getRecentPosts, postsController.getPost);

module.exports = router;