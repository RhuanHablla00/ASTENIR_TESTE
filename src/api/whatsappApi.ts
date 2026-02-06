import { baseApi } from "@/api/baseApi";

export interface TemplateExampleParam {
  example: string;
  param_name: string;
}

export interface TemplateComponentExample {
  body_text_named_params?: TemplateExampleParam[];
}

export interface TemplateComponent {
  type: "BODY" | "HEADER" | "FOOTER" | "BUTTONS";
  text?: string;
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
  example?: TemplateComponentExample;
}

export interface WhatsAppTemplateData {
  name: string;
  language: string;
  category: "UTILITY" | "MARKETING" | "AUTHENTICATION";
  parameter_format: "named" | "positional";
  components: TemplateComponent[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  category: string;
  language: string;
  components: any[];
}

interface GetTemplatesParams {
  connection_id: string;
}

interface CreateTemplatePayload {
  connection_id: string;
  name: string;
  category: string;
  language: string;
  components: any[];
  parameter_format: "named" | "positional";
}

export interface GetTemplatesResponse {
  results: WhatsAppTemplate[];
  page: number;
}

interface GetWhatsappTemplateByIdParams {
  connection_id: string;
  template_id: string;
}

export interface GetWhatsappTemplateByIdResponse {
  result: WhatsAppTemplate;
  data: WhatsAppTemplateData;
}

interface RefreshTemplateParams {
  connection_id: string;
  template_id: string;
}

interface SendWhatsappMessageParams {
  connection_id: string;
}

interface SendWhatsappMessagePayload {
  phone: string;
  type: "text";
  content: {
    preview_url?: boolean;
    body: string;
  };
}

export interface SendWhatsappMessageResponse {
  success: boolean;
  message_id?: string;
}

export interface SendWhatsappTemplateDTO {
  connection_id: string;
  template_id: string;
  lead_id?: string;
  phone?: string;
  variables?: Record<string, string>;
}

export const whatsappApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWhatsappTemplates: builder.query<
      GetTemplatesResponse,
      GetTemplatesParams
    >({
      query: ({ connection_id }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/templates`,
        method: "GET",
      }),
      providesTags: ["WhatsappTemplates"] as any,
    }),

    getWhatsappTemplateById: builder.query<
      GetWhatsappTemplateByIdResponse,
      GetWhatsappTemplateByIdParams
    >({
      query: ({ connection_id, template_id }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/templates/${template_id}`,
        method: "GET",
      }),
    }),

    createWhatsappTemplate: builder.mutation<
      WhatsAppTemplate,
      CreateTemplatePayload
    >({
      query: ({ connection_id, ...body }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/templates`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["WhatsappTemplates"] as any,
    }),

    refreshWhatsappTemplate: builder.mutation<
      { success: boolean },
      RefreshTemplateParams
    >({
      query: ({ connection_id, template_id }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/templates/${template_id}/refresh`,
        method: "PUT",
      }),
      invalidatesTags: ["WhatsappTemplates"] as any,
    }),

    sendWhatsappTemplate: builder.mutation<
      { success: boolean; message_id?: string },
      SendWhatsappTemplateDTO
    >({
      query: ({ connection_id, ...body }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/templates/send`,
        method: "POST",
        body,
      }),
    }),

    sendWhatsappMessage: builder.mutation<
      SendWhatsappMessageResponse,
      SendWhatsappMessageParams & SendWhatsappMessagePayload
    >({
      query: ({ connection_id, ...body }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/whatsapp-messaging/messages/send`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWhatsappTemplatesQuery,
  useGetWhatsappTemplateByIdQuery,
  useCreateWhatsappTemplateMutation,
  useRefreshWhatsappTemplateMutation,
  useSendWhatsappTemplateMutation,
  useSendWhatsappMessageMutation,
} = whatsappApi;
