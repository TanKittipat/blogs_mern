import axios from "axios";
import TokenServices from "./token.service";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// add interceptor to instance to attach header ["x-access-token"]
instance.interceptors.request.use(
  (config) => {
    const token = TokenServices.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
