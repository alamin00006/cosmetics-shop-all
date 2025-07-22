import { baseApi } from "./baseApi";

const INVESTMENT_URL = "/orders";

const investmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: (arg) => ({
        url: `${INVESTMENT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["investments"],
    }),
    getSingleInvestmentByUserORInvestId: build.query({
      query: (arg) => ({
        url: `${INVESTMENT_URL}/single-investment`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["investments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetSingleInvestmentByUserORInvestIdQuery,
} = investmentApi;

export default investmentApi;
