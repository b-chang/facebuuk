const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content for comment cannot be empty."],
    minLength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }
  ]
}, {timestamps: true})

CommentSchema.plugin(require('mongoose-autopopulate'));
module.exports = new mongoose.model('Comment', CommentSchema)