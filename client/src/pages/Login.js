import React, { useRef } from "react";
import "../styles/Login.css";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div id="mainAuthContainer">
      <div className="authContainer" id="container">
        <div className="form-container sign-in-container">
          <form className="authForm" action="#">
            <h1 id="title1">Sign in</h1>
            <div className="social-container">
              <div className="social-container">
                <button className="signInWithGoogle">
                  Sign In With Google
                </button>
              </div>
            </div>
            <span id="authSpan">or use your account</span>
            <input className="authInput" type="email" placeholder="Email" />
            <input
              className="authInput"
              type="password"
              placeholder="Password"
            />
            <a id="autha" href="#">
              Forgot your password?
            </a>
            <button className="authButton">Sign In</button>
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
              <p id="authPara">Start Exploring with us</p>
              <NavLink to="/register">
                <button
                  className="authButton"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                  }}
                  id="signUp"
                >
                  Sign Up
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
