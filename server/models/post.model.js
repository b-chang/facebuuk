const mongoose = require('mongoose');
const CommentSchema = require('./comment.model');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [ true, "Content for blog post is required." ],
    minLength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  image: {
    type: String
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema)