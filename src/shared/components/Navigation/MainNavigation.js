import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <h1>
        <Link to="/">Your Posts </Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
