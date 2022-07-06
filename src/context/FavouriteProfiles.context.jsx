import makeRequest from "../utils/service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./auth.context";

// make a new React context
const FavouritesContext = createContext();

const FavouritesContextWrapper = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  console.log("favorites:", favorites);
  const { getToken } = useContext(AuthContext);

  const getFavorites = useCallback(() => {
    const token = getToken();
    makeRequest({
      token,
      method: "GET",
      url: "/favourites",
    })
      .then((response) => setFavorites(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(getFavorites, [getFavorites]);

  return (
    <FavouritesContext.Provider
      value={{
        favorites,
        getFavorites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesContext, FavouritesContextWrapper };
