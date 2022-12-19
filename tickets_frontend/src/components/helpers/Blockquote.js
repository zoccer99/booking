import React from "react";

export const Blockquote = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-start mt-3 w-75">
        <blockquote className="blockquote">
          <h1 className="mb-0">{props.heading}</h1>
          <h2 className="blockquote-footer pt-4 ">{props.comment}</h2>
        </blockquote>
      </div>
    </div>
  );
};
