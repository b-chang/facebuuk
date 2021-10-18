import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../store/post/post.reducer';
import Post from './Post';

const Posts = () => {
  const { posts, loading } = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {loading === 'loaded' &&
        posts.map((post, idx) => <Post key={idx} post={post} />)}
    </div>
  );
};

export default Posts;
