import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfileDetailsPages.css';
import LinkImage from '../assets/svg/link.svg';
import ToggleFavourite from '../components/ToggleFavourite';
import { API_URL } from '../utils/constants';

const ProfileDetailsPages = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  // Get the id from the URL parameters
  const params = useParams();

  useEffect(() => {
    let config = {
      method: 'get',
      url: `/profile/${params.profileId}`,
      baseURL: API_URL,
    };

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

  if (!Object.keys(profileInfo).length) {
    return <div>Loading</div>;
  }

  return (
    <div className="profileInfo-container">
      <div className="github-container">
        <div className="top-card-container">
          <h3 className="candidate-name">{profileInfo[0].username}</h3>

          <ToggleFavourite profileInfoId={profileInfo[0]._id} />
        </div>

        <h4 className="left-container-title">Github Projects</h4>
        {profileInfo[0].githubProfile[0] && (
          <div>
            <ul>
              {profileInfo[0].githubProfile[0].repos.slice(0, 5).map((repo) => (
                <li key={repo._id} className="githuub-repo-list">
                  <img className="linkImage" src={LinkImage} alt="" />
                  <a className="repos-link" href={repo.url}>
                    {repo.name.split('/')[1]}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="left-container-title">Most used langugages</h4>
            <ol>
              {profileInfo[0].githubProfile[0].languages
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
          <h4 className="left-container-title">Remote</h4>
          <li className="left-container-text">
            {' '}
            {profileInfo[0].remote.toString().split('')}
          </li>
          <h4 className="left-container-title">Experience</h4>
          <li className="left-container-text">{profileInfo[0].experience} </li>
          <h4 className="left-container-title">Expected Salary</h4>
          <li className="left-container-text">
            {' '}
            ${' '}
            {profileInfo[0].salary
              .toString()
              .replace(/\s|\[|\]/g, '')
              .split('')}
          </li>
        </div>
      </div>
      <div className="profileInfo-details-container">
        <img src={profileInfo[0].cv} alt="profileImg" width="500px" />
      </div>
    </div>
  );
};

export default ProfileDetailsPages;
