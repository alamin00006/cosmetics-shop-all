import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/config/envConfig";

import { createApi } from "@reduxjs/toolkit/query/react";

type TagType = "user" | "auth";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  tagTypes: ["user", "auth"] as TagType[],
  endpoints: () => ({}),
});
