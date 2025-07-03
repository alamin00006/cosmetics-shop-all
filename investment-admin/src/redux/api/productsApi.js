import { baseApi } from "./baseApi";

const PROJECT_URL = "/products";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (arg) => ({
        url: `${PROJECT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["products"],
    }),
    getProductsById: build.query({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductsByIdQuery } = projectApi;

export default projectApi;
