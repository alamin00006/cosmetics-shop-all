import { baseApi } from "./baseApi";

const AUTH_URL = "/admin-users";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: userData,
        // body: userData,
      }),
      invalidatesTags: ["user"],
    }),
    getUser: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/me`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getAllUsers: build.query({
      query: (arg) => {
        return {
          url: `${AUTH_URL}`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["user"],
    }),
    getFrontEndUsers: build.query({
      query: (arg) => {
        return {
          url: "/users",
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["all_user"],
    }),
    getFrontEndSingleUser: build.query({
      query: (arg) => {
        return {
          url: "/users/by-id",
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["front_user"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetFrontEndUsersQuery,
  useGetFrontEndSingleUserQuery,
} = authApi;
