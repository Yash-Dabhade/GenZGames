import React from "react";
import "../styles/Profile.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

function Profile() {
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
            <form>
              <div id="profileLeftGrid">
                <img src="./res/user.jpg" id="profilePic" />
                <input type="file" name="photo" id="profilePhoto" />
              </div>
              <div id="profileRightGrid">
                <label for="profileName">Name </label>
                <input type="text" name="name" id="profileName" />
                <label for="profileEmail">Email </label>
                <input type="email" name="email" id="profileEmail" />
                <label for="profilePassward">New Password </label>
                <input type="password" name="password" id="profilePassword" />
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
