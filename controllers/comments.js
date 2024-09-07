const Post = require("../models/Post");
const Comments = require("../models/Comments");
const moment = require('moment');
const express = require('express');
const app = express();

// @desc    Process comment form
// @route   POST /:id/comment
exports.postComment = async (req, res) => {
    try {
        await Comments.create({
            name: req.body.name,
            comment: req.body.comment,
            post: req.params.id,
        });
        // reCaptcha v3
        const secret_key = '';
        const token = req.body['g-recaptcha-response'];
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
          
        await fetch(url, {
            method: 'post'
        })
            .then(res => res.json())
            .then(google_response => res.json({ google_response }))
            .catch(error => response.json({ error }));

        
        // await Comments.create({
        //     name: req.body.name,
        //     comment: req.body.comment,
        //     post: req.params.id,
        // });
        
        //Using '/post/:id' tried to force cast :id to the Post model which gave an Cast to ObjectID error
        res.redirect(`/post/${req.params.id}`)
    } catch (err) {
        console.error(err)
    }
  };