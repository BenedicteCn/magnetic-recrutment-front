import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfileDetailsPages.css';
// import SearchNameImage from '../assets/name-bg.jpg';

import StarImage from '../assets/svg/star-empty.svg';
import ContactImage from '../assets/svg/contact.svg';
const ProfileDetailsPages = () => {
  const [profileInfo, setProfileInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // We want to get the id from the URL parameters
  const params = useParams();

  useEffect(() => {
    let config = {
      method: 'get',
      url: `http://localhost:5005/profile/${params.profileId}`,
    };
    // console.log('id', params.profileId);
    axios(config)
      .then((response) => {
        setProfileInfo(response.data);
      })
      .catch((error) => {
        setErrorMessage('Could not get info');
      });
  }, [params.profileId]);

  if (errorMessage) {
    return (
      <>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </>
    );
  }
  console.log(profileInfo);

  return (
    <div className="profileInfo-container">
      <div className="github-container">
        {/* <img className="searchNameImage" src={SearchNameImage} alt="" /> */}
        <div className="top-card-container">
          <h3 className="candidate-name">
            {profileInfo.firstname} {profileInfo.lastname}
          </h3>
          <div className="star">
            <img className="starImage" src={StarImage} alt="" />

            <p className="candidate-text">Add to Favorite</p>
          </div>
          <div className="contact">
            <img className="contactImage" src={ContactImage} alt="" />
            <p className="candidate-text"> Contact Candidate</p>
          </div>
        </div>
        <p>Github Projects</p>
        {profileInfo.githubProfile && (
          <div>
            <ul>
              {profileInfo.githubProfile.repos.slice(0, 5).map((repo) => (
                <li key={repo._id} className="githuub-repo-list">
                  <a href={repo.url}> {repo.name.split('/')[1]}</a>
                </li>
              ))}
            </ul>
            <p>Most used langugages</p>
            <ol>
              {profileInfo.githubProfile.languages
                .sort((a, b) => b.byteCount - a.byteCount)
                .slice(0, 3)
                .map((lang) => (
                  <li key={lang._id} className="githuub-lang-list">
                    {lang.language}
                  </li>
                ))}
            </ol>
          </div>
        )}
        <div className="profile-card">
          <p>Remote: {profileInfo.remote}</p>
          <p>Experience: {profileInfo.experience}</p>
          <p>Expected Salary: ${profileInfo.salary}</p>
        </div>
      </div>
      <div className="profileInfo-details-container">
        <img src={profileInfo.url} alt="profileImg" width="500px" />
      </div>
    </div>
  );
};

export default ProfileDetailsPages;
