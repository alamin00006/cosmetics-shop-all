import { baseApi } from "./baseApi";

const AUTH_URL = "/market-banner";

const marketBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMarketBanners: build.query({
      query: () => {
        return {
          url: AUTH_URL,
          method: "GET",
        };
      },
      providesTags: ["marketBanner"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllMarketBannersQuery } = marketBannerApi;
