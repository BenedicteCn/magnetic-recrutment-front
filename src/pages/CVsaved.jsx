import React from 'react';
import { useContext, useState, useEffect } from 'react';
import makeRequest from '../utils/service';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
import './CVsaved.css';
import ProfileCard from '../components/ProfileCard';
const CVsaved = () => {
  const { getToken } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);

  const token = getToken();

  const getFavourites = async () => {
    const response = await makeRequest({
      token,
      method: 'GET',
      url: '/favourites',
    });
    setProfiles(response.data.profiles);
  };

  useEffect(() => {
    getFavourites();
  }, []);

  if (!profiles) return <div>Loading</div>;
  return (
    <div className="cv-save-profile">
      {profiles.map((profile) => {
        return <ProfileCard profile={profile.profile} />;
      })}
    </div>
  );
};

export default CVsaved;
