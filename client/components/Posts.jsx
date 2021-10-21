import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/post/post.reducer';
import Post from './Post';

const Posts = () => {
  const { allPosts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [displayPosts, setDisplayPosts] = useState(3);

  const displayMorePosts = (n = 5) => {
    setDisplayPosts((prev) => prev + 5);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {(allPosts.loading === 'loaded' || allPosts.data.length !== 0) && (
        <InfiniteScroll
          className="px-2"
          dataLength={displayPosts}
          next={() => displayMorePosts()}
          hasMore={true}
        >
          {allPosts.loading === 'loaded' &&
            allPosts.data.map((post, idx) => {
              if (idx < displayPosts) {
                return <Post key={idx} post={post} />;
              }
            })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;

// <div>
//   {allPosts.loading === 'loaded' &&
//     allPosts.data.map((post, idx) => <Post key={idx} post={post} />)}
// </div>
