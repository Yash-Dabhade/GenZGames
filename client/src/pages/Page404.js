import React from "react";
import "../styles/Page404.css";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div id="pageNotFoundContainer">
      <title>Page Not Found</title>
      <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" />
      <h1 className="error-text">It Looks Like You Are Lost ...</h1>

      <NavLink
        to="/"
        className="error"
        href="https://softcodeon.com/tutorials/create-custom-404-error-page.htm"
      >
        <div className="btn1">Go Home</div>
      </NavLink>
    </div>
  );
}

export default Page404;
