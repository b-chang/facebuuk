const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const jwt_decode = require('jwt-decode');

module.exports = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('comments').populate('author').sort([['createdAt', 'descending']]);
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
      const post = await Post.findOne({_id: newPost._id}).populate('author')
      return res.json({ message: "Successfully added new post", newPost: post });
    } catch(e) {
      return res.status(400).json(e);
    }
  },

  addCommentToPost: async (req, res) => {
    const { author: id } = req.body
    const postId = req.params.id
    try {
      const comment = await Comment.create(req.body)
      const commentor = await User.findOne({_id: id});
      const post = await Post.findOne({_id: postId})

      commentor.comments.push(comment._id)
      commentor.save()
      post.comments.push(comment._id);
      post.save();
      return res.json({ message: "Successfully added a comment to blog post", post });
    } catch(e) {
      return res.status(400).json(e);
    }
  },
  
  likePost: async (req, res) => {
    try {
      const { _id } = req.body
      const post = await Post.findOne({ _id: req.params.id })
      if (req.body.removeLike) {
        post.likes.pull({ _id: req.body._id })
        post.save()
        return res.json({ message: 'Successfully un-liked' })
      }
      
      const convertIDtoStrings = post.likes.map(id => id.toString())
      const isLiked = convertIDtoStrings.includes(_id)

      if (isLiked) {
        return res.json({ message: 'You have already liked this post!' })
      }

      post.likes.push(_id)
      await post.save();
      return res.json({ message: "Successfully liked a post", post });
    } catch (e) {
      return res.status(400).json(e)
    }
  }
}