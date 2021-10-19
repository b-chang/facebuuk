const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = require('../config/jwt.config');
// require('dotenv').config();
const SECRET_KEY = 'mysupersecretkey123';

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.json({ users });
    } catch(e) {
      return res.status(400).json(e);
    }
  },

  updateUser: async (req, res) => {
    try {
      const users = await User.findOneAndUpdate({ _id: req.params.id}, req.body);
      return res.json({ users });
    } catch(e) {
      return res.status(400).json(e);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, image } = req.body;
      let defaultImage; 

      if (image === undefined) {
        defaultImage = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0062cc&color=FFFFFF&rounded=true`
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and Confirm Password must match.'});
      }

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        image: image || defaultImage,
        password,
        confirmPassword
      });
      const userToken = jwt.sign({
        id: newUser._id
      }, SECRET_KEY);

      return res.cookie("usertoken", userToken, secret, {
          httpOnly: true
        })
        .json({ message: "Successfully created a new user", newUser });
    } catch(e) {
      let { message } = e; 
      message = message.split(': ')[2];
      return res.status(400).json(message);
    }
  },

  login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
      return res.status(400).send({ message: "user does not exist."});
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    
    if(!isPasswordCorrect) {
      return res.status(403).send({ message: "Password or email is incorrect."});
    }
    
    const name = `${user.firstName} ${user.lastName}`

    const userToken = jwt.sign({
      id: user._id
    }, SECRET_KEY, { noTimestamp:true, expiresIn: '1h' });

    return res
      .cookie("usertoken", userToken, secret, {
        httpOnly: true
      })
      .json({ message: "Successful login!", accessToken: userToken, user: {name, image: user.image} });
  },

  logout: async (req, res) => {
    res.clearCookie('usertoken');
    return res.status(200).json({ message: "Successfully logged out!", redirect: '/login' });
  }
}