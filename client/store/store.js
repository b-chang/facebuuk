import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './post/post.reducer';

const { postsSlice, postSlice, commentsSlice, userSlice } = postReducer

// workaround because nextjs is Server Side Rendering (SSR) and does not know about the window
let composeReduxDevTools = compose;

if (typeof window !== 'undefined') {
  composeReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
}

const enhancers = [applyMiddleware(thunk), composeReduxDevTools];
// const store = createStore(rootReducer, undefined, compose(...enhancers));
const store = configureStore({
  reducer: {
    singlePost: postSlice.reducer,
    allPosts: postsSlice.reducer,
    user: userSlice.reducer,
    commentsOnPost: commentsSlice.reducer
  }
})

export default store;

