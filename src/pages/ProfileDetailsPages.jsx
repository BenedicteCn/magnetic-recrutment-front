import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileDetailsPages.css";
// import SearchNameImage from '../assets/name-bg.jpg';

import StarImage from "../assets/svg/star-empty.svg";
import ContactImage from "../assets/svg/contact.svg";
import LinkImage from "../assets/svg/link.svg";
const ProfileDetailsPages = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  // We want to get the id from the URL parameters
  const params = useParams();

  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:5005/profile/${params.profileId}`,
    };
    // console.log('id', params.profileId);
    axios(config)
      .then((response) => {
        setProfileInfo(response.data);
      })
      .catch((error) => {
        setErrorMessage("Could not get info");
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

  console.log("profileifo new", profileInfo);
  if (!Object.keys(profileInfo).length) {
    return <div>Loading</div>;
  }
  return (
    <div className="profileInfo-container">
      <div className="github-container">
        {/* <img className="searchNameImage" src={SearchNameImage} alt="" /> */}
        <div className="top-card-container">
          <h3 className="candidate-name">{profileInfo.username}</h3>
          {/* <pre>{JSON.stringify(profileInfo, null, 2)}</pre> */}
          <div className="star">
            <img className="starImage" src={StarImage} alt="" />

            <p className="candidate-text">Add to Favorite</p>
          </div>
          <div className="contact">
            <img className="contactImage" src={ContactImage} alt="" />
            <p className="candidate-text"> Contact Candidate</p>
          </div>
        </div>
        <h4 className="left-container-title">Github Projects</h4>
        {profileInfo[0].githubProfile[0] && (
          <div>
            <ul>
              {profileInfo[0].githubProfile[0].repos.slice(0, 5).map((repo) => (
                <li key={repo._id} className="githuub-repo-list">
                  <img className="linkImage" src={LinkImage} alt="" />
                  <a className="repos-link" href={repo.url}>
                    {repo.name.split("/")[1]}
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
          <p className="left-container-text"> {profileInfo[0].remote}</p>
          <h4 className="left-container-title">Experience</h4>
          <p className="left-container-text">{profileInfo[0].experience}</p>
          <h4 className="left-container-title">Expected Salary</h4>
          <p className="left-container-text"> ${profileInfo[0].salary}</p>
        </div>
      </div>
      <div className="profileInfo-details-container">
        <img src={profileInfo[0].cv} alt="profileImg" width="500px" />
      </div>
    </div>
  );
};

export default ProfileDetailsPages;
