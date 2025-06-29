import { baseApi } from "./baseApi";

const AUTH_URL = "/admin-auth";

// Define types for requests/responses
export interface LoginPayload {
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginUserResponse {
  [x: string]: any;
  token: string;
}

interface GetAllUsersParams {
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: any;
}

// interface GetSingleUserParams {
//   id: string;
// }

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation<LoginUserResponse, LoginPayload>({
      query: (userData) => {
        return {
          url: `${AUTH_URL}/login`,
          method: "POST",
          data: userData,
        };
      },
      invalidatesTags: ["auth"],
    }),

    getUser: build.query<UserResponse, void>({
      query: () => ({
        url: `${AUTH_URL}/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAllUsers: build.query<UserResponse[], GetAllUsersParams>({
      query: (arg) => ({
        url: `${AUTH_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
  }),
  overrideExisting: false,
});

export const { useUserLoginMutation, useGetUserQuery, useGetAllUsersQuery } =
  authApi;
