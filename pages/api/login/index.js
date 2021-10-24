import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'mysupersecretkey123';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {

        const user = await User.findOne({ username: req.body.username });
        if(user === null) {
          return res.status(400).send({ message: "user does not exist."});
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if(!isPasswordCorrect) {
          return res.status(403).send({ message: "Password or Username is incorrect."});
        }

        const userToken = jwt.sign({
          id: user._id
        }, SECRET_KEY, { noTimestamp:true, expiresIn: '1h' });

        return res
          .cookie("usertoken", userToken, secret, {
            httpOnly: true
          })
          .json({ message: "Successful login!"});


        // const user = await User.create(
        //   req.body
        // ) /* create a new model in the database */
        // res.status(201).json({ success: true, data: user })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
