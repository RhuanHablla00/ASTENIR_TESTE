import { Controller } from "react-hook-form";
import clsx from "clsx";

import Button from "@/components/Base/Button";
import TomSelect from "@/components/Base/TomSelect";
import { useTranslation } from "react-i18next";
import { useGetConnectionIdQuery } from "@/api/connectionsApi";
import { useParams } from "react-router-dom";
import PostEditor from "../PostEditor";
import { usePostCreate } from "@/hooks/usePostCreate";
import PostPreview from "../PostPreview";
import { useState } from "react";
import EnhanceWithAI from "../EnhanceWithAI";
import HashtagAISuggestions from "../HashtagAISuggestions";
import GenericModal from "@/components/Modals/GenericModal";

type RightPanelView = "preview" | "hashtag" | "enhance";
type Network = "base" | "facebook" | "instagram";

function PostCreate() {
  const { t } = useTranslation();
  const params = useParams();
  const connection_id = params.connection_id!;
  const [rightView, setRightView] = useState<RightPanelView>("preview");
  const [activeNetwork, setActiveNetwork] = useState<Network>("base");

  const { data } = useGetConnectionIdQuery(connection_id);
  const { form, handleSubmit, submitError, submitSuccess, isSubmitting } = usePostCreate({ connection_id });

  const { control, formState: { errors } } = form;

  const publishOptions = data
    ? [
      {
        value: `instagram:${data.additional_info.ig_user_id}`,
        label: data.additional_info.ig_user_name,
        network: "instagram",
      },
      {
        value: `facebook:${data.additional_info.page_id}`,
        label: data.additional_info.page_name,
        network: "facebook",
      },
    ]
    : [];

  return (
    <div>
      <div className="text-lg font-medium text-white">{t("create_post")}</div>
      <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-10 pb-20">
        <div className="col-span-12 xl:col-span-8">
          <form onSubmit={handleSubmit} className="mt-7">
            {submitError && (
              <div className="p-4 mb-2 text-white bg-red-500 rounded-t-md">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="p-4 mb-2 text-white bg-green-500 rounded-t-md">
                {submitSuccess}
              </div>
            )}

            <div className="gap-y-10 gap-x-6 shadow-md box box--stacked p-5 mb-10">
              <div className="flex flex-col xl:flex-row xl:items-start gap-4">
                <label className="xl:w-60 xl:mr-5 shrink-0">
                  <div className="font-medium">{t("publish_in")}</div>
                  <div className="mt-1.5 text-xs text-slate-500">
                    {t("publish_in_description")}
                  </div>
                </label>

                <div className="flex-1 w-full">
                  <Controller
                    name="publish_in"
                    control={control}
                    render={({ field }) => (
                      <TomSelect
                        {...field}
                        multiple
                        value={field.value || []}
                        onChange={field.onChange}
                        className={clsx("w-full", {
                          "border-danger": errors.publish_in,
                        })}
                      >
                        {publishOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {`${opt.network} - ${opt.label}`}
                          </option>
                        ))}
                      </TomSelect>
                    )}
                  />
                  {errors.publish_in && (
                    <p className="mt-1 text-sm text-danger">
                      {errors.publish_in.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="box box--stacked shadow-md p-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-4">
                  <span className="font-medium">{t("post_content")}</span>
                  <p className="mt-2 text-xs text-slate-500">
                    {t("post_content_description")}
                  </p>
                </div>

                <div className="col-span-12 xl:col-span-8">
                  <Controller
                    name="post"
                    control={control}
                    render={({ field }) => (
                      <PostEditor
                        value={field.value}
                        onChange={field.onChange}
                        activeNetwork={activeNetwork}
                        onActiveTabChange={setActiveNetwork}
                        onOpenHashtagAI={() => setRightView("hashtag")}
                        onOpenEnhanceAI={() => setRightView("enhance")}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end rounded-b-md mt-7">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-6 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {t("publish")}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-12 xl:col-span-4 mt-6 xl:mt-0 xl:sticky xl:top-5 h-fit">
          {rightView === "preview" && (
            <PostPreview
              post={form.watch("post")}
              publishIn={form.watch("publish_in")}
              connection={data}
            />
          )}

          {rightView === "hashtag" && (
            <HashtagAISuggestions
              onBack={() => setRightView("preview")}
              onApply={(tags) => {
                const currentPost = form.getValues("post");
                const hashtagsText = tags.join(" ");

                if (activeNetwork === "base") {
                  const currentText = currentPost.base ?? "";

                  form.setValue("post", {
                    ...currentPost,
                    base: `${currentText}${currentText ? "\n\n" : ""
                      }${hashtagsText}`,
                  });

                  setRightView("preview");
                  return;
                }

                const currentText =
                  currentPost[activeNetwork]?.text ?? currentPost.base ?? "";

                form.setValue("post", {
                  ...currentPost,
                  [activeNetwork]: {
                    ...currentPost[activeNetwork],
                    text: `${currentText}${currentText ? "\n\n" : ""
                      }${hashtagsText}`,
                  },
                });

                setRightView("preview");
              }}
            />
          )}

          {rightView === "enhance" && (
            <EnhanceWithAI
              onBack={() => setRightView("preview")}
              onApply={(newText) => {
                const currentPost = form.getValues("post");

                if (activeNetwork === "base") {
                  form.setValue("post", {
                    ...currentPost,
                    base: newText,
                  });
                } else {
                  form.setValue("post", {
                    ...currentPost,
                    [activeNetwork]: {
                      ...currentPost[activeNetwork],
                      text: newText,
                    },
                  });
                }

                setRightView("preview");
              }}
            />
          )}

        </div>
      </div>
      <GenericModal
        open={isSubmitting}
        closeOnBackdrop={false}
        showCloseButton={false}
        title={t('publishing_post')}
        subtitle={t('please_wait_to_finish')}
        content={
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
            <span className="text-sm text-slate-500">
              {t('sending_media')}
            </span>
          </div>
        }
      />
    </div>
  );
}

export default PostCreate;
