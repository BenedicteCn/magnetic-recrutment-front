import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import makeRequest from "../utils/service";

const FavoritesProfilesContext = createContext();

const FavoritesProfilesContextWrapper = ({ children }) => {
  const { isLoggedIn, user, setIsLoading } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);

    const response = makeRequest({
      method: "get",
      url: `/favourites`,
    });

    console.log("favorites", response);

    setFavorites(response.data.favorites);
    setIsLoading(false);
  };

  useEffect(() => {
    getFavorites();
  }, [isLoggedIn, user]);

  return (
    <FavoritesProfilesContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesProfilesContext.Provider>
  );
};

export { FavoritesProfilesContext, FavoritesProfilesContextWrapper };
