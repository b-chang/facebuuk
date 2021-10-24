import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUser = createAsyncThunk(
  'posts/fetchUser', async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${id}`);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
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

export default { userSlice };