import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './SearchPage.css';
import SideBar from '../components/SideBar';
import { SearchContext } from '../context/search.context';
function SearchPage() {
  const { displayProfile, isLoading } = useContext(SearchContext);
  return (
    <div>
      <h3>Find your perfect candidates</h3>
      <p>{isLoading}</p>
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
