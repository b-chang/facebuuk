const jwt = require('jsonwebtoken');
const secret = 'My super super secret so secret';
const SECRET_KEY = 'mysupersecretkey123'
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json( {verified: false} );
    } else {
      next();
    }
  });
}