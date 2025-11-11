import { baseApi } from "./baseApi";

const BRAND_URL = "/brands";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: (arg) => ({
        url: `${BRAND_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["brands"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBrandsQuery } = brandApi;
