import React from 'react';
import Comment from './Comment';

const Replies = (props) => {
  const { comment } = props;

  return (
    <div className="subcomments">
      <Comment comment={comment} />
    </div>
  );
};

export default Replies;
