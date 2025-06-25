import { baseApi } from "./baseApi";

const AUTH_URL = "/extra-service";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExtraServices: build.query({
      query: () => {
        return {
          url: AUTH_URL,
          method: "GET",
        };
      },
      providesTags: ["extraService"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllExtraServicesQuery } = serviceApi;
