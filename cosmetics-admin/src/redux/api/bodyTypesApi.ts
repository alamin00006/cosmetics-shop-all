
import { baseApi } from "./baseApi";
import { BodyTypeListResponse, BodyTypeResponse, CreateBodyTypeDto, UpdateBodyTypeDto } from "@/types/bodyType";

export const bodyTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =======================
       GET ALL BODY TYPE
    ======================== */
    getBodyTypes: builder.query<
      BodyTypeListResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      } | void
    >({
      query: (params) => ({
        url: "/body-type",
        method: "GET",
        params,
      }),
      providesTags: ["BodyType"],
    }),

    /* =======================
       GET BODY TYPE BY ID
    ======================== */
    getBodyTypeById: builder.query<BodyTypeResponse, number>({
      query: (id) => ({
        url: `/body-type/${id}`,
        method: "GET",
      }),
      providesTags: ["BodyType"],
    }),

    /* =======================
       CREATE Body Type
    ======================== */
    createBodyType: builder.mutation<BodyTypeResponse, CreateBodyTypeDto>({
      query: (data) => ({
        url: "/body-type",
        method: "POST",
        data: data, // ✅ CORRECT
      }),
      invalidatesTags: ["BodyType"],
    }),

    /* =======================
       UPDATE BodyType
    ======================== */
    updateBodyType: builder.mutation<
      BodyTypeResponse,
      { id: number; data: UpdateBodyTypeDto }
    >({
      query: ({ id, data }) => ({
        url: `/body-type/${id}`,
        method: "PATCH",
        data: data, // ✅ MUST be data (NOT body)
      }),
      invalidatesTags: ["BodyType"],
    }),

    /* =======================
       DELETE BodyType
    ======================== */
    deleteBodyType: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/body-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BodyType"],
    }),
  }),
});

export const {
  useGetBodyTypesQuery,
  useGetBodyTypeByIdQuery,
  useCreateBodyTypeMutation,
  useUpdateBodyTypeMutation,
  useDeleteBodyTypeMutation,
} = bodyTypesApi;
