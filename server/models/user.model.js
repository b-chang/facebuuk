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
    email: {
      type: String,
      unique: true,
      required: [ true, "Email is required." ],
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

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword)
  .set( value => this._confirmPassword = value);
  
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

module.exports = mongoose.model('User', UserSchema);