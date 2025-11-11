import { baseApi } from "./baseApi";

const AUTH_URL = "/company";

const companyAuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    companyLogin: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: userData,
        // body: userData,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompanies: build.query({
      query: () => {
        return {
          url: AUTH_URL,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getAllCompaniesForm: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/company-form`,
          method: "GET",
        };
      },
      providesTags: ["companyForm"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCompanyLoginMutation,
  useGetAllCompaniesQuery,
  useGetAllCompaniesFormQuery,
} = companyAuthApi;
