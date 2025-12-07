import { createContext, useState, useContext, useEffect } from "react";
import axiosAPI from "../Axios/axiossetup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosAPI.get("user/authviewcheck");
        setLoggedIn(res.data?.isLoggedIn);
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
