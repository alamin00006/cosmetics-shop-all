import { baseApi } from "./baseApi";

const NOMINEE_URL = "/nominee";

const nomineeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNomineeByUserId: build.query({
      query: (arg) => ({
        url: `${NOMINEE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["nominee"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNomineeByUserIdQuery } = nomineeApi;
