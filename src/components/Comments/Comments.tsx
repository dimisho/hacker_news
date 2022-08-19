import React from 'react';
import { ItemSchema } from 'schemes/ItemSchema';
import Comment from './Comment';
import { CommentsList } from './Styles/CommentsStyles';

interface CommentsProps {
  comments: ItemSchema[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <CommentsList>
      {comments ? comments.map((comment) => <Comment comment={comment} key={comment.id} />) : <p>No comments</p>}
    </CommentsList>
  );
};

export default Comments;
