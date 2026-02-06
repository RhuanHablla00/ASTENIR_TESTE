import { useGetInstagramCommentsApiQuery, useGetInstagramPostsApiQuery } from "@/api/instagramApi";
import type { InstagramComment, InstagramPost } from "@/api/instagramApi";

interface UseInstagramPostParams {
  postId: string;

  workspace_id: string;
  connection: string;
  page?: number;
  limit?: number;
  is_reply?: string;
  post_type?: "REEL" | "MEDIA" | "STORY";
}

export const useInstagramPost = ({
  postId,
  workspace_id,
  connection,
  is_reply,
  post_type,
}: UseInstagramPostParams) => {

  const {
    data: postsResponse,
    isLoading: loadingPost,
    isError: isPostError,
    error: errorPost,
  } = useGetInstagramPostsApiQuery(
    {
      connection,
      page: 1,
      limit: 1,
    },
    {
      skip: !workspace_id || !connection,
    }
  );

  const post =
    postsResponse?.results?.find((p) => p.id === postId) || null;

  const {
    data: commentsResponse,
    isLoading: loadingComments,
    error: errorComments,
    refetch: refetchComments,
  } = useGetInstagramCommentsApiQuery(
    {
      workspace_id,
      connection,
      post_external_id: postId,
      is_reply,
      post_type,
      platform: "INSTAGRAM",
    },
    {
      skip: !workspace_id || !connection || !postId,
    }
  );

  return {
    post,
    loadingPost,
    errorPost: isPostError ? errorPost : null,
    comments: (commentsResponse?.results || []) as InstagramComment[],
    loadingComments,
    errorComments,
    refetchComments,
  };
};
