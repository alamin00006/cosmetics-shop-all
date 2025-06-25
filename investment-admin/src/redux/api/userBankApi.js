import { baseApi } from "./baseApi";

const BANK_URL = "/bank-account";

const bankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBankAccountByUserId: build.query({
      query: (arg) => ({
        url: `${BANK_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["bank"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBankAccountByUserIdQuery } = bankApi;
