import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { authKey } from "@/constants/authKey";
import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";
import { getNewAccessToken } from "../services/auth.service";

// Custom response shape
interface APIResponse<T = any> {
  data: T;
}

const instance: AxiosInstance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;
// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — just return response
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const config = error.config as AxiosRequestConfig & { sent?: boolean };

    if (error?.response?.status === 403 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers = {
        ...config.headers,
        Authorization: accessToken,
      };
      setToLocalStorage(authKey, accessToken);
      return instance(config);
    }

    return Promise.reject(error);
  },
);

export const request = async <T = any>(
  config: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.request<T>(config);
  return { data: (response.data as any)?.data };
};

export { instance };
