import { baseApi } from "./baseApi";

const BANK_URL = "/company-bank";

const bankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBankAccountByUserId: build.query({
      query: (arg) => ({
        url: `/bank-account`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["company-bank"],
    }),

    getCompanyBankByCompanyId: build.query({
      query: (arg) => ({
        url: `${BANK_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["company-bank"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBankAccountByUserIdQuery,
  useGetCompanyBankByCompanyIdQuery,
} = bankApi;
