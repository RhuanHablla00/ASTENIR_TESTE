import { baseApi } from "./baseApi";
export interface InstagramComment {
  id: string;
  text: string;
  sender_user_name: string;
  created_at: string;
  is_reply: boolean;
}
export interface InstagramCommentsResponse {
  results: InstagramComment[];
  page: number;
}
export interface InstagramCommentsParams {
  workspace_id: string;
  connection: string;
  page?: number;
  limit?: number;
  post_external_id?: string;
  is_reply?: string;
  post_type?: 'REEL' | 'MEDIA' | 'STORY';
  platform?: 'INSTAGRAM';
}

export interface InstagramPost {
  id: string
  connection: string
  workspace: string
  external_id: string

  title: string
  description: string
  type: 'image' | 'video' | 'carousel'
  media_url: string
  thumbail_url?: string
  post_url: string

  ref_date: string
  created_at: string
  updated_at: string

  metrics: {
    likes: number
    dislikes: number
    views: number
    comments: number
  }

  plataform: 'meta'
  sub_plataform: 'instagram'
}


export interface InstagramPostsResponse {
  paging: any;
  results: InstagramPost[]
  page: number
}

export interface InstagramPostsParams {
  connection: string
  page?: number
  limit?: number
  platform?: string
  sub_platform?: string
  start_date?: string
  end_date?: string
  field_date?: string
  order?: string
  direction_order?: 'asc' | 'desc'
}


export const instagramApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstagramCommentsApi: builder.query<
      InstagramCommentsResponse,
      InstagramCommentsParams
    >({
      query: ({ workspace_id, ...params }) => ({
        useworkspace: true,
        url: `/messages`,
        method: "GET",
        params: {
          ...params,
          platform: 'INSTAGRAM',
        },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { workspace_id, connection, post_external_id, is_reply } = queryArgs;
        return `${endpointName}-${workspace_id}-${connection}-${post_external_id}-${is_reply}`;
      },

      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    createInstagramComment: builder.mutation<
      void,
      {
        workspace_id: string;
        connection_id: string;
        reference_id: string;
        message: string;
      }
    >({
      query: ({ connection_id, reference_id, message }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/fanpage-instagram-comments`,
        method: "POST",
        params: {
          reference_id,
        },
        body: {
          message,
        },
      }),
    }),


    updateInstagramComment: builder.mutation<
      void,
      {
        workspace_id: string;
        connection_id: string;
        comment_id: string;
        message: string;
      }
    >({
      query: ({ connection_id, comment_id, message }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/fanpage-instagram-comments/${comment_id}`,
        method: "PUT",
        body: {
          message,
        },
      }),
    }),

    deleteInstagramComment: builder.mutation<
      void,
      {
        connection_id: string;
        comment_id: string;
      }
    >({
      query: ({ connection_id, comment_id }) => ({
        useworkspace: true,
        url: `/meta/connection/${connection_id}/fanpage-instagram-comments/${comment_id}`,
        method: "DELETE",
      }),
    }),

    createInstagramPost: builder.mutation<void, FormData>({
      query: (formData) => ({
        useworkspace: true,
        url: `/meta/connection/${formData.get("connection_id")}/fanpage-instagram-media`,
        method: "POST",
        body: formData,
      }),
    }),

    getInstagramPostsApi: builder.query<
      InstagramPostsResponse,
      InstagramPostsParams
    >({
      query: ({ connection, ...params }) => ({
        useworkspace: true,
        url: '/posts',
        method: 'GET',
        params: {
          connection,
          ...params,
        },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.connection}`
      },

      merge: (currentCache, newItems) => {
        if (!currentCache.results) {
          currentCache.results = []
        }

        currentCache.results.push(...newItems.results)
        currentCache.paging = newItems.paging
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.connection !== previousArg?.connection
        )
      },
    }),



  }),
  overrideExisting: false,
});

export const {
  useGetInstagramCommentsApiQuery,
  useCreateInstagramCommentMutation,
  useUpdateInstagramCommentMutation,
  useDeleteInstagramCommentMutation,
  useCreateInstagramPostMutation,
  useGetInstagramPostsApiQuery,
} = instagramApi;
