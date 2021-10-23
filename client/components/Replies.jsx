import React from 'react';
import Comment from './Comment';

const Replies = (props) => {
  const { comment, isLast } = props;
  console.log(isLast);
  return (
    <div className="relative flex">
      <div className="border-l-2 border-b-2 rounded-sm h-10 w-4 ml-2"></div>
      {!isLast ? (
        <div className="absolute border h-20 bottom-0 left-2 top-10"></div>
      ) : (
        ''
      )}
      <Comment comment={comment} />
    </div>
  );
};

export default Replies;
