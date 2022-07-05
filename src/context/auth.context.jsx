import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_STORAGE_KEY } from "../utils/constants";
import makeRequest from "../utils/service";

// make a new React context
const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    authenticateUser();
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    authenticateUser();
  };

  const getToken = useCallback(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }, []);

  const removeCookie = async () => {
    return makeRequest({
      method: "post",
      url: "/candidate/auth/logout",
    });
  };

  const logout = async () => {
    try {
      // Update browser storage and cookies
      removeToken();
      await removeCookie("connect.sid");

      // After localStorage and cookies are changed, reauthenticate
      // (should result in us being logged out according to React state)
      authenticateUser();
    } catch (error) {
      console.log("could not log out", error);
    }
  };

  const authenticateUser = useCallback(() => {
    const token = getToken();

    setIsLoading(true);

    makeRequest({
      method: "get",
      url: "/hr/verify",
      token,
    })
      .then((response) => {
        setUser(response.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, [getToken]);

  useEffect(authenticateUser, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
