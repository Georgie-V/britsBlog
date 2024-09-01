const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Make post id a property to tie comments to post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
})

module.exports = mongoose.model('Comment', CommentSchema)