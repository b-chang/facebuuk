import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { fetchPosts } from '../store/post/post.reducer';
import Post from './Post';

const Posts = () => {
  const { allPosts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <animated.div style={fade}>
      {allPosts.loading === 'loaded' &&
        allPosts.data.map((post, idx) => <Post key={idx} post={post} />)}
    </animated.div>
  );
};

export default Posts;
