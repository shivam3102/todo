import React from "react";
import Profile from "../Images/mobile-post-colour.svg";
import { isAuthenticate } from '../auth/index'

const UserInfo = () => {

    const { user } = isAuthenticate()

  return (
    <div className="card">
      <div className="card-image">
        <img src={Profile} alt='Profile Photo'/>
      </div>
      <div className="card-content">
        <h4 className="center-align">Information</h4>
        <h6>{user.name}</h6>
        <h6>{user.email}</h6>
      </div>
    </div>
  );
};

export default UserInfo;
