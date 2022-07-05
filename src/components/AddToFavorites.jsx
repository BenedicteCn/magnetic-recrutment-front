import React from "react";
import { useState } from "react";

const AddToFavorites = () => {
  const [favourites, setFavourites] = useState([]);

  const addFavouriteProfile = (profile) => {
    const newFavouriteList = [...favourites, profile];
    setFavourites(newFavouriteList);
  };

  return (
    <div>
      <button onClick={addFavouriteProfile}>Add as favorite</button>
    </div>
  );
};

export default AddToFavorites;
