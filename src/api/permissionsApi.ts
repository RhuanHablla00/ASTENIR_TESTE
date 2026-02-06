import { baseApi } from "./baseApi";

export type WorkspacePermissionConfig = {
  read?: boolean;
  write?: boolean;
  delete?: boolean;
  [key: string]: any;
};

export type PermissionsMap = Record<string, WorkspacePermissionConfig>;
export type AllowListMap = Record<string, string[]>;

export interface CreatePermissionDTO {
  name: string;
  description?: string;
  permissions?: PermissionsMap;
  allow_list?: AllowListMap;
}

export interface UpdatePermissionDTO {
  name?: string;
  description?: string;
  permissions?: PermissionsMap;
  allow_list?: AllowListMap;
}

export interface UpdateWsUserPermissionDTO {
  permissions?: PermissionsMap;
  allow_list?: AllowListMap;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  permissions?: PermissionsMap;
  created_at: string;
  updated_at?: string;
}

export interface PermissionsResponse {
  results: Permission[];
  total?: number;
}

export const permissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<
      PermissionsResponse,
      { workspaceId: string }
    >({
      query: ({ workspaceId }) => ({
        useworkspace: true,
        url: `/permissions`,
        method: "GET",
      }),
    }),

    getPermissionById: builder.query<
      Permission,
      { workspaceId: string; id: string }
    >({
      query: ({ workspaceId, id }) => ({
        useworkspace: true,
        url: `/permissions/${id}`,
        method: "GET",
      }),
    }),

    createPermission: builder.mutation<
      Permission,
      { workspaceId: string; body: CreatePermissionDTO }
    >({
      query: ({ workspaceId, body }) => ({
        useworkspace: true,
        url: `/permissions`,
        method: "POST",
        body,
      }),
    }),

    updatePermission: builder.mutation<
      Permission,
      { workspaceId: string; id: string; body: UpdatePermissionDTO }
    >({
      query: ({ workspaceId, id, body }) => ({
        useworkspace: true,
        url: `/permissions/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
} = permissionsApi;
