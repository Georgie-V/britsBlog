const Post = require("../models/Post");
const moment = require('moment');

exports.getAdd = async (req, res) => {
      res.render("add", {
        title: 'admin add'
    });
  };

// @desc    Process add form
// @route   POST /add
exports.postAdd = async (req, res) => {
    try {
        await Post.create(req.body)
        res.redirect('/')
    } catch (err) {
        console.error(err)
    }
  };

// @desc Show a single post
// @route GET /:id  
exports.getPost = async (req, res) => {
  try {
    // Recent Posts for sidebar
    const recentPosts = res.locals.recentPosts;

    const post = await Post.findById(req.params.id);
    res.render("post.ejs", { 
      post: post, 
      title: post.title,
      moment: moment,
      recentPosts: recentPosts,   
    });
  } catch (err) {
    console.log(err);
  }
}

// @desc Get feed
// @route GET /
exports.getFeed = async (req, res) => {
  try {
    // Recent Posts for sidebar
    const recentPosts = res.locals.recentPosts;

    //Pagination setup
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 2;
    const skip = (page - 1) * perPage; 

    //Find a way to be able to get the count but also skip and limit the posts per page
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .lean()
      .skip(skip)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments();

    res.render("index.ejs", { 
      title: 'index', 
      posts: posts,
      recentPosts: recentPosts,
      page: page,
      pages: Math.ceil(count / perPage),
      perPage: perPage,
      moment: moment,
    });
  } catch (err) {
    console.log(err);
  }
}