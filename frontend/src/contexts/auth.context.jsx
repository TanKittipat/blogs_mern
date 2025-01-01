import { useContext, createContext, useEffect, useState } from "react";
import AuthServices from "../services/auth.service";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  function getUser() {
    const savedUser = cookie.get("user") || null;
    return savedUser;
  }

  const login = (user) => setUser(user);

  const logout = () => {
    AuthServices.logout();
    setUser(null);
  };

  useEffect(() => {
    cookie.set("user", JSON.stringify(user), {
      path: "/",
      expires: new Date(Date.now() + 86400 * 1000),
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
