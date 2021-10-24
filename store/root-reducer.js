import { combineReducers } from 'redux';
// import { postsSlice } from './post/post.reducer';
import postReducer from './post/post.reducer';
// console.log(postReducer)
// const { reducer: posts } = postsSlice;
// const { reducer: post } = postsSlice;
const { postSlice, postsSlice } = postReducer

console.log(postSlice)

export default combineReducers({
  postSlice,
  postsSlice
});