import { baseApi } from "./baseApi";

const WaitingList_URL = "/join-waiting";

const joinWaitingListApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWaitingListByCompany: build.query({
      query: (arg) => ({
        url: `${WaitingList_URL}/by-company`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["waiting-list"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetWaitingListByCompanyQuery } = joinWaitingListApi;
