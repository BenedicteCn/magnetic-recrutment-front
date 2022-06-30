import React from 'react';
import { useState } from 'react';

function SearchPage() {
  const [searchProfile, setSearchProfile] = useState('');

  const handleChange = (event) => {
    setSearchProfile(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <input
        type="text"
        placeholder=""
        value={searchProfile}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchPage;
