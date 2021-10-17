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
  comments: [
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
    CommentSchema    
  ]
}, {timestamps: true});

PostSchema.pre('find', function(next) {
  this.populate('user');
  next();
});

PostSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

PostSchema.virtual('fullName').get(function() {
  return `${this.user.firstName} ${this.user.lastName}`.trim();
});

PostSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.userName,
    content: this.content,
    title: this.title,
    comments: this.comments
  };
};

module.exports = mongoose.model('Post', PostSchema)