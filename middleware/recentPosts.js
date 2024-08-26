const Post = require("../models/Post");

module.exports = {
    // This gets the recent posts to be put in the sidebar
    getRecentPosts: async function (req, res, next) {
         res.locals.recentPosts = await Post.find()
        .limit(5)
        .sort({ createdAt: "desc" })
        .lean()
        
        return next();
    },
};