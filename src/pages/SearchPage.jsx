import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { displayProfileAtom, isLoadingAtom } from '../state/searchAtom';
import './SearchPage.css';

import SideBar from '../components/SideBar';

function SearchPage() {
  const [displayProfile] = useAtom(displayProfileAtom);
  // const [isLoading] = useAtom(isLoadingAtom);
  return (
    <div className="search-container">
      <h2>Find your perfect candidates</h2>
      {/* <p>{isLoading ? 'loading' : 'not loading'}</p> */}
      <div className="search-details-container">
        <SideBar />
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
  );
}

export default SearchPage;
