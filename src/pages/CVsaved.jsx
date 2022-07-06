import React from "react";
import { useContext, useState, useEffect } from "react";
import { FavoritesProfilesContext } from "../context/FavouriteProfiles.context";
import makeRequest from "../utils/service";
import { AuthContext } from "../context/auth.context";

const CVsaved = () => {
  const { getToken } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);

  const token = getToken();
  useEffect(() => {
    makeRequest({
      token,
      method: "GET",
      url: "/favourites",
    }).then((response) => {
      setProfiles(response.data.profiles);
    });
  }, []);

  console.log(profiles);

  if (!profiles) return <div>Loading</div>;
  return (
    <div>
      {profiles.map((profile) => {
        console.log("----------->", profiles);
        return <li key={profile._id}>{profile?.profile?.cv}</li>;
      })}
    </div>
  );
};

export default CVsaved;
