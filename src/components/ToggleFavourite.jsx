import React, { useState } from "react";
import makeRequest from "../utils/service";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

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

  return (
    <button onClick={toggleFavourite}>
      {isSaved ? "Remove" : "Add"} favourite
    </button>
  );
};

export default ToggleFavourite;
