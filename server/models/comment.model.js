const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content for comment is required."],
    minLength: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
}, {timestamps: true})

// module.exports = new mongoose.model('Comment', CommentSchema)
module.exports = CommentSchema;