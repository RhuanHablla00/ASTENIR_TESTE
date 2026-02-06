import { baseApi } from "./baseApi";

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface WorkspaceUser {
  id: string;
  role?: string;
  position?: string;
  status: "active" | "canceled" | "accepted";
  created_at: string;
  user: UserDetail; 
}

export interface UsersResponse {
  results: WorkspaceUser[];
  total?: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaceUsers: builder.query<UsersResponse, { workspace: string; search?: string }>({
      query: ({ workspace, search }) => ({
        useworkspace: true,
        url: "/users", 
        method: "GET",
        params: { search, workspace },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWorkspaceUsersQuery,
} = userApi;