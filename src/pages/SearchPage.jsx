import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { displayProfileAtom, isLoadingAtom } from '../state/searchAtom';
import './SearchPage.css';

import SideBar from '../components/SideBar';
import SearchImage from '../assets/login.png';
import PerfectCircleImage from '../assets/svg/circle-perfect-02.svg';
function SearchPage() {
  const [displayProfile] = useAtom(displayProfileAtom);
  // const [isLoading] = useAtom(isLoadingAtom);
  return (
    <div className="big-search-container">
      <div className="search-details-container">
        <hr />
        <div className="v-line"></div>
        <SideBar />
      </div>
      <div className="candidate-details-container">
        <h2 className="search-title">Find your perfect candidates</h2>
        <img
          className="perfectCircleImage"
          src={PerfectCircleImage}
          alt=""
          width="250px"
        />
        <img className="searchimage" src={SearchImage} alt="" width="250px" />

        <p className="recruiting-text">
          {' '}
          Start the recruiting process with a selection of hundreds of
          candidates, available right now
        </p>
        {/* <p>{isLoading ? 'loading' : 'not loading'}</p> */}
        <div className="searchpage-container">
          <div className="profile-container">
            {displayProfile.map((profile) => (
              <div key={profile._id} className="profilecard">
                <Link to={`/hr/search/${profile._id}`}>
                  <h4>
                    {profile.firstname} {profile.lastname}
                  </h4>
                  <img src={profile.url} alt="profileImg" width="200px" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
