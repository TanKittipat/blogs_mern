import api from "./api";
import { Cookies } from "react-cookie";
const authUrl = import.meta.env.VITE_BASE_URL + "/auth";
const cookie = new Cookies();

const register = async (username, password) => {
  return await api.post(authUrl + "/register", { username, password });
};

const login = async (username, password) => {
  const res = await api.post(authUrl + "/login", { username, password });
  const { status, data } = res;
  if (status === 200) {
    if (data.accessToken) {
      cookie.set("accessToken", data.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });
      cookie.set("user", data);
    }
  }
  return res;
};

const logout = () => {
  cookie.remove("accessToken", { path: "/" });
  cookie.remove("user", { path: "/" });
};

const AuthServices = {
  register,
  login,
  logout,
};

export default AuthServices;
