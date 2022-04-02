import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPosts = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { sendRequest } = useHttpClient();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      {loadedPosts && <PostList items={loadedPosts} />}
    </React.Fragment>
  );
};

export default UserPosts;
