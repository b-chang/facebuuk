const UserController = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/api/signup', UserController.registerUser)
  app.post('/api/login', UserController.login)
  app.post('/api/logout', UserController.logout)
  app.put('/api/user/:id', UserController.updateUser)
}
