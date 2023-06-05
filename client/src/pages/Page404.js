import React from "react";
import "../styles/Page404.css";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <title>Page Not Found</title>
      <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" />
      <h1 className="error-text">
        Whoops, We can't seem to find the resource you're looking for.
      </h1>
      <p className="text">
        Please check that the Web site address is spelled correctly.Or,
      </p>
      <div className="btn1">
        <NavLink
          to="/"
          className="error"
          href="https://softcodeon.com/tutorials/create-custom-404-error-page.htm"
        >
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
}

export default Page404;
