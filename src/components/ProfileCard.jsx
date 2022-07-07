import React from "react";
import { Link } from "react-router-dom";
import "../pages/ProfileDetailsPages.css";

const ProfileCard = ({ profile }) => {
  console.log(profile?.username);
  if (!profile) {
    return <li></li>;
  }
  return (
    <li key={profile._id} className="cv-save-profilecard">
      <Link to={`/hr/search/${profile?._id}`}>
        <h4>{profile?.username}</h4>
        <img src={profile?.cv} alt="" className="img-cv" width="300px" />
      </Link>
    </li>
  );
};

export default ProfileCard;
