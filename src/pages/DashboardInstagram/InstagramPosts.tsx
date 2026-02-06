import React, { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Tab } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDeleteWebhookMutation, useGetConnectionIdQuery, useUpdateWebhookMutation} from "@/api/connectionsApi";
import { useInstagramCommentsList } from "@/hooks/useInstagramComments";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { useAppSelector } from "@/stores/hooks";
import Button from "@/components/Base/Button";
import { FormInput } from "@/components/Base/Form";
import { useFieldArray, useForm } from "react-hook-form";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/components/Base/Notification";
import { InstagramPost, useGetInstagramPostsApiQuery } from "@/api/instagramApi";
import { useTranslation } from "react-i18next";
import GenericModal from "@/components/Modals/GenericModal";

interface CommentItemProps {
  comment: any;
  onSubmitReply: (commentId: string, text: string) => void;
  onDelete: (commentId: string) => void;
  isSending: boolean;
}

interface WebhookInput {
  id?: string;
  url: string;
  token?: string;
}

interface FormValues {
  webhooks: WebhookInput[];
}

const GridList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden"
  />
));

GridList.displayName = "GridList";


const PostCard = ({ post }: { post: InstagramPost }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-black/40 dark:border rounded-lg h-full shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.01] flex flex-col cursor-pointer overflow-hidden"
      onClick={() => navigate(`post/${post.id}`)}
    >
      <div className="relative w-full h-72">
        <img
          src={post.type === "video" ? post.thumbail_url : post.media_url}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {post.type === "video" && (
          <Lucide
            icon="PlayCircle"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white"
          />
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {post?.description && (
          <p className="text-sm text-gray-800 dark:text-gray-400 mb-3 line-clamp-3">
            {post?.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t flex items-center justify-between text-gray-600 dark:text-gray-300 text-xs font-semibold space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Lucide
                icon="Heart"
                className="w-4 h-4 fill-red-500 text-red-500"
              />
              <span>{post?.metrics?.likes ?? 0}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Lucide icon="MessageCircle" className="w-4 h-4 text-blue-500" />
              <span>{post?.metrics?.comments ?? 0}</span>
            </div>
          </div>

          {post.created_at && (
            <div className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleDateString("pt-BR")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const CommentItem = ({
  comment,
  onSubmitReply,
  onDelete,
  isSending,
}: CommentItemProps) => {
  const [openReply, setOpenReply] = useState(false);
  const [text, setText] = useState(`@${comment.sender_user_name} `);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!text.trim() || isSending) return;

    onSubmitReply(comment.external_id, text);
    setOpenReply(false);
  };

  const handleDelete = (commentId: string) => {
    if (isSending) return;
    onDelete(commentId);
  };


  return (
    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl dark:bg-darkmode-400 w-full">
      <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-800 shrink-0" />

      <div className="flex-1 text-sm min-w-0">
        <div className="break-words">
          <span className="font-semibold text-slate-800 mr-1 dark:text-white">
            {comment.sender_user_name}
          </span>
          <span className="text-slate-700 dark:text-slate-200">
            {comment.text}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-slate-400">
          <span className="whitespace-nowrap">
            {new Date(comment.created_at).toLocaleString("pt-BR")}
          </span>

          <div className="flex items-center gap-3">
            <button
              className="hover:text-slate-600"
              onClick={() => setOpenReply((v) => !v)}
            >
              {t('reply')}
            </button>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleDelete(comment?.external_id)}
            >
              {t('delete')}
            </button>
          </div>
        </div>

        {openReply && (
          <div className="mt-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-darkmode-600 dark:border-darkmode-400 transition-all"
              rows={3}
              placeholder={t('write_your_answer')}
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setOpenReply(false)}
                className="text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-darkmode-300 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSending}
                className="text-xs px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {isSending ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        )}
      </div>
      <button className="text-slate-400 text-xs hover:text-slate-600 shrink-0 self-center sm:self-start mt-1">
        ❤️
      </button>
    </div>
  );
};



function connectInstagramWebSocket({
  workspace,
  connectionId,
  token,
  wsRef,
  onNewComment,
}: {
  workspace: string;
  connectionId: string;
  token: string;
  wsRef: React.MutableRefObject<WebSocket | null>;
  onNewComment?: (comment: any) => void;
}) {
  const wsUrl =
    import.meta.env.VITE_CONNECTION_SOCKET_URL +
    `?workspace=${encodeURIComponent(workspace)}` +
    `&connection=${encodeURIComponent(connectionId)}` +
    `&token=${encodeURIComponent(token)}`;


  const ws = new WebSocket(wsUrl);


  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      // filtrando somente comentários
      data.changes?.forEach((change: any) => {
        if (change.field === "comments" && onNewComment) {
          onNewComment(change.value);
        }
      });
    } catch {
      console.warn("⚠️ WS mensagem não é JSON");
    }
  };

  ws.onerror = (event) => {
    console.error("🔴 WS error", event);
  };

  ws.onclose = (event) => {
    console.warn("🟡 WS fechado", {
      code: event.code,
      reason: event.reason || "(sem reason)",
      wasClean: event.wasClean,
    });
    wsRef.current = null;
  };

  wsRef.current = ws;
}



function disconnectInstagramWebSocket(
  wsRef: React.MutableRefObject<WebSocket | null>
) {
  if (!wsRef.current) return;

  console.log("⚪ Fechando WebSocket");
  wsRef.current.close(1000, "component unmounted");
  wsRef.current = null;
}


export default function InstagramPosts() {
  const params = useParams();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const connection_id = params.connection_id!;
  const { data, refetch } = useGetConnectionIdQuery(connection_id!);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [webhookComments, setWebhookComments] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [deleteWebhookApi] = useDeleteWebhookMutation();
  const [updateWebhook] = useUpdateWebhookMutation();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const { data: posts, isFetching: loading, isError } =
    useGetInstagramPostsApiQuery({
      connection: connection_id,
      page,
      limit: 12,
    });


  const handleNewComment = (comment: any) => {
    setWebhookComments((prev) => [comment, ...prev]);
  };

  useEffect(() => {
    connectInstagramWebSocket({
      workspace: params?.workspace_id!,
      connectionId: connection_id!,
      token: accessToken!,
      wsRef,
      onNewComment: handleNewComment,
    });

    return () => {
      wsRef.current?.close();
    };
  }, [params?.workspace_id, connection_id, accessToken]);

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { webhooks: [] },
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const selectedIndex = tabParam === "comments" ? 1 : tabParam === "webhook" ? 2 : 0;

  const handleTabChange = (index: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (index === 1) {
      newParams.set("tab", "comments");
    } else if (index === 2) {
      newParams.set("tab", "webhook");
    } else {
      newParams.delete("tab");
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (data) {
      const webhooksFromApi =
        data.webhooks && data.webhooks.length > 0
          ? data.webhooks.map((w) => ({
            id: w.uuid,
            url: w.url,
            token: w.token ?? "",
          }))
          : [{ url: "", token: "" }];

      reset({ webhooks: webhooksFromApi });
    }
  }, [data, reset]);


  const {
    comments: commentsList,
    loading: commentsLoading,
    error: commentsError,
    loadMore,
    replyComment,
    replyingComment,
    deleteComment,
  } = useInstagramCommentsList({
    connection_id: connection_id || "692f406ba58ffbff504568d7",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "webhooks",
    keyName: "formId",
  });

  const handleSaveWebhook = async (index: number, values: FormValues) => {
    const body = values.webhooks[index];

    if (!body.url?.trim()) {
      showErrorNotification("A URL é obrigatória");
      return;
    }

    try {
      await updateWebhook({
        connection_id,
        webhook_id: body.id,
        body: {
          url: body.url,
          token: body.token,
        },
      }).unwrap();

      await refetch();
      showSuccessNotification("Webhook salvo com sucesso!");
    } catch (err) {
      console.error(err);
      showErrorNotification("Erro ao salvar webhook");
    }
  };

  const handleDelete = async (index: number, field: WebhookInput) => {
    if (!field.id) {
      remove(index);
      return;
    }

    try {
      await deleteWebhookApi({
        connection_id,
        webhook_id: field.id,
      }).unwrap();

      remove(index);
      showSuccessNotification("Webhook deletado!");
    } catch {
      showErrorNotification("Erro ao deletar webhook");
    }
  };

  const submitReply = (commentId: string, text: string) => {
    replyComment(commentId, text);
  };

  const handleDeleteComment = (commentId: string) => {
    setDeleteCommentId(commentId);
  };

  const handleConfirmDeleteComment = async () => {
    if (!deleteCommentId) return;

    try {
      await deleteComment(deleteCommentId);

      showSuccessNotification(t("comment_deleted_successfully"));

      setDeleteCommentId(null);
    } catch (error) {
      console.error(error);
      showErrorNotification(t("error_deleting_comment"));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-3">
          <Breadcrumb light className="flex-1 hidden xl:block">
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
              to={`/workspace/${params?.workspace_id}`}
            >
              Home
            </Breadcrumb.Link>
            <Breadcrumb.Link
              to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}`}
              className="dark:before:bg-chevron-white"
            >
              Instagram
            </Breadcrumb.Link>
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
              to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${params?.connection_id}`}
            >
              {params?.connection_id}
            </Breadcrumb.Link>
          </Breadcrumb>
          <Button
            variant="primary"
            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
            onClick={() =>
              navigate(
                `/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${connection_id}/post/create`
              )
            }
          >
            <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />
            {t('create_post')}
          </Button>
        </div>

        <div className="p-1.5 box flex flex-col box--stacked">
          <div className="h-48 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
            <div
              className={clsx([
                "w-full h-full relative overflow-hidden",
                "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
              ])}
            ></div>

            <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-24">
              <div className="w-full h-full overflow-hidden border-[6px] border-white rounded-full image-fit">
                <img src={data?.additional_info?.ig_profile_picture} alt="" />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="rounded-[0.6rem] bg-slate-50 dark:bg-black pt-12 pb-6">
            <div className="flex items-center justify-center text-xl font-medium">
              {data?.additional_info?.ig_user_name}
              <Lucide
                icon="BadgeCheck"
                className="w-5 h-5 ml-2 text-blue-500"
              />
            </div>
          </div>
        </div>

        <Tab.Group
          className="mt-10"
          selectedIndex={selectedIndex}
          onChange={handleTabChange}
        >
          <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
            <Tab.List
              variant="boxed-tabs"
              className="flex-col sm:flex-row w-full 2xl:w-auto mr-auto box rounded-[0.6rem] border-slate-200"
            >
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  {t('posts')}
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  {t('comments')}
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Webhook
                </Tab.Button>
              </Tab>
            </Tab.List>
          </div>

          <Tab.Panels className="border border-t-0 rounded-xl shadow-lg 0-mt-px pt-px box box--stacked mt-4">
            <Tab.Panel className="overflow-hidden p-6">
              <div ref={scrollRef}>
                <VirtuosoGrid
                  data={posts?.results ?? []}
                  overscan={200}
                  useWindowScroll={true}
                  components={{ List: GridList }}
                  endReached={() => {
                    if (!loading) {
                      setPage((p) => p + 1)
                      refetch()
                    }
                  }}
                  itemContent={(_, post) => <PostCard post={post} />}
                />
              </div>
            </Tab.Panel>

            {/* <Tab.Panel className="p-4">
              <ChatMock />
            </Tab.Panel> */}

            <Tab.Panel className="p-4">
              {commentsLoading && (
                <div className="flex justify-center py-10">
                  <p className="text-slate-500">{t('loading_comments')}...</p>
                </div>
              )}

              {commentsError && (
                <div className="flex justify-center py-10">
                  <p className="text-red-500">
                    {t('error_loading_comments')}.
                  </p>
                </div>
              )}

              {!commentsLoading &&
                !commentsError &&
                commentsList.length === 0 && (
                  <div className="flex justify-center py-10">
                    <p className="text-slate-500">
                      {t('no_recent_comments')}.
                    </p>
                  </div>
                )}

              {!commentsLoading &&
                !commentsError &&
                commentsList.length > 0 && (
                  <Virtuoso
                    data={commentsList}
                    useWindowScroll
                    overscan={200}
                    itemContent={(index, comment) => (
                      <div className="flex flex-col gap-2 mb-4">
                        <CommentItem
                          comment={comment}
                          onSubmitReply={submitReply}
                          onDelete={handleDeleteComment}
                          isSending={replyingComment}
                        />
                      </div>
                    )}
                    endReached={loadMore}
                  />
                )}
            </Tab.Panel>

            <Tab.Panel className="p-4 box box--stacked rounded-lg">
              <div className="col-span-12">
                <div className="p-5 box box--stacked">
                  <div className="text-base font-medium mb-4">
                    {t('configured_webhooks')}
                  </div>

                  {/* 2 colunas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id ?? field.formId}
                        className="p-4 border border-slate-300/70 rounded-lg bg-slate-50 box"
                      >
                        <div className="font-medium text-slate-600 mb-3">
                          Webhook #{index + 1}
                        </div>

                        {/* URL */}
                        <label className="text-xs text-slate-500">URL</label>
                        <FormInput
                          placeholder="https://meu-webhook.com/event"
                          className="mt-1"
                          {...register(`webhooks.${index}.url`, {
                            required: t('url_is_required'),
                          })}
                        />

                        {/* TOKEN */}
                        <label className="text-xs text-slate-500 mt-3 block">
                          Token (opcional)
                        </label>
                        <FormInput
                          placeholder="seu-token-aqui"
                          className="mt-1"
                          {...register(`webhooks.${index}.token`)}
                        />

                        {/* BUTTONS */}
                        <div className="flex w-full gap-4 mt-3">
                          <Button
                            variant="primary"
                            className="w-full"
                            onClick={handleSubmit((values) =>
                              handleSaveWebhook(index, values)
                            )}
                          >
                            {t('save_webhook')}
                          </Button>

                          <Button
                            variant="outline-danger"
                            className="w-full"
                            onClick={() => handleDelete(index, field)}
                          >
                            {t('remove')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline-secondary"
                    className="w-1/2 mt-4"
                    onClick={() => append({ url: "", token: "" })}
                  >
                    + {t('add_webhook')}
                  </Button>
                </div>
              </div>
              {webhookComments.length > 0 ? (
                <Virtuoso
                  data={webhookComments}
                  useWindowScroll
                  overscan={200}
                  itemContent={(index, comment) => (
                    <div className="flex flex-col gap-4 pb-4">
                      <div className="">
                        <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-slate-300 shrink-0" />
                          <div>
                            <div className="flex-1 text-sm">
                              <span className="font-semibold text-slate-800 mr-1">
                                {comment.from?.username}:
                              </span>
                              <span className="text-slate-700">{comment.text}</span>
                            </div>
                            <span className="text-gray-400 text-xs font-medium">{t('type')}: <span className="font-semibold text-gray-800">{comment.media.media_product_type}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="flex justify-center py-10">
                  <p className="text-slate-500">{t('no_recent_comments')}.</p>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <GenericModal
        open={!!deleteCommentId}
        onClose={() => setDeleteCommentId(null)}
        title={t("delete")}
        size="default"
        content={
          <div className="flex flex-col gap-4 p-2">
            <p className="text-slate-600 dark:text-slate-300">
              {t("are_you_sure_you_want_to_delete_comment")}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => setDeleteCommentId(null)}
              >
                {t("cancel")}
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDeleteComment}
              >
                {t("delete")}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
