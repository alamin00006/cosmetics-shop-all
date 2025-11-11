import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import toast from "react-hot-toast";

import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";

export const handleAdminUserActive = async (id, status, refetch) => {
  const updateData = {
    status: status,
  };

  try {
    // Get the access token
    const accessToken = getFromLocalStorage(authKey);
    // Set the headers
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    };

    await axios.patch(
      `${getBaseUrl()}/admin-users/${id}/update-status`,
      updateData,
      {
        headers,
      }
    );

    toast.success(status);

    refetch();
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.message);
  }
};
