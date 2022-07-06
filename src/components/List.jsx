import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { FavoritesContext } from '../context/favoritesContext';

const List = () => {
  const { favorites, add } = useContext(FavoritesContext);
  console.log('favorites', favorites);
  const [draft, setDraft] = useState('');

  const handleChange = (event) => setDraft(event.target.value);
  const handleAdd = () => {
    add(draft);
    setDraft('');
  };

  return (
    <div>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id} className="profilecard">
            <Link to={`/hr/search/${favorite._id}`}>
              <h4>{favorite.username}</h4>
              <img src={favorite.cv} alt="profileImg" width="200px" />
            </Link>
          </li>
        ))}
      </ul>
      <input value={draft} type="text" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
export default List;
