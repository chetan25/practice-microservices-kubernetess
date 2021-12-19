import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.status === "approve"
          ? comment.content
          : comment.status === "pending"
          ? "Pending Approval"
          : "This comment has been rejected"}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
