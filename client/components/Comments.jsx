import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { fetchComments } from '../store/post/post.reducer';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Comments = (props) => {
  const { user, id } = props;
  const { commentsOnPost } = useSelector((state) => state);
  const [displayComments, setDisplayComments] = useState(2);
  const dispatch = useDispatch();
  const { loading, comments } = commentsOnPost;
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
  });

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [displayComments]);

  const displayMoreComments = () => {
    setDisplayComments((prev) => prev + 3);
  };

  return (
    <>
      <CommentInput user={user} id={id} />
      <animated.div style={fade}>
        {loading === 'loaded' &&
          comments.map((comment, idx) => {
            if (idx < displayComments) {
              return (
                <Comment
                  key={idx}
                  comment={comment}
                  index={idx}
                  displayComments={displayComments}
                  size={commentsOnPost.comments.length}
                />
              );
            }
          })}
        {loading === 'loaded' && displayComments < comments.length ? (
          <p
            onClick={() => displayMoreComments()}
            className="hover:underline cursor-pointer p-3"
          >
            View more comments
          </p>
        ) : (
          ''
        )}
      </animated.div>
    </>
  );
};

export default Comments;
