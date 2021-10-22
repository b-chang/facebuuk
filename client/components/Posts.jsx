import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/post/post.reducer';
import Post from './Post';

const Posts = () => {
  const { allPosts, singlePost } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [displayPosts, setDisplayPosts] = useState(3);
  const [newlyAddedPosts, setNewlyAddedPosts] = useState([]);
  const displayMorePosts = (n = 5) => {
    setDisplayPosts((prev) => prev + 5);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (singlePost.loading === 'loaded') {
      setNewlyAddedPosts((prev) => [...prev, singlePost]);
    }
  }, [singlePost.loading]);

  return (
    <div>
      <div className="flex flex-col-reverse">
        {newlyAddedPosts.length
          ? newlyAddedPosts.map((newPost, idx) => (
              <Post key={idx} post={newPost.post} />
            ))
          : ''}
      </div>
      {(allPosts.loading === 'loaded' || allPosts.data.length !== 0) && (
        <InfiniteScroll
          className="px-2"
          dataLength={displayPosts}
          next={() => displayMorePosts()}
          hasMore={true}
        >
          <div>
            {allPosts.loading === 'loaded' &&
              allPosts.data.map((post, idx) => {
                if (idx < displayPosts) {
                  return <Post key={idx} post={post} />;
                }
              })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;
