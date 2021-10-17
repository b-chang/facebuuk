const PostsControllers = require('../controllers/posts.controller');
// const { authenticate } = require('../config/jwt.config');
// @WIP investigate how to use multer to truncate the data:image base64 string for when uploading images to DB
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

module.exports = (app) => {
  app.get('/api/posts', PostsControllers.getPosts)
  app.get('/api/posts/my-posts', PostsControllers.getUserPosts)
  app.get('/api/posts/:id', PostsControllers.getPost)
  app.post('/api/posts', PostsControllers.addPost)
  app.post('/api/posts/:id/comment', PostsControllers.addCommentToPost)  
}