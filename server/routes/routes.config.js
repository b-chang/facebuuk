module.exports = (app) => {
  require('./posts.routes')(app)
  require('./user.routes')(app)
}