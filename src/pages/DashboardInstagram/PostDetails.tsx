import Breadcrumb from "@/components/Base/Breadcrumb";
import { FormInput } from "@/components/Base/Form";
import { useInstagramCommentsList } from "@/hooks/useInstagramComments";
import { useInstagramPost } from "@/hooks/useInstagramPosts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

function formatInstagramTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 1) return "agora";
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  if (diffWeeks < 4) return `${diffWeeks}sem`;
  if (diffMonths < 12) return `${diffMonths}m`;
  return `${diffYears}a`;
}

export default function PostDetails() {
  const params = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const isFanpage = location.pathname.includes("/fanpage/");

  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{
    id: string;
    username: string;
  } | null>(null);

  const {
    post,
    loadingPost,
    errorPost,
  } = useInstagramPost({
    postId: params.post_id!,
    workspace_id: params.workspace_id!,
    connection: params.connection_id!,
  });

  const {
    comments,
    creatingComment,
    replyingComment,
    createComment,
    deleteComment,
    replyComment,
  } = useInstagramCommentsList({
    connection_id: params.connection_id!,
    post_external_id: post?.external_id ?? params.external_id,
  });

  if (loadingPost) return <div>Carregando...</div>;
  if (errorPost || !post) return <div>Erro ao carregar post.</div>;

  function handleReply(comment: any) {
    setReplyTo({
      id: comment.id,
      username: comment.sender_user_name,
    });

    setCommentText(`@${comment.sender_user_name} `);
  }

  function handleChange(value: string) {
    setCommentText(value);

    if (replyTo && !value.startsWith(`@${replyTo.username}`)) {
      setReplyTo(null);
    }
  }

  async function handlePublish() {
    if (!commentText.trim()) return;

    if (replyTo) {
      await replyComment(replyTo.id, commentText);
    } else {
      await createComment(commentText);
    }

    setCommentText("");
    setReplyTo(null);
  }

  async function handleDelete(commentId: string) {
    if (!commentId) return;

    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-4">
        <Breadcrumb light className="flex-1 hidden xl:block">
          <Breadcrumb.Link to={`/workspace/${params.workspace_id}`}>
            Home
          </Breadcrumb.Link>

          <Breadcrumb.Link
            to={`/workspace/${params.workspace_id}/connections/${params.connection_type}`}
          >
            Instagram
          </Breadcrumb.Link>

          <Breadcrumb.Link
            to={`/workspace/${params.workspace_id}/connections/${params.connection_type}/${params.connection_id}/${params.external_id}`}
          >
            {params.external_id}
          </Breadcrumb.Link>
          <Breadcrumb.Link>
            {params.post_id}
          </Breadcrumb.Link>
        </Breadcrumb>

      </div>

      {/* CARD */}
      <div className="w-full mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden flex h-[700px] box box--stacked">
        {/* MEDIA */}
        <div className="w-1/2 bg-white dark:bg-transparent flex items-center justify-center">
          {post.type === "video" ? (
            <video
              src={post.media_url}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={post.media_url}
              alt="Post media"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="w-1/2 flex flex-col border-l border-slate-200">
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 shrink-0">
            <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-800" />
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {"Instagram User"}
              </span>
              <span className="text-xs text-slate-500">
                {post.type}
              </span>
            </div>
          </div>

          {/* CAPTION */}
          <div className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line border-b border-slate-200 shrink-0 max-h-[420px] overflow-y-auto">
            <span className="font-semibold text-slate-800 dark:text-slate-300 mr-1">
              {"Instagram User"}
            </span>
            {post.title || "Sem legenda"}
          </div>

          {/* COMMENTS */}
          {comments?.length > 0 ? (
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-3 bg-slate-50 p-2 rounded-xl dark:bg-darkmode-400"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-800 shrink-0" />

                  <div className="flex-1 text-sm leading-snug">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 mr-1">
                      {comment.sender_user_name}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">
                      {comment.text}
                    </span>

                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                      <span>{formatInstagramTime(comment.created_at)}</span>
                      <button
                        className="hover:text-slate-600"
                        onClick={() => handleReply(comment)}
                      >
                        {t("reply")}
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(comment.id)}
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>

                  <button className="text-slate-400 text-xs hover:text-slate-600">
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-gray-400">{t('no_comments_found')}...</div>
          )}

          {/* FOOTER */}
          <div className="border-t border-slate-200 px-2 py-3 flex items-center gap-3 shrink-0">
            <FormInput
              className="flex-1"
              placeholder={`${t("add_a_comment")}...`}
              value={commentText}
              onChange={(e: any) => handleChange(e.target.value)}
            />
            <button
              className="text-blue-600 text-sm font-semibold disabled:opacity-50"
              onClick={handlePublish}
              disabled={creatingComment || replyingComment}
            >
              {t('publish')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
