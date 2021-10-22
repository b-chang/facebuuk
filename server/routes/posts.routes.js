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
  app.get('/api/posts/:id/comment', PostsControllers.getCommentOnPost)  
  app.post('/api/posts/:id/comment', PostsControllers.addCommentToPost)
  app.put('/api/posts/:id/like-post', PostsControllers.likePost)  
  app.put('/api/post/comment/:id/like-comment', PostsControllers.likeComment)
  app.put('/api/post/comment/reply/:id', PostsControllers.replyToComment)
}