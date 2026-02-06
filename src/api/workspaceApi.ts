import { setWorkspaceMe, Workspace } from "@/stores/workspaceSlice";
import { baseApi } from "./baseApi";

// ------------------------------------------
// INTERFACES DE DADOS
// ------------------------------------------

export interface WorkspaceSettings {
  timezone: string;
  currency: string;
  date_format: string;
  language?: string;
}

export interface WorkspaceResponse {
  id: string;
  owner: string;
  name: string;
  business_email: string;
  industry: string;
  website: string | null;
  entity: string;
  photo_url: string;
  // Localização
  country: string;
  address_line: string;
  city: string;
  administrative_area: string | null;
  postal_code: string | null;
  phone: string | null;
  description: string

  // Configurações Regionais
  settings: WorkspaceSettings;

  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  std_name: string;
  is_active: boolean;
  workspace: string;
  created_at: string;
  updated_at: string;
}
interface EntitiesResponse {
  results: Entity[];
  page: number;
}


// Payload para criar um novo Workspace (Step 1, 2 e 3 consolidados)
export interface CreateWorkspaceRequest {
  name: string;
  description: string;
  business_email: string;
  industry: string;
  website?: string | null;
  country: string;
  address_line: string;
  city: string;
  administrative_area?: string | null;
  postal_code?: string | null;
  phone?: string | null;
  type: "agency" | "franchise" | "default",
  settings: {
    timezone: string;
    currency: string;
    date_format: string;
    language?: string;
  };
}

// Payload para atualizar um Workspace (Campos opcionais)
export interface UpdateWorkspaceRequest {
  id: string; // ID na URL, não no body, mas passado para o hook
  data: {
    name?: string;
    business_email?: string;
    industry?: string;
    website?: string | null;
    country?: string;
    address_line?: string;
    city?: string;
    administrative_area?: string | null;
    postal_code?: string | null;
    phone?: string | null;

    settings?: Partial<WorkspaceSettings>;
  };
}

export interface SimpleMessageResponse {
  message: string;
}

export interface ListWorkspacesResponse {
  results: {
    created_at: string;
    id: string;
    updated_at: string;
    user: string;
    user_id: string;
    workspace: WorkspaceResponse;
    workspace_id: string;
  }[];
  page: number;
}

export type WorkspaceItem = {
  created_at: string;
  id: string;
  updated_at: string;
  user: string;
  user_id: string;
  workspace: Workspace;
  workspace_id: string;
  entity?: {
    id: string;
    name: string;
  }
};
// ------------------------------------------
// API DEFINITION
// ------------------------------------------

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // LIST: Retorna todos os workspaces do usuário logado
    getAllWorkspacesApi: builder.query<{ workspaces: WorkspaceItem[]; page: number }, { page?: number; limit?: number; search?: string } | void>({
      query: (params) => ({
        url: "/workspace",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 50,
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      transformResponse: (response: ListWorkspacesResponse) => ({
        workspaces: response.results,
        page: response.page,
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.workspaces.map((item) => ({ type: "Workspace" as const, id: item.workspace.id })),
            { type: "Workspace", id: "LIST" },
          ]
          : [{ type: "Workspace", id: "LIST" }],
    }),


    // GET ONE: Retorna detalhes de um workspace específico
    getWorkspaceApi: builder.query<WorkspaceResponse, string>({
      query: (workspaceId) => ({
        url: `/workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Workspace", id }],
    }),

    getEntitiesApi: builder.query<EntitiesResponse, string>({
      query: (workspaceId) => ({
        url: `/workspace/${workspaceId}/entities`,
        method: "GET",
      }),
    }),

    getWorkspaceMeApi: builder.query<WorkspaceResponse, string>({
      query: (workspaceId) => ({
        url: `/workspace/${workspaceId}/me`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setWorkspaceMe(data));
      },
    }),

    // CREATE: Cria o workspace com os dados do Wizard
    createWorkspaceApi: builder.mutation<WorkspaceResponse, CreateWorkspaceRequest>({
      query: (body) => ({
        url: "/workspace",
        method: "POST",
        body,
      }),
      // Invalida a lista para forçar um refresh na UI
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),

    // UPDATE: Atualiza dados
    updateWorkspaceApi: builder.mutation<WorkspaceResponse, UpdateWorkspaceRequest>({
      query: ({ id, data }) => ({
        url: `/workspace/${id}`,
        method: "PUT", // ou PATCH, dependendo do seu backend
        body: data,
      }),
    }),

    // DELETE: Remove um workspace
    deleteWorkspaceApi: builder.mutation<SimpleMessageResponse, string>({
      query: (workspaceId) => ({
        url: `/workspace/${workspaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),

    // Exemplo: Switch Workspace (se o backend precisar saber qual está ativo na sessão)
    setActiveWorkspaceApi: builder.mutation<SimpleMessageResponse, string>({
      query: (workspaceId) => ({
        url: `/workspace/${workspaceId}/activate`,
        method: 'POST'
      })
    })

  }),
  overrideExisting: false,
});

export const {
  useLazyGetWorkspaceApiQuery,
  useLazyGetWorkspaceMeApiQuery,
  useGetEntitiesApiQuery,
  useGetAllWorkspacesApiQuery,
  useGetWorkspaceApiQuery,
  useGetWorkspaceMeApiQuery,
  useCreateWorkspaceApiMutation,
  useUpdateWorkspaceApiMutation,
  useDeleteWorkspaceApiMutation,
  useSetActiveWorkspaceApiMutation
} = workspaceApi;