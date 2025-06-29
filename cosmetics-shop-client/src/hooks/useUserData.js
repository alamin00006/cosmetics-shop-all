import { useState, useEffect } from "react";
import { getFromLocalStorage } from "@/helpers/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decrypt } from "@/helpers/utils/decrypt";

const useUserData = (isUser) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const accessToken = getFromLocalStorage(authKey);

        if (!accessToken) {
          throw new Error("Something is wrong. Please log in.");
        }

        const headers = {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        };

        const res = await fetch(`${getBaseUrl()}/users/me`, { headers });

        if (!res.ok) {
          throw new Error("Please Connect your internet");
        }

        const data = await res.json();

        // Assuming the backend sends 'content' (encrypted data) and 'iv' (IV)
        if (data?.data?.content && data?.data?.iv) {
          const decrypted = decrypt(data?.data.content, data?.data.iv);
          setUserData(decrypted); // Set decrypted data to state
        } else {
          throw new Error("Encrypted data or IV is missing");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isUser]);

  return { userData, error, loading };
};

export default useUserData;
