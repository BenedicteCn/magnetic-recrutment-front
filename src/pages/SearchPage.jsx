import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { displayProfileAtom } from '../state/searchAtom';
import './SearchPage.css';
import SideBar from '../components/SideBar';
import ImageTwo from '../assets/01.png';
import ProfileCard from '../components/ProfileCard';

function SearchPage() {
  const [displayProfile] = useAtom(displayProfileAtom);

  return (
    <div className="big-search-container">
      <div className="search-details-container">
        <SideBar />
      </div>
      <div className="candidate-details-container">
        <h2 className="search-title">Find your perfect candidates</h2>

        <img className="searchimage" src={ImageTwo} alt="" width="250px" />

        <p className="recruiting-text">
          {' '}
          Start the recruiting process with a selection of hundreds of
          candidates, available right now
        </p>
        <div className="searchpage-container">
          <ul className="profile-container">
            {displayProfile.map((profile) => (
              <ProfileCard profile={profile} />
            ))}
            {/* <Link to={`/hr/search/${profile._id}`}>
                  <h4>{profile.username}</h4>
                  <img src={profile.cv} alt="profileImg" width="200px" />
                </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
