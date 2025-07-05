import { decodedToken } from "@/helpers/utils/jwt";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/utils/local-storage";

import { getBaseUrl } from "@/helpers/config/envConfig";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { authKey } from "@/constants/authKey";

export const storeUserInfo = (accessToken: any) => {
  return setToLocalStorage(authKey, accessToken);
};
export const getUserInfo = () => {
  if (typeof window === "undefined") {
    return ""; // Ensure not to run on the server
  }
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/users/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
