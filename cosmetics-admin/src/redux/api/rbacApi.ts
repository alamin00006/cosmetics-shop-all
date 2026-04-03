// src/redux/api/rbacApi.ts
import { baseApi } from "./baseApi";

export type PermissionRow = {
  id: number;
  key: string;
  name: string;
  module?: string | null;
  group?: string | null;
  description?: string | null;
  isSystem?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PermissionListResponse = {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: PermissionRow[];
};

export type PermissionQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "key" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  module?: string;
  group?: string;
};

export type CreatePermissionDto = {
  key: string;
  name: string;
  module?: string;
  group?: string;
  description?: string;
};

export type UpdatePermissionDto = Partial<CreatePermissionDto>;

export type GroupedPermissions = Record<string, PermissionRow[]>;

export const rbacApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // -----------------------
    // Permissions CRUD
    // -----------------------
    getPermissions: build.query<PermissionListResponse, PermissionQuery | void>(
      {
        query: (params) => ({
          url: "/permissions",
          method: "GET",
          params,
        }),
        providesTags: (res) =>
          res?.data
            ? [
                ...res.data.map((p) => ({
                  type: "Permission" as const,
                  id: p.id,
                })),
                { type: "Permission" as const, id: "LIST" },
              ]
            : [{ type: "Permission" as const, id: "LIST" }],
      },
    ),

    getPermission: build.query<PermissionRow, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Permission" as const, id }],
    }),

    createPermission: build.mutation<PermissionRow, CreatePermissionDto>({
      query: (body) => ({
        url: "/permissions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Permission" as const, id: "LIST" }],
    }),

    updatePermission: build.mutation<
      PermissionRow,
      { id: number; body: UpdatePermissionDto }
    >({
      query: ({ id, body }) => ({
        url: `/permissions/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "Permission" as const, id: arg.id },
        { type: "Permission" as const, id: "LIST" },
      ],
    }),

    deletePermission: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Permission" as const, id },
        { type: "Permission" as const, id: "LIST" },
      ],
    }),

    getPermissionsGrouped: build.query<GroupedPermissions, void>({
      query: () => ({
        url: "/permissions/grouped",
        method: "GET",
      }),
      providesTags: [{ type: "Permission" as const, id: "GROUPED" }],
    }),

    // -----------------------
    // Role -> Permissions (PUT replace)
    // -----------------------
    setRolePermissions: build.mutation<
      any,
      { roleId: number; permissionIds: number[] }
    >({
      query: ({ roleId, permissionIds }) => ({
        url: `/roles/${roleId}/permissions`,
        method: "PUT",
        data: {
          permissions: permissionIds.map((permissionId) => ({
            permissionId,
            allowed: true,
          })),
        },
      }),
      //  role details should refetch after updating permissions
      invalidatesTags: (_res, _err, arg) => [
        { type: "Role" as const, id: arg.roleId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPermissionsQuery,
  useGetPermissionQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsGroupedQuery,
  useSetRolePermissionsMutation,
} = rbacApi;
