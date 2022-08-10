import React from 'react';
import { ItemSchema } from '../../Schemes/ItemSchema';
import Comment from './Comment';
import { CommentsList } from './Styles/CommentsStyles';

export default function Comments({ comments }: { comments: ItemSchema[] }) {
  return (
    <CommentsList>
      {comments ? (
        comments.map((comment) => <Comment comment={comment} propsMarginLeft="0px" key={comment.id} />)
      ) : (
        <p>No comments</p>
      )}
    </CommentsList>
  );
}
