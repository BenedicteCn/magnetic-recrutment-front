import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { displayProfileAtom, isLoadingAtom } from '../state/searchAtom';

import './SearchPage.css';
import SideBar from '../components/SideBar';
import { SearchContext } from '../context/search.context';
function SearchPage() {
  const [displayProfile] = useAtom(displayProfileAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  return (
    <div>
      <h3>Find your perfect candidates</h3>
      {/* <p>{isLoading ? 'loading' : 'not loading'}</p> */}
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
  );
}

export default SearchPage;
