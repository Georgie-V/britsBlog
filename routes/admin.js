const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const postController = require("../controllers/post");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { getRecentPosts } = require('../middleware/recentPosts');


// @desc Admin page
// @route GET /admin
router.get('/', getRecentPosts, (req, res) => {
    res.render('admin', {
        title: 'admin',
        getRecentPosts: getRecentPosts,
    })
})

router.get("/add", postController.getAdd);
router.post("/add", postController.postAdd);
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
module.exports = router;