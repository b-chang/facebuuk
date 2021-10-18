import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:8000/api/posts'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async (_, thunkAPI) => {
    try {
      const response = await axios.get(url);//where you want to fetch data
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const addPost = createAsyncThunk(
  'posts/addPost', async (post, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts`, post)
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // getting all posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.loading = "loading";
    });
    builder.addCase(
      fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = "loaded";
    });
    builder.addCase(
      fetchPosts.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
    // adding a post
    builder.addCase(addPost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      addPost.fulfilled, (state, { payload }) => {
        console.warn(payload)
        state.posts.unshift(payload.newPost)
        state.loading = "loaded";
    });
    builder.addCase(
      addPost.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
  }
});

export const selectPosts = createSelector(
  (state) => ({
    posts: state.posts,
    loading: state.loading,
  }), (state) =>  state
);
export default postsSlice;


// const fetchPosts = () => async dispatch => {
//   const response = await axios.get(url);
//   dispatch(getPosts())
// }

// export const { getPosts, addPost } = postsSlice.actions

// export default postsSlice.reducer

// const postsReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case 'FETCH_POSTS':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export {
//   postsSlice,
//   // postsReducer
// };

    // getPosts(state, action) {
    //   return [...state, ...action.payload]
    // },
    // addPost(state, action) {
    //   return [...state, action.payload]
    // }
