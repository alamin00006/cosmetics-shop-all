import { baseApi } from "./baseApi";

const CATEGORY_URL = "/";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductMainCategories: build.query({
      query: (arg) => ({
        url: `${CATEGORY_URL}main-categories`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["main-categories"],
    }),
    getProductCategories: build.query({
      query: (arg) => ({
        url: `${CATEGORY_URL}category`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["category"],
    }),
    getProductSubCategories: build.query({
      query: (arg) => ({
        url: `${CATEGORY_URL}subcategories`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["subcategories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductMainCategoriesQuery,
  useGetProductCategoriesQuery,
  useGetProductSubCategoriesQuery,
} = categoryApi;
