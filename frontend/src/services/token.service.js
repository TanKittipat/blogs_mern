import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookie.get("user");
  return user;
};

const setUser = (user) => {
  cookie.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000),
  });
};

const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

const TokenServices = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenServices;
