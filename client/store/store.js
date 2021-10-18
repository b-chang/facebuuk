import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './root-reducer';
import postsSlice from './post/post.reducer';

// workaround because nextjs is Server Side Rendering (SSR) and does not know about the window
let composeReduxDevTools = compose;

if (typeof window !== 'undefined') {
  composeReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
}

const enhancers = [applyMiddleware(thunk), composeReduxDevTools];
// const store = createStore(rootReducer, undefined, compose(...enhancers));
const store = configureStore({
  reducer: postsSlice.reducer
})

export default store;

