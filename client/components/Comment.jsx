import { ThumbUpIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentInput from './CommentInput';
import Replies from './Replies';

const Comment = (props) => {
  const { comment, index, size, displayComments } = props;
  const { content, author, createdAt, _id } = comment;
  const [hasLiked, setHasLiked] = useState(false);
  const [showCommentReplyBox, setShowCommentReplyBox] = useState(false);
  const { user, comment: newComment } = useSelector((state) => state);
  const [showReplies, setShowReplies] = useState(comment.comments);
  const [commentAdded, setCommentAdded] = useState(false);
  const date = new Date(createdAt).toLocaleString();
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes.length);
  const colorLikeButton = () => {
    if (comment.likes.includes(user.data._id)) {
      setHasLiked(true);
    }
  };

  const likeComment = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/comment/${id}/like-comment`,
        { userId: user.data._id, removeLike: hasLiked }
      );
      const { likes } = response.data;
      setHasLiked((prev) => !prev);
      setNumberOfLikes(likes.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    colorLikeButton();
  }, []);

  useEffect(() => {
    if (newComment.loading === 'loaded') {
      setShowReplies((prev) => [...prev, newComment.comment]);
    }
  }, []);

  return (
    <div
      className={`flex flex-col space-x-1 bg-white text-gray-400 p-4 ${
        index === size - 1 || index >= displayComments
          ? 'rounded-b-2xl shadow-md'
          : ''
      }`}
    >
      <div className="flex items-start space-x-1">
        <Image
          src={author.image}
          className="rounded-full"
          width={30}
          height={30}
          layout="fixed"
        />
        <div className="flex flex-col flex-grow">
          <div className="relative">
            <div
              className="relative rounded-lg bg-gray-100 flex-grow px-3 focus:outline-none max-h-52 max-w-xl overflow-y-auto
          scrollbar-hide"
            >
              <p className="font-bold">
                {author.firstName} {author.lastName}
              </p>
              <div className="">
                <p className="">{content}</p>
                {/* {numberOfLikes > 0 && (
                <div className="absolute right-1 inset-y-0 top-4 flex items-center justify-center rounded-lg h-6 w-10 bg-gray-200 text-blue-500">
                  <ThumbUpIcon className="h-4 text-blue-500" />
                  {numberOfLikes}
                </div>
              )} */}
              </div>
            </div>
            {numberOfLikes > 0 && (
              <div className="absolute -bottom-1 right-0 md:-bottom-2 md:right-6 flex items-center justify-center rounded-lg h-6 w-10 bg-gray-200 text-blue-500">
                <ThumbUpIcon className="h-4 text-blue-500" />
                {numberOfLikes}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`ml-1 text-xs hover:underline hover:cursor-pointer ${
                hasLiked ? 'text-blue-500' : ''
              }`}
              onClick={() => likeComment(comment._id)}
            >
              Like
            </span>
            <span
              className="ml-1 text-xs hover:underline hover:cursor-pointer"
              onClick={() => setShowCommentReplyBox((prev) => !prev)}
            >
              Reply
            </span>
            <p className="text-xs">{date}</p>
          </div>
          {showReplies.length
            ? showReplies.map((comment, idx) => (
                <Replies key={idx} comment={comment} />
              ))
            : ''}
          {showCommentReplyBox ? (
            <CommentInput
              user={user.data}
              id={_id}
              reply={true}
              setCommentAdded={setCommentAdded}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
