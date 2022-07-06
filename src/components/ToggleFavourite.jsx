import React, { useState } from "react";
import makeRequest from "../utils/service";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import StarImage from "../assets/svg/star-empty.svg";
import "./Toggle.css";

const ToggleFavourite = ({ profileInfoId }) => {
  const { getToken } = useContext(AuthContext);
  const token = getToken();

  const [isSaved, setIsSaved] = useState(false);

  console.log(profileInfoId);

  const toggleFavourite = () => {
    makeRequest({
      token,
      method: isSaved ? "DELETE" : "POST",
      url: `/favourites/${profileInfoId}`,
    })
      .then((response) => {
        if (response.status === 201) {
          setIsSaved(true);
        } else if (response.status === 204) {
          setIsSaved(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setIsSaved(true);
        } else if (error.response.status === 404) {
          setIsSaved(false);
        }
      });
  };
  const getFavorites = async () => {
    try {
      const { data } = await makeRequest({
        method: "get",
        url: "/favourites",
        token: token,
      });
      const fav = data.profiles.find(
        (profile) => profile.profile._id === profileInfoId
      );
      if (fav) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <button onClick={toggleFavourite} className="toggle-button">
      <img className="starImage" src={StarImage} alt="" />
      &nbsp; {isSaved ? "Remove" : "Add"} favourite
    </button>
  );
};

export default ToggleFavourite;
