import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/constants";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "/userdashboard", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", file);
    axios
      .post(
        baseURL + "/userdashboard/update",
        {
          name,
          email,
          password: newPassword,
          formData,
        },

        {
          withCredentials: true,
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="profileContainer">
      <NavBar />
      <div id="profileInnerContainer">
        <div id="profileLeftMenuContainer">
          <NavLink className="profileMenuItems" to="/profile">
            <img src="./res/user.png" height={"34px"} />
            <h3>Profile</h3>
          </NavLink>
          <NavLink to="/orders" className="profileMenuItems">
            <img src="./res/orders.png" height={"34px"} />
            <h3>Orders</h3>
          </NavLink>

          <NavLink to="/login" className="profileMenuItems">
            <img src="./res/logout.png" height={"34px"} />
            <h3>Logout</h3>
          </NavLink>
        </div>
        <div id="profileRightContentContainer">
          <h3 className="profileTitle">Update Profile</h3>
          <div id="profileFormContainer">
            <form onSubmit={handleSubmit}>
              <div id="profileLeftGrid">
                <img
                  src={
                    user && user.photo && user.photo.secure_url
                      ? user.photo.secure_url
                      : "https://res.cloudinary.com/dtrq1phi9/image/upload/v1666959517/users/hitudfvisk1fkvx9boj7.jpg"
                  }
                  id="profilePic"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  name="photo"
                  id="profilePhoto"
                />
              </div>
              <div id="profileRightGrid">
                <label for="profileName">Name </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  defaultValue={user && user.name}
                  name="name"
                  id="profileName"
                />
                <label for="profileEmail">Email </label>
                <input
                  type="email"
                  defaultValue={user && user.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="profileEmail"
                />
                <label for="profilePassward">New Password </label>
                <input
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  name="password"
                  id="profilePassword"
                />
                <input type="submit" value="Update Now" id="submitProfile" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
