import { HeroBannerType } from "@/types/heroBannerType";
import { baseApi } from "./baseApi";
import { TagDescription } from "@reduxjs/toolkit/query";
// Adjust the path and name based on your actual type

const BANNER_URL = "/market-banner";

const heroBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllHeroBanners: build.query<HeroBannerType[], void>({
      query: () => ({
        url: BANNER_URL,
        method: "GET",
      }),

      providesTags: [{ type: "heroBanner" } as TagDescription<"heroBanner">],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllHeroBannersQuery } = heroBannerApi;
