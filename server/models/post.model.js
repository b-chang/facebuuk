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
  comments: [
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
    CommentSchema    
  ]
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema)