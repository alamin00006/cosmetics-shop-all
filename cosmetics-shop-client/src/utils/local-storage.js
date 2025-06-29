export const setToLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const removeUserInfo = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
  return "";
};

export const setUserVerificationData = (userDataKey, otpData) => {
  if (!userDataKey || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(userDataKey, JSON.stringify(otpData));
};

export const getUserVerificationData = (userDataKey) => {
  if (!userDataKey || typeof window === "undefined") {
    return "";
  }
  const parseData = localStorage.getItem(userDataKey);
  return JSON.parse(parseData);
};

export const removeUserVerificationData = (userDataKey) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(userDataKey);
  }
  return "";
};

// export const previousUrl = () => {
//   useEffect(() => {
//     // Store the current URL in localStorage
//     localStorage.setItem("previousUrl", window.location.pathname);
//   }, []);
// };
