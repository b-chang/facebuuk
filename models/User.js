const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [ true, "First Name is a required."]
    },
    lastName: {
      type: String,
      required: [ true, "Last Name is a required."]
    },
    image: String,
    username: {
      type: String,
      unique: true,
      required: [ true, "Username is required." ],
      minLength: 5
    },
    password: {
      type: String,
      required: [ true, "Password is required." ],
      minLength: [ 8, "Password must be at least 8 characters long."]
    },
    posts: [
      // { type: mongoose.Schema.Types.ObjectId, ref: '' }
    ]
}, {timestamps: true});

UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.pre('save', function (next) {
  let user = this;
  console.log(user.createdAt.toString())
  this.createdAt = user.createdAt.toString()
  this.updatedAt = user.updatedAt.toString()
})

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    posts: [],
    createdAt: this.createdAt.toString(),
    updatedAt: this.updatedAt.toString()
  };
};

export default mongoose.models.User || mongoose.model('User', UserSchema);