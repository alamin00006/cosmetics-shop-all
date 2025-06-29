import axios from "axios";
import { toast } from "react-hot-toast";
import { getBaseUrl } from "../config/envConfig";

// phone Number Check
// export const phoneNumberCheck = (e, userInfo, setUserInfo, error, setError) => {
//   const phoneNumber = e.target.value;

//   if (phoneNumber.length >= 11) {
//     const bdPhoneNumberRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
//     const validPhone = bdPhoneNumberRegex.test(phoneNumber);
//     if (validPhone) {
//       setUserInfo({ ...userInfo, phone: phoneNumber });
//       setError({ ...error, phoneError: "" });
//     } else {
//       setError({ ...error, phoneError: "Invalid Phone Number" });
//       setUserInfo({ ...userInfo, phone: "" });
//     }
//   } else {
//     setError({ ...error, phoneError: "" });
//   }
// };
export const phoneNumberCheck = (e, userInfo, setUserInfo, error, setError) => {
  const phoneNumber = e.target.value;

  // const bdPhoneNumberRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
  // const validPhone = bdPhoneNumberRegex.test(phoneNumber);

  setUserInfo({ ...userInfo, phone: phoneNumber });
  setError({ ...error, phoneError: "" });
};

// Password check
export const passwordCheck = (e, setUserInfo, error, setError) => {
  const passwordRegex = /.{6,}/;
  const validPassword = passwordRegex.test(e.target.value);
  if (validPassword) {
    setUserInfo((prevInfo) => ({ ...prevInfo, password: e.target.value }));
    setError((prevError) => ({ ...prevError, passwordError: "" }));
  } else {
    setError((prevError) => ({
      ...prevError,
      passwordError: "Password must be at least 6 characters long",
    }));
    setUserInfo((prevInfo) => ({ ...prevInfo, password: "" }));
  }
};

// login Handle
export const handleSubmit = async (e, userInfo, authKey, router) => {
  e.preventDefault();

  const userData = {
    phoneNumber: userInfo.phone.toString(),
    password: userInfo.password,
  };

  try {
    // const res = await userLogin(userData).unwrap();

    const res = await axios.post(`${getBaseUrl()}/users/login`, userData);

    // Check if the token is defined and not empty

    toast.success(res?.data?.message);
    localStorage.setItem(authKey, res?.data?.data?.token);
    router.back();
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};
