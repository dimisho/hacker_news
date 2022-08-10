import React, { useState } from 'react';
import { CommentBlock, AuthorComment, ShowMoreButton } from './Styles/CommentStyles';

export default function Comment({ comment, propsMarginLeft }) {
  const [commentTree, setCommentTree] = useState(false);
  return (
    <CommentBlock marginLeft={typeof propsMarginLeft !== 'undefined' ? propsMarginLeft : '0px'}>
      <AuthorComment>
        {comment.user} | {comment.time_ago}
      </AuthorComment>
      <div dangerouslySetInnerHTML={{ __html: `${comment.content}` }} />
      {comment.comments_count > 0 && !commentTree && (
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
}
