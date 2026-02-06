import { baseApi } from "./baseApi";

export interface CreateMetaConnectionResponse {
  id: string;
  workspace: string;
  name: string;
  std_name: string;
  type: string;
  credential: string;
  user_credential: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWebsiteConnectionResponse {
  id: string;
  workspace: string;
  name: string;
  std_name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWebsiteConnectionPayload {
  name: string;
  website: string;
}

export interface CreateWebsiteConnectionArgs {
  body: CreateWebsiteConnectionPayload;
}

export interface MetaPageCredential {
  id: string;
  name: string;
}

export interface MetaUserCredential {
  id: string;
  type?: string;
}

export interface CreateMetaConnectionPayload {
  pages?: MetaPageCredential[];
  token: string;
}

interface CreateMetaConnectionArgs {
  body: CreateMetaConnectionPayload;
}

export interface Connection {
  scope: UseCaseType;
  id: string;
  name: string;
  std_name: string;
  created_at: string;
  updated_at: string;
  workspace: string;
  additional_info: {
    ig_user_id: string;
    txt: string;
    hostname: string
    ig_user_name: string;
    page_id: string;
    page_name: string;
    scope: UseCaseType;
    page_picture: string
    ig_profile_picture: string
  };
}

export interface ConnectionsResponse {
  results: Connection[];
}
export interface WebhookItem {
  uuid: string;
  url: string;
  token?: string;
}

export interface ConnectionIdResponse {
  id: string;
  workspace: string;
  name: string;
  std_name: string;
  type: string;
  status: string;
  credential: string;
  user_credential: string;
  additional_info: {
    ig_user_id: string;
    ig_user_name: string;
    hostname: string;
    txt: string;
    page_id: string;
    page_name: string;
    scope: string;
    page_picture: string;
    ig_profile_picture: string;
  };
  webhooks: WebhookItem[]
  created_at: string;
  updated_at: string;
}


export type UseCaseType =
  | "CATALOG_MANAGEMENT"
  | "MESSENGER_CUSTOMER_MESSAGING"
  | "FACEBOOK_ADS"
  | "FUNDRAISING_CAMPAIGNS"
  | "INSTAGRAM"
  | "WHATSAPP_MESSAGING"
  | "LIVE_VIDEO_API"
  | "OEMBED_EMBEDS"
  | "WEBSITE"
  | "MARKETING_ADS_MANAGEMENT"
  | "MARKETING_ADS_MEASUREMENT"
  | "MARKETING_LEAD_ADS"
  | "APP_ADS_CAMPAIGNS"
  | "THREADS_API"
  | "META_USER";


export const connectionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFanpageAndInstagramConnectionApi: builder.mutation<CreateMetaConnectionResponse, CreateMetaConnectionArgs>({
      query: ({ body }) => ({
        useworkspace: true,
        url: `/connection/meta-fanpage-and-instagram`,
        method: "POST",
        body,
      }),
    }),

    createWhatsAppConnectionApi: builder.mutation<CreateMetaConnectionResponse, CreateMetaConnectionArgs>({
      query: ({ body }) => ({
        useworkspace: true,
        url: `/connection/whatsapp-messaging`,
        method: "POST",
        body,
      }),
    }),

    createWebsiteConnectionApi: builder.mutation<CreateWebsiteConnectionResponse, CreateWebsiteConnectionArgs>({
      query: ({ body }) => ({
        useworkspace: true,
        url: `/connection/website`,
        method: "POST",
        body,
      }),
    }),

    authenticateMetaApi: builder.mutation<any, { access_token?: string; scope?: string, code?: string }>({
      query: ({ access_token, scope, code }) => ({
        useworkspace: true,
        url: `/meta/auth`,
        method: "POST",
        body: {
          access_token,
          scope,
          code
        },
      }),
    }),


    getAllConnections: builder.query<ConnectionsResponse, { scope?: UseCaseType, search?: string, workspace?: string }>({
      query: ({ scope, search }) => ({
        useworkspace: true,
        url: "/connection",
        method: "GET",
        params: { scope, search, limit: 50 },
      }),
    }),

    getConnectionId: builder.query<ConnectionIdResponse, string>({
      query: (connectionId) => ({
        useworkspace: true,
        url: `/connection/${connectionId}`,
        method: "GET",
      }),
    }),

    deleteConnectionId: builder.mutation<string, string>({
      query: (connectionId) => ({
        useworkspace: true,
        url: `/connection/${connectionId}`,
        method: "DELETE",
      }),
    }),

    updateWebhook: builder.mutation<any, { connection_id: string; webhook_id?: string; body: { url: string; token?: string; }; }>({
      query: ({ connection_id, webhook_id, body }) => ({
        useworkspace: true,
        url: webhook_id !== undefined
          ? `/connection/${connection_id}/webhook/${webhook_id}`
          : `/connection/${connection_id}/webhook`,
        method: "PUT",
        body,
      }),
    }),


    deleteWebhook: builder.mutation<any, { connection_id: string; webhook_id: string; }>({
      query: ({ connection_id, webhook_id }) => ({
        useworkspace: true,
        url: `/connection/${connection_id}/webhook/${webhook_id}`,
        method: "DELETE",
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetConnectionIdQuery,
  useDeleteConnectionIdMutation,
  useUpdateWebhookMutation,
  useDeleteWebhookMutation,
  useCreateFanpageAndInstagramConnectionApiMutation,
  useCreateWhatsAppConnectionApiMutation,
  useCreateWebsiteConnectionApiMutation,
  useAuthenticateMetaApiMutation,
  useGetAllConnectionsQuery,
} = connectionsApi;