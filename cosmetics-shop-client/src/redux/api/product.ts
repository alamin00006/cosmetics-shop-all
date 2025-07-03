import { Product } from "@/types/product";
import { baseApi } from "./baseApi";

import { TagDescription } from "@reduxjs/toolkit/query";

const PROJECT_URL = "/products";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      Product[],
      { [key: string]: string | number | undefined }
    >({
      query: (arg) => ({
        url: `${PROJECT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [{ type: "products" } as TagDescription<"products">],
    }),
    getProductsById: build.query<Product, string>({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "products" } as TagDescription<"products">],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductsByIdQuery } = projectApi;

export default projectApi;
