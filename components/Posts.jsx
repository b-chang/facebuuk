import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/reducer/post-reducer';
import Post from './Post';

const Posts = () => {
  const { allPosts, singlePost } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [displayPosts, setDisplayPosts] = useState(3);
  const [newlyAddedPosts, setNewlyAddedPosts] = useState([]);
  const [postDeleted, setPostDeleted] = useState({ deleted: false, id: null });
  const displayMorePosts = (n = 5) => {
    setDisplayPosts((prev) => prev + 5);
  };

  useEffect(() => {
    dispatch(fetchPosts());

    if (postDeleted.deleted) {
      filterPosts(postDeleted.id);
      setPostDeleted((prev) => ({ ...prev, deleted: false, id: null }));
    }
  }, [postDeleted.deleted]);

  useEffect(() => {
    if (singlePost.loading === 'loaded') {
      setNewlyAddedPosts((prev) => [...prev, singlePost]);
    }
  }, [singlePost.loading]);

  const filterPosts = (id) => {
    setNewlyAddedPosts((prev) => prev.filter((state) => state.post._id !== id));
  };

  return (
    <div>
      <div className="flex flex-col-reverse">
        {newlyAddedPosts.length
          ? newlyAddedPosts.map((newPost, idx) => (
              <Post
                setPostDeleted={setPostDeleted}
                key={idx}
                post={newPost.post}
              />
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
                  return (
                    <Post
                      setPostDeleted={setPostDeleted}
                      key={idx}
                      post={post}
                    />
                  );
                }
              })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;
