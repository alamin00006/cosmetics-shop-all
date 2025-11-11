import { baseApi } from "./baseApi";

const PROFIT_URL = "/profit-count";

const profitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfits: build.query({
      query: (arg) => ({
        url: `${PROFIT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["profits"],
    }),

    getProfitsByUserId: build.query({
      query: (userId) => ({
        url: `${PROFIT_URL}/${userId}/investment`,
        method: "GET",
      }),
      providesTags: ["profits"],
    }),

    getProfitsByProjectId: build.query({
      query: (arg) => ({
        url: `${PROFIT_URL}/project-profits`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["profits"],
    }),

    updateProfit: build.mutation({
      query: ({ profitId, profitData }) => {
        return {
          url: `${PROFIT_URL}/${profitId}`,
          method: "PATCH",
          body: profitData,
        };
      },
      invalidatesTags: ["profits"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfitsQuery,
  useGetProfitsByProjectIdQuery,
  useUpdateProfitMutation,
  useGetProfitsByUserIdQuery,
} = profitApi;
