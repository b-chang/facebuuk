import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const fetchUser = createAsyncThunk(
  'posts/fetchUser', async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${id}`);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const addPost = createAsyncThunk(
  'posts/addPost', async (post, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts`, post)
      return response.data;
    } catch (error) {
      const { data: { message } } = error.response
      return thunkAPI.rejectWithValue({ error: message });
    }
});

export const deletePost = createAsyncThunk(
  'posts/deletePost', async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/posts/${id}`)
      // return response.data;
      return id
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
      state.loading = "loading";
      state.data = {};
    });
    builder.addCase(
      fetchUser.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.data = payload;
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
      state.loading = "loading";
      state.data = [];
    }); 
    builder.addCase(
      fetchPosts.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.data = payload;
    });
    builder.addCase(
      fetchPosts.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
    // delete a post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      deletePost.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.data.filter(post => post._id !== payload)
    });
    builder.addCase(
      deletePost.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.payload.error;
    });
  }
});

export const fetchComments = createAsyncThunk(
  'posts/fetchComments', async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/posts/${id}/comment`
      );
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const addComment = createAsyncThunk(
  'posts/addComment', async (comment, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/${comment.id}/comment`,
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

export const fetchPost = createAsyncThunk(
  'posts/fetchPost', async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
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
        state.loading = "loaded";
        state.post = payload.newPost
    });
    builder.addCase(
      addPost.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.payload.error;
    });
    // fetch a post
    builder.addCase(fetchPost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchPost.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.post = payload.post
    });
    builder.addCase(
      fetchPost.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.payload.error;
    });
  }
});

export const replyToComment = createAsyncThunk(
  'comment/replyToComment', async (comment, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/post/comment/reply/${comment.id}`, comment);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: { comment: {}, loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // adding a comment
    builder.addCase(replyToComment.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      replyToComment.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.comment = payload
    });
    builder.addCase(
      replyToComment.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], loading: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    // get all comments on a post
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = "loading";
      state.comments = {};
    });
    builder.addCase(
      fetchComments.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.comments = payload.comments;
    });
    builder.addCase(
      fetchComments.rejected,(state, action) => {
        state.loading = "error";
        state.error = action.error.message;
    });
    // adding a comment
    builder.addCase(addComment.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      addComment.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.comments.unshift(payload)
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

export default { postsSlice, postSlice, userSlice, commentSlice, commentsSlice, selectPosts };