import { baseApi } from "./baseApi";

export interface LeadPhone {
  phone: string;
  is_whatsapp?: boolean;
}

export interface LeadEmail {
  email: string;
  subscribed?: boolean;
}

export interface CreateLeadPayload {
  name: string;
  phones: LeadPhone[];
  emails: LeadEmail[];
}

export interface Lead {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  phones?: LeadPhone[];
  emails?: LeadEmail[];
}

export interface LeadsResponse {
  results: Lead[];
  total?: number;
}

export interface UpdateLeadRequest {
  id: string;
  data: Partial<CreateLeadPayload> & {
    status?: string;
    // outros campos atualizáveis
  };
}

export const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<
      LeadsResponse,
      { workspace: string; search?: string }
    >({
      query: ({ workspace, search }) => ({
        useworkspace: true,
        url: "/leads",
        method: "GET",
        params: { search, workspace },
      }),
    }),
    createLead: builder.mutation<
      Lead,
      { workspace: string; data: CreateLeadPayload }
    >({
      query: ({ workspace, data }) => ({
        useworkspace: true,
        url: `/leads`,
        method: "POST",
        params: { workspace },
        body: data,
      }),
    }),
    updateLeadApi: builder.mutation<
      Lead,
      { workspace: string; id: string; data: Partial<CreateLeadPayload> }
    >({
      query: ({ workspace, id, data }) => ({
        useworkspace: true,
        url: `/leads/${id}`,
        method: "PUT",
        params: { workspace },
        body: data,
      }),
    }),
    deleteLeadApi: builder.mutation<void, { workspace: string; id: string }>({
      query: ({ id }) => ({
        useworkspace: true,
        url: `/leads/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadApiMutation,
  useDeleteLeadApiMutation
} = leadApi;