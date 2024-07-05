import React, { useState } from "react";
import "../styles/Login.css";
import { NavLink } from "react-router-dom";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithGoogle = () => {
    sessionStorage.setItem("isLoggedIn", true);
    window.open(baseURL + "/auth/google", "_self");
  };

  const handleSignIn = () => {
    if (email.length != 0 && password.length != 0) {
      axios.defaults.withCredentials = true;
      axios
        .post(
          baseURL + "/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Success Login !");
          console.log(res);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("jwtToken", res.data.token);
          window.location.href = "/";
        })
        .catch((err) => {
          toast.error("Unable to Login In with given credentials !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      toast.error("All Fields are mandatory !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div id="mainAuthContainer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="authContainer" id="container">
        <div className="form-container sign-in-container">
          <div className="authForm">
            <h1 id="title1">Sign in</h1>
            <div className="social-container">
              <div className="social-container">
                <button
                  className="signInWithGoogle"
                  onClick={handleSignInWithGoogle}
                >
                  <img src="./res/google.png" height={"25px"} />
                  Sign In With Google
                </button>
              </div>
            </div>
            <span id="authSpan">or use your account</span>
            <input
              className="authInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="authInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <a id="autha" href="#">
              Forgot your password?
            </a> */}
            <button className="authButton" onClick={handleSignIn}>
              Sign In
            </button>
            <div className="mobileOnlyDiv">
              <NavLink to="/register">Register New User</NavLink>
            </div>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
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
