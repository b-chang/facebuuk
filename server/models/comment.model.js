const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content for comment cannot be empty."],
    minLength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  ]
}, {timestamps: true})

module.exports = new mongoose.model('Comment', CommentSchema)