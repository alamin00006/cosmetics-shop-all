import { baseApi } from "@/redux/api/baseApi";
import {
  CreateUserDto,
  GetUsersQuery,
  Paginated,
  UpdateUserDto,
  UserDetails,
  UserListItem,
} from "@/types/user";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET /users?page=&limit=&search=&sortBy=&sortOrder=
    getUsers: build.query<Paginated<UserListItem>, GetUsersQuery | void>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "user" as const, id: "LIST" },
              ...result.data.map((u) => ({ type: "user" as const, id: u.id })),
            ]
          : [{ type: "user" as const, id: "LIST" }],
    }),

    // GET /users/:id
    getUserById: build.query<{ data: UserDetails } | UserDetails, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "user", id }],
    }),

    // POST /users
    createUser: build.mutation<any, CreateUserDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),

    // PUT /users/:id
    updateUser: build.mutation<any, { id: string; data: UpdateUserDto }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "user", id: "LIST" },
        { type: "user", id: arg.id },
      ],
    }),

    // DELETE /users/:id
    deleteUser: build.mutation<any, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "user", id: "LIST" },
        { type: "user", id },
      ],
    }),

    // POST /users/:id/assign-role  body: { roleId }
    assignRoleToUser: build.mutation<any, { userId: string; roleId: string }>({
      query: ({ userId, roleId }) => ({
        url: `/users/${userId}/assign-role`,
        method: "POST",
        data: { roleId },
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "user", id: arg.userId },
        { type: "user", id: "LIST" },
      ],
    }),

    // DELETE /users/:id/remove-role/:roleId
    removeRoleFromUser: build.mutation<any, { userId: string; roleId: string }>(
      {
        query: ({ userId, roleId }) => ({
          url: `/users/${userId}/remove-role/${roleId}`,
          method: "DELETE",
        }),
        invalidatesTags: (_res, _err, arg) => [
          { type: "user", id: arg.userId },
          { type: "user", id: "LIST" },
        ],
      },
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRoleToUserMutation,
  useRemoveRoleFromUserMutation,
} = usersApi;
