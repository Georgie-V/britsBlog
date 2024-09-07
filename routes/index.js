const express = require('express')
const router = express.Router()
const postsController = require("../controllers/post");
const commentsController = require('../controllers/comments')
const { getRecentPosts } = require('../middleware/recentPosts');
const { handleSend } = require('../middleware/recentPosts');

// @desc Main page
// @route GET /
router.get('/', getRecentPosts, postsController.getFeed);

// @desc GET blog post
// @route GET /:id
router.get("/post/:id", getRecentPosts, postsController.getPost);


router.post("/post/:id/comment/add", commentsController.postComment);

module.exports = router;