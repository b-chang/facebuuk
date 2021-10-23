const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [ true, "Content for blog post is required." ],
    minLength: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true
  },
  image: {
    type: String
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }
  ]
}, {timestamps: true});

PostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Post', PostSchema)