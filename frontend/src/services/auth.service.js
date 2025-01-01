import api from "./api";
import { Cookies } from "react-cookie";
const authUrl = import.meta.env.VITE_BASE_URL + "/auth";
const cookie = new Cookies();

const register = async (username, password) => {
  return await api.post(authUrl + "/register", { username, password });
};

const AuthServices = {
  register,
};

export default AuthServices;
