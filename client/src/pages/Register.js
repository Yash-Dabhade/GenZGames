import React, { useRef, useState } from "react";
import "../styles/Login.css";
import { NavLink, redirect } from "react-router-dom";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleSignInWithGoogle = () => {
    window.open(baseURL + "/auth/google", "_self");
  };

  const handleSignUp = () => {
    // alert("sing");
    if (!regex.test(email)) {
      toast.error("Email is not in valid format or already used!", {
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
    if (!email.length == 0 && !name.length == 0 && password.length >= 6) {
      axios
        .post(
          baseURL + "/signup",
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          sessionStorage.setItem("isLoggedIn", true);
          console.log(res);
          // window.location.href = "/";
        })
        .catch((err) => {
          toast.error("Unable to register, Please try again later !", {
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
      toast.error(
        "All fields are mandatory and password must of atleast 6 char !",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
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
            <h1 id="title1">Create Account</h1>
            <div className="social-container">
              <button
                className="signInWithGoogle"
                onClick={handleSignInWithGoogle}
              >
                <img src="./res/google.png" height={"25px"} />
                Sign In With Google
              </button>
            </div>
            <span id="authSpan">or use your email for registration</span>
            <input
              className="authInput"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="authInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="authInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="authButton" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
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
