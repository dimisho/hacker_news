import React, { useState } from 'react';
import { CommentBlock, AuthorComment, ShowMoreButton } from './Styles/CommentStyles';
import { ItemSchema } from 'schemes/ItemSchema';
import moment from 'moment';

interface CommentProps {
  comment: ItemSchema;
  propsMarginLeft?: `${number}px`;
}
const Comment: React.FC<CommentProps> = ({ comment, propsMarginLeft = '0px' }) => {
  const [commentTree, setCommentTree] = useState(false);
  return (
    <CommentBlock marginLeft={propsMarginLeft}>
      <AuthorComment>
        {comment.user} | {moment(new Date(comment.time)).fromNow()}
      </AuthorComment>
      <div dangerouslySetInnerHTML={{ __html: `${comment.content}` }} />
      {comment.comments?.length > 0 && !commentTree && (
        <ShowMoreButton
          onClick={() => {
            setCommentTree(true);
          }}
        >
          Show more
        </ShowMoreButton>
      )}
      {commentTree &&
        comment.comments.map((comment) => <Comment comment={comment} propsMarginLeft="20px" key={comment.id} />)}
    </CommentBlock>
  );
};

export default Comment;
