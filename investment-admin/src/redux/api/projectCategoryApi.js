import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectCategories: build.query({
      query: (arg) => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["category"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProjectCategoriesQuery } = categoryApi;
