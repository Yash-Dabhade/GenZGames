import React, { useRef } from "react";
import "../styles/Login.css";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <div id="mainAuthContainer">
      <div className="authContainer" id="container">
        <div className="form-container sign-in-container">
          <form className="authForm" action="#">
            <h1 id="title1">Create Account</h1>
            <div className="social-container">
              <button className="signInWithGoogle">Sign In With Google</button>
            </div>
            <span id="authSpan">or use your email for registration</span>
            <input className="authInput" type="text" placeholder="Name" />
            <input className="authInput" type="email" placeholder="Email" />
            <input
              className="authInput"
              type="password"
              placeholder="Password"
            />
            <button className="authButton">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 id="title1">Welcome Back!</h1>
              <p id="authPara">
                To keep connected with us please login with your personal info
              </p>
              <button className="authButtonGhost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 id="title1">GenZGames</h1>
              <p id="authPara">Already a user ? </p>
              <NavLink to="/login">
                <button
                  className="authButton"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                  }}
                  id="signIn"
                >
                  Sign In
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
