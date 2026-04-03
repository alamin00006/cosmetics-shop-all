import {
  BrandListResponse,
  BrandResponse,
  CreateBrandDto,
  UpdateBrandDto,
} from "@/types/brand";
import { baseApi } from "./baseApi";

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =======================
       GET ALL BRANDS
    ======================== */
    getBrands: builder.query<
      BrandListResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      } | void
    >({
      query: (params) => ({
        url: "/brand",
        method: "GET",
        params,
      }),
      providesTags: ["Brand"],
    }),

    /* =======================
       GET BRAND BY ID
    ======================== */
    getBrandById: builder.query<BrandResponse, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    /* =======================
       CREATE BRAND
    ======================== */
    createBrand: builder.mutation<BrandResponse, CreateBrandDto>({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        data: data, // ✅ CORRECT
      }),
      invalidatesTags: ["Brand"],
    }),

    /* =======================
       UPDATE BRAND
    ======================== */
    updateBrand: builder.mutation<
      BrandResponse,
      { id: number; data: UpdateBrandDto }
    >({
      query: ({ id, data }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        data: data, // ✅ MUST be data (NOT body)
      }),
      invalidatesTags: ["Brand"],
    }),

    /* =======================
       DELETE BRAND
    ======================== */
    deleteBrand: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
