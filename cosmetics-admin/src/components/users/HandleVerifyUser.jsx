import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import toast from "react-hot-toast";

import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";

export const handleVerifyUser = async (id, newIsVerifyValue, refetch) => {
  const updateVerify = {
    isVerified: newIsVerifyValue,
  };

  try {
    // Get the access token
    const accessToken = getFromLocalStorage(authKey);
    // Set the headers
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    };

    const { data } = await axios.patch(
      `${getBaseUrl()}/users/${id}`,
      updateVerify,
      {
        headers,
      }
    );
    // console.log(data);
    if (data.status === 400) {
      return toast.error(data.data.error);
    }
    if (newIsVerifyValue === true) {
      toast.success("Verified");
    } else {
      toast.success("Unverified");
    }

    refetch();
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.message);
  }
};
