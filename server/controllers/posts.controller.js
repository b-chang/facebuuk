const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt_decode = require('jwt-decode');

module.exports = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('author').sort([['createdAt', 'descending']]);
      res.json(posts);
    } catch(e) {
      res.status(400).json(e);
    }
  },

  getUserPosts: async (req, res) => {
    const { cookies: { usertoken } } = req;
    const { id: userId } = jwt_decode(usertoken)

    try {
      const userPosts = await Post.find({user: userId}).sort([['updatedAt', 'descending']]);
      res.json(userPosts);
    } catch(e) {
      res.status(400).json(e);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findOne({_id: req.params.id});
      res.json({ post });
    } catch(e) {
      res.status(400).json(e);
    }
  },

  addPost: async (req, res) => {
    try {
      const { id, content, image } = req.body;
      const newPost = await Post.create({ content, author: id.toString(), image });
      const user = await User.findOne({ _id: id});
      user.posts.push(newPost._id);
      user.save();
      res.json({ message: "Successfully added new post", newPost });
    } catch(e) {
      res.status(400).json(e);
    }
  },

  addCommentToPost: async (req, res) => {
    try {
      //placeholder id to seed data
      const commentor = await User.findOne({_id: "614d6244af0a4e9693e88b06"});
      const { content } = req.body;
      const comment = {
        content,
        user: commentor
      }
      const post = await Post.findOne({_id: req.params.id})

      post.comments.push(comment);
      post.save();
      res.json({ message: "Successfully added a comment to blog post", post });
    } catch(e) {
      res.status(400).json(e);
    }
  }
}