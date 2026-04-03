 
import { CreateModelDto, ModelListResponse, ModelResponse, UpdateModelDto } from "@/types/model.types";
import { baseApi } from "./baseApi";

export const modelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<ModelListResponse, any>({
      query: (params) => ({
        url: "/model",
        method: "GET",
        params,
      }),
      providesTags: ["Model"],
    }),

    createModel: builder.mutation<ModelResponse, CreateModelDto>({
      query: (data) => ({
        url: "/model",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Model"],
    }),

    updateModel: builder.mutation<
      ModelResponse,
      { id: number; data: UpdateModelDto }
    >({
      query: ({ id, data }) => ({
        url: `/model/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Model"],
    }),

    deleteModel: builder.mutation<any, number>({
      query: (id) => ({
        url: `/model/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Model"],
    }),
  }),
});

export const {
  useGetModelsQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = modelsApi;
