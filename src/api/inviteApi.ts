import { baseApi } from "./baseApi";

export interface UserInvite {
  email: string;
  name: string;
}

export interface WorkspaceInvite {
  name: string;
}

export interface Invite {
  id: string;
  email: string;
  workspace_id?: string;
  user: UserInvite;
  workspace: WorkspaceInvite;
  status: "canceled" | "accepted" | "active";
  created_at: string;
}

export interface InvitesResponse {
  results: Invite[];
}

export const inviteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /v1/workspace/:workspace_id/invite -> Ver convites enviados
    getWorkspaceInvites: builder.query<InvitesResponse, { workspaceId: string }>({
      query: ({ workspaceId }) => ({
        url: `/workspace/${workspaceId}/invite`,
        method: "GET",
      }),
    }),

    // POST /v1/workspace/:workspace_id/invite { email } -> Enviar convite
    sendInvite: builder.mutation<void, { workspaceId: string; email: string, entities?: string[] }>({
      query: ({ workspaceId, email, entities }) => ({
        url: `/workspace/${workspaceId}/invite`,
        method: "POST",
        body: { email, entities },
      }),
    }),

    // PATCH /v1/workspace/:workspace_id/invite/:id -> Revogar convite
    revokeInvite: builder.mutation<void, { workspaceId: string; inviteId: string }>({
      query: ({ workspaceId, inviteId }) => ({
        url: `/workspace/${workspaceId}/invite/${inviteId}`,
        method: "PATCH",
      }),
    }),

    // GET /v1/workspace/invite -> Ver convites que EU recebi
    getMyInvites: builder.query<InvitesResponse, void>({
      query: () => ({
        url: `/workspace/invite`,
        method: "GET",
      }),
    }),

    // POST /v1/workspace/invite/:id -> Aceitar convite
    acceptInvite: builder.mutation<void, { inviteId: string }>({
      query: ({ inviteId }) => ({
        url: `/workspace/invite/${inviteId}`,
        method: "POST",
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetWorkspaceInvitesQuery,
  useSendInviteMutation,
  useRevokeInviteMutation,
  useGetMyInvitesQuery,
  useAcceptInviteMutation,
} = inviteApi;