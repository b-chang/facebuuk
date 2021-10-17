const PostsControllers = require('../controllers/posts.controller');
// const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.get('/api/posts', PostsControllers.getPosts)
  app.get('/api/posts/my-posts', PostsControllers.getUserPosts)
  app.get('/api/posts/:id', PostsControllers.getPost)
  app.post('/api/posts', PostsControllers.addPost)
  app.post('/api/posts/:id/comment', PostsControllers.addCommentToPost)  
}