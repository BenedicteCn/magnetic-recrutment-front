import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

// make a new React context
const SearchContext = createContext();

const SearchContextWrapper = ({ children }) => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayProfile, setDisplayProfile] = useState([]);
  const [query, setQuery] = useState({});

  const getRelevantUsers = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`/profile`, {
        params: query,
        baseURL: API_URL,
      })
      .then((reponse) => {
        setIsLoading(false);
        setDisplayProfile(reponse.data);
      });
    console.log(query);
  }, [query]);

  useEffect(getRelevantUsers, [getRelevantUsers]);

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
