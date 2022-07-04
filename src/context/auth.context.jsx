import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { API_URL, TOKEN_STORAGE_KEY } from "../utils/constants";

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
    return axios({
      method: "post",
      baseURL: API_URL,
      url: "/candidate/auth/logout",
      withCredentials: true,
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

    axios({
      method: "get",
      baseURL: API_URL,
      url: "/hr/verify",
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
      withCredentials: true,
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
