import { combineReducers } from 'redux';
import { postsReducer, postsSlice } from './post/post.reducer';

console.log('checking slice', postsSlice);
const { reducer: posts } = postsSlice;
// console.log('checking post from root reducer', postsReducer)
export default combineReducers({
  posts,
  postsReducer
});