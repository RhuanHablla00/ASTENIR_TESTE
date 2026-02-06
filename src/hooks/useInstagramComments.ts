import { useParams } from "react-router-dom";
import {
  useGetInstagramCommentsApiQuery,
  useCreateInstagramCommentMutation,
  useUpdateInstagramCommentMutation,
  useDeleteInstagramCommentMutation,
} from "@/api/instagramApi";
import { useState } from "react";

interface UseInstagramCommentsListProps {
  connection_id: string;
  limit?: number;
  post_external_id?: string;
  is_reply?: string;
}

export const useInstagramCommentsList = ({
  connection_id,
  limit = 20,
  post_external_id,
  is_reply,
}: UseInstagramCommentsListProps) => {
  const { workspace_id } = useParams<{ workspace_id: string }>();

  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetInstagramCommentsApiQuery(
    {
      workspace_id: workspace_id || "",
      connection: connection_id,
      page,
      limit,
      post_external_id,
      is_reply,
    },
    {
      skip: !workspace_id || !connection_id,
      refetchOnMountOrArgChange: true
    }
  );

  const [createInstagramComment, { isLoading: creatingComment }] =
    useCreateInstagramCommentMutation();

  const [updateInstagramComment, { isLoading: replyingComment }] =
    useUpdateInstagramCommentMutation();

  const [deleteInstagramComment, { isLoading: deletingComment }] =
    useDeleteInstagramCommentMutation();

  const loadMore = () => {
    if (!isFetching) {
      setPage((p) => p + 1);
    }
  };


  const createComment = async (text: string) => {
    if (!post_external_id || !text || !workspace_id) return;

    await createInstagramComment({
      workspace_id,
      connection_id,
      reference_id: post_external_id,
      message: text,
    }).unwrap();

    refetch();
  };


  const replyComment = async (commentId: string, text: string) => {
    if (!commentId || !text || !workspace_id) return;

    await updateInstagramComment({
      workspace_id,
      connection_id,
      comment_id: commentId,
      message: text,
    }).unwrap();

    refetch();
  };


  const deleteComment = async (commentId: string) => {
    if (!commentId) return;

    await deleteInstagramComment({
      connection_id,
      comment_id: commentId,
    }).unwrap();

    refetch();
  };

  return {
    comments: data?.results || [],
    loading: isLoading && page === 1,
    isFetching,
    error: isError ? error : null,
    refetch,
    loadMore,
    createComment,
    creatingComment,
    replyComment,
    replyingComment,
    deleteComment,
    deletingComment,
  };
};
