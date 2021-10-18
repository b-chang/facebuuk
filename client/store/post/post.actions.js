import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8000/api/posts'

const getPosts = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (_, thunkAPI) => {
    const response = await axios.get(url);
    console.log('thunkAPI', response);
    return response.data;
  }
);

export {
  getPosts
};
