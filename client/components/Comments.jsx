import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/post/post.reducer';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Comments = (props) => {
  const { user, id } = props;
  const state = useSelector((state) => state);
  const { singlePost } = useSelector((state) => state);
  const [initialComments, setInitialComments] = useState(5);
  const dispatch = useDispatch();
  const { loading, post } = singlePost;

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [initialComments]);

  const displayMoreComments = () => {
    setInitialComments((prev) => prev + 3);
  };

  return (
    <div>
      <CommentInput user={user} id={id} />
      {loading === 'loaded' &&
        post.comments.map((comment, idx) => {
          if (idx < initialComments) {
            return (
              <Comment
                key={idx}
                comment={comment}
                index={idx}
                initialComments={initialComments}
                size={post.comments.length}
              />
            );
          }
        })}
      {loading === 'loaded' && initialComments < post.comments.length ? (
        <p
          onClick={() => displayMoreComments()}
          className="hover:underline cursor-pointer p-3"
        >
          View more comments
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Comments;
