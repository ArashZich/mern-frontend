import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id: "u1",
      name: "Arash",
      image: "../images/avatar.jpg",
      posts: 2,
    },
  ];
  return <UsersList items={users} />;
};

export default Users;
