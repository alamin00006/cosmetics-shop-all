import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { toast } from "react-hot-toast";

export const phoneNumberCheck = (
  e: { target: { value: any } },
  userInfo: any,
  setUserInfo: (arg0: any) => void,
  error: any,
  setError: (arg0: any) => void
) => {
  const phoneNumber = e.target.value;

  // const bdPhoneNumberRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
  // const validPhone = bdPhoneNumberRegex.test(phoneNumber);

  setUserInfo({ ...userInfo, phone: phoneNumber });
  setError({ ...error, phoneError: "" });
};

// Password check
export const passwordCheck = (
  e: { target: { value: string } },
  setUserInfo: (arg0: { (prevInfo: any): any; (prevInfo: any): any }) => void,
  error: any,
  setError: (arg0: { (prevError: any): any; (prevError: any): any }) => void
) => {
  const passwordRegex = /.{6,}/;
  const validPassword = passwordRegex.test(e.target.value);
  if (validPassword) {
    setUserInfo((prevInfo: any) => ({ ...prevInfo, password: e.target.value }));
    setError((prevError: any) => ({ ...prevError, passwordError: "" }));
  } else {
    setError((prevError: any) => ({
      ...prevError,
      passwordError: "Password must be at least 6 characters long",
    }));
    setUserInfo((prevInfo: any) => ({ ...prevInfo, password: "" }));
  }
};

// login Handle
export const handleSubmit = async (
  e: { preventDefault: () => void },
  userInfo: { phone: { toString: () => any }; password: any },
  authKey: string,
  router: { back: () => void }
) => {
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
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
};
