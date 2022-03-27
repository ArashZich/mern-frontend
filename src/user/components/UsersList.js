import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>User not found.</h2>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {props.items.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              postCount={user.posts}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default UsersList;
