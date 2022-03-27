import React from "react";
import Button from "../../shared/components/FormElements/Button";

import "./PostItem.css";

const PostItem = (props) => {
  return (
    <li>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
      </div>
      <div>
        <Button>Delete</Button>
      </div>
    </li>
  );
};

export default PostItem;
