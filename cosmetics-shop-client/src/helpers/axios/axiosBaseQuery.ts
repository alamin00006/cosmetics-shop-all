import { instance as axiosInstance } from "./axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: any;
  params?: Record<string, any>;
  contentType?: string;
};

type AxiosBaseQueryResult<T = any> =
  | { data: T }
  | {
      error: {
        status?: number;
        data: any;
      };
    };

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = { baseUrl: "" }) =>
  async <T = any>({
    url,
    method,
    data,
    params,
    contentType,
  }: AxiosBaseQueryArgs): Promise<AxiosBaseQueryResult<T>> => {
    try {
      const result = await axiosInstance<T>({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
        withCredentials: true,
      });

      // ✅ RETURN only result.data
      return { data: result.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
