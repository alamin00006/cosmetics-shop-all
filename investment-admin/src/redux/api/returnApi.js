import { baseApi } from "./baseApi";

const RETURN_URL = "/return";

const returnApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReturns: build.query({
      query: (arg) => ({
        url: `${RETURN_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["returns"],
    }),
    updateReturn: build.mutation({
      query: (data) => {
        return {
          url: `${RETURN_URL}/${data?.returnId}`,
          method: "PATCH",
          data: data?.body,
        };
      },
      invalidatesTags: ["returns"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetReturnsQuery, useUpdateReturnMutation } = returnApi;
