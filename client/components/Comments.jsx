import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/post/post.reducer';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Comments = (props) => {
  const { user, id } = props;
  const { singlePost } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loading, post } = singlePost;

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  console.log(post.data);

  return (
    <div>
      <CommentInput user={user} id={id} />
      {loading === 'loaded' &&
        post.data.comments.map((comment, idx) => (
          <Comment
            key={idx}
            comment={comment}
            index={idx}
            size={post.data.comments.length}
          />
        ))}
    </div>
  );
};

export default Comments;
