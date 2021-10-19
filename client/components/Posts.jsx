import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/post/post.reducer';
import Post from './Post';

const Posts = () => {
  const { allPosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {allPosts.loading === 'loaded' &&
        allPosts.posts.map((post, idx) => <Post key={idx} post={post} />)}
    </div>
  );
};

export default Posts;
