import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import UserPosts from "./posts/pages/UserPosts";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} exact />
        <Route path="/:userId/posts" element={<UserPosts />} exact />
        <Route path="/posts/new" element={<NewPost />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
