import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import ReposList from './ReposList';

function SearchUser() {
  const [searchInput, setSearchInput] = useState('');
  const [pinnedRepos, setPinnedRepos] = useState([]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${searchInput}/repos`)
      .then((response) => {
        // console.log('response.data', response.data);
        setPinnedRepos(response.data);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={searchInput}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
      <ReposList pinnedRepos={pinnedRepos} />
    </div>
  );
}

export default SearchUser;
