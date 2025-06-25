import { baseApi } from "./baseApi";

const INVESTMENT_URL = "/investment";

const investmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInvestments: build.query({
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
  useGetInvestmentsQuery,
  useGetSingleInvestmentByUserORInvestIdQuery,
} = investmentApi;

export default investmentApi;
