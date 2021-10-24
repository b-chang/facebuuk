import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${comment.id}/comment`,
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

export const likeComment = createAsyncThunk(
  'comment/likeComment', async (payload, thunkAPI) => {
    const { commentId, userId, removeLike } = payload
    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/comment/${commentId}/like-comment`,
        { userId, removeLike }
      );
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const replyToComment = createAsyncThunk(
  'comment/replyToComment', async (comment, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/post/comment/reply/${comment.id}`, comment);
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
    // like a comment
    builder.addCase(likeComment.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      likeComment.fulfilled, (state, { payload }) => {
        state.loading = "loaded";
        state.comment = payload
    });
    builder.addCase(
      likeComment.rejected,(state, action) => {
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

export default { commentSlice, commentsSlice }; 