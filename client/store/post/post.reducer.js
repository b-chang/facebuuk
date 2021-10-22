import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:8000/api/posts'

export const fetchUser = createAsyncThunk(
  'posts/fetchUser', async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${id}`);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async (_, thunkAPI) => {
    try {
      const response = await axios.get(url);
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
      // console.warn(response)
      return response.data;
    } catch (error) {
      const { data: { message } } = error.response
      return thunkAPI.rejectWithValue({ error: message });
    }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: {}, loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // get all posts
    builder.addCase(fetchUser.pending, (state) => {
      state.data = {};
      state.loading = "loading";
    });
    builder.addCase(
      fetchUser.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = "loaded";
    });
    builder.addCase(
      fetchUser.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { data: [], loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // get all posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.data = [];
      state.loading = "loading";
    });
    builder.addCase(
      fetchPosts.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = "loaded";
    });
    builder.addCase(
      fetchPosts.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
  }
});

export const fetchComments = createAsyncThunk(
  'posts/fetchComments', async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${id}/comment`
      );
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const addComment = createAsyncThunk(
  'posts/addComment', async (comment, thunkAPI) => {
    console.log('adding a comment', comment)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${comment.postId}/comment`,
        {
          author: comment.author,
          content: comment.content
        }
      );
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const postSlice = createSlice({
  name: 'post',
  initialState: { post: {}, loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // add a post
    builder.addCase(addPost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      addPost.fulfilled, (state, { payload }) => {
        state.post = payload.newPost
        state.loading = "loaded";
    });
    builder.addCase(
      addPost.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.payload.error;
    });
    // get all comments on a post
    builder.addCase(fetchComments.pending, (state) => {
      state.post = {};
      state.loading = "loading";
    });
    builder.addCase(
      fetchComments.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.loading = "loaded";
    });
    builder.addCase(
      fetchComments.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
    // adding a comment
    // @WIP need to fix addCase for adding comment. it breaks build
    builder.addCase(addComment.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      addComment.fulfilled, (state, { payload }) => {
        state.post = payload
        state.loading = "loaded";
    });
    builder.addCase(
      addComment.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
  }
});

export const selectPosts = createSelector(
  (state) => ({
    data: state.posts,
    loading: state.loading,
  }), (state) =>  state
);

export default { postsSlice, postSlice, userSlice, selectPosts };