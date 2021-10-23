const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const jwt_decode = require('jwt-decode');

module.exports = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort([['createdAt', 'descending']]);
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

      if(!content) {
        return res.status(400).json({ message: "New post cannot be empty." });
      }
      const newPost = await Post.create({ content, author: id.toString(), image });


      await User.findByIdAndUpdate(
        {_id: id},
        {$push: {"posts": newPost._id}},
        {safe: true, upsert: true, new: true}
      );

      const post = await Post.findOne({_id: newPost._id})
      return res.json({ message: "Successfully added new post", newPost: post });
    } catch(e) {
      return res.status(400).json(e);
    }
  },

  getCommentOnPost: async (req, res) => {
    const postId = req.params.id
    try {
      const data = await Post.findOne({ _id: postId })
      return res.json(data)
    } catch(e) {
      return res.status(400).json(e);
    }
  },

  addCommentToPost: async (req, res) => {
    const { author: id } = req.body
    const postId = req.params.id
    try {
      const newComment = await Comment.create(req.body)
      await User.findByIdAndUpdate(
        {_id: id},
        {$push: {"comments": newComment._id}},
        {safe: true, upsert: true, new: true}
      );
      await Post.findByIdAndUpdate(
        {_id: postId},
        {$push: {"comments": newComment._id}},
        {safe: true, upsert: true, new: true}
      )
      const comment = await Comment.findOne({ _id: newComment._id.toString() })

      return res.json(comment);
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
        return res.json(post)
      }

      const convertIDtoStrings = post.likes.map(id => id.toString())
      const isLiked = convertIDtoStrings.includes(_id)

      if (isLiked) {
        return res.json({ message: 'You have already liked this post!' })
      }

      post.likes.push(_id)
      await post.save();
      return res.json(post);
    } catch (e) {
      return res.status(400).json(e)
    }
  },

  likeComment: async (req, res) => {
    try {
      const { userId } = req.body
      const comment = await Comment.findOne({ _id: req.params.id })

      if (req.body.removeLike) {
        comment.likes.pull({ _id: userId })
        comment.save()
        return res.json(comment)
      }

      const convertIDtoStrings = comment.likes.map(id => id.toString())
      const isLiked = convertIDtoStrings.includes(userId)
      
      if (isLiked) {
        return res.json({ message: 'You have already liked this post!' })
      }

      comment.likes.push(userId)
      await comment.save();
      return res.json(comment);
    } catch (e) {
      return res.status(400).json(e)
    }
  },

  replyToComment: async (req, res) => {
    const { author, content } = req.body
    try {
      const reply = await Comment.create(req.body)

      await User.findByIdAndUpdate(
        {_id: author},
        {$push: {"comments": reply._id}},
        {safe: true, upsert: true, new: true}
      );

      await Comment.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {"comments": reply._id}},
        {safe: true, upsert: true, new: true}
      );
      
      const commentId = reply._id.toString()
      const newReply = await Comment.findOne({ _id: commentId })
      return res.json(newReply);
    } catch(e) {
      return res.status(400).json(e);
    }
  }
}