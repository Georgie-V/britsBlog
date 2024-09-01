const Post = require("../models/Post");
const Comments = require("../models/Comments");
const moment = require('moment');

// @desc    Process comment form
// @route   POST /:id/comment
exports.postComment = async (req, res) => {
    try {
        await Comments.create({
            name: req.body.name,
            comment: req.body.comment,
            post: req.params.id,
        });
        //Using '/post/:id' tried to force cast :id to the Post model which gave an Casst to ObjectID error
        res.redirect(`/post/${req.params.id}`)
    } catch (err) {
        console.error(err)
    }
  };