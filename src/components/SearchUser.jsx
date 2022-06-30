import React, { useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ReposList from './ReposList';

function SearchUser() {
  const [searchInput, setSearchInput] = useState('');
  const [allRepos, setAllRepos] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const pinnedRepos = useMemo(() => {
    return allRepos.filter((repo) => repo.stargazers_count > 0);
  }, [allRepos]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${searchInput}`)
      .then((response) => {
        // console.log('response.data', response.data);
        setUserInfo(response.data);
      });

    axios
      .get(`https://api.github.com/users/${searchInput}/repos?per_page=100`)
      .then((response) => {
        // console.log('response.data', response.data);
        setAllRepos(response.data);
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
      {/* <p>{JSON.stringify(userInfo)}</p> */}
      <p>{userInfo.name}</p>
      <img serc="{userInfo.name}" />
      <p>{userInfo.bio}</p>
      <ReposList pinnedRepos={pinnedRepos} />
    </div>
  );
}

export default SearchUser;
