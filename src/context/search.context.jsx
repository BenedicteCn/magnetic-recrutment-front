import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

// make a new React context
const SearchContext = createContext();

const SearchContextWrapper = ({ children }) => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayProfile, setDisplayProfile] = useState([]);
  const [query, setQuery] = useState({});
  const getRelevantUsers = useCallback((query) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5005/profile`, {
        params: query,
      })
      .then((reponse) => {
        setIsLoading(false);
        setDisplayProfile(reponse.data);
      });
    console.log(query);
  }, []);

  useEffect(getRelevantUsers, [query]);

  return (
    <SearchContext.Provider
      value={{
        displayProfile,
        isLoading,
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextWrapper };
