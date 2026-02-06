import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PostPreviewProps {
  post?: {
    base?: string;
    instagram?: {
      text?: string;
      images?: File[];
    };
    facebook?: {
      text?: string;
      images?: File[];
    };
  };
  publishIn?: string[];
  connection: any;
}

export default function PostPreview({
  post,
  publishIn = [],
  connection,
}: PostPreviewProps) {
  const showInstagram = publishIn.some((p) => p?.startsWith("instagram"));
  const showFacebook = publishIn.some((p) => p?.startsWith("facebook"));

  const baseText = post?.base || "";
  const instagramText = post?.instagram?.text || baseText;
  const facebookText = post?.facebook?.text || baseText;

  const instagramImages =
    post?.instagram?.images?.map((img) => URL.createObjectURL(img)) ?? [];

  const facebookImages =
    post?.facebook?.images?.map((img) => URL.createObjectURL(img)) ?? [];

  return (
    <div className="sticky top-6 space-y-3 mt-7 pr-6">
      <div className="gap-y-10 gap-x-6  shadow-md box box--stacked p-5 mb-10">
        <FacebookPreview
          content={facebookText}
          images={facebookImages}
          pageName={connection?.additional_info?.page_name}
          profilePicture={connection?.additional_info?.page_picture}
        />

        <InstagramPreview
          content={instagramText}
          images={instagramImages}
          username={connection?.additional_info?.ig_user_name}
          profilePicture={connection?.additional_info?.ig_profile_picture}
        />
      </div>
    </div>
  );
}

function FacebookPreview({
  content,
  pageName,
  images = [],
  profilePicture,
}: {
  content?: string;
  pageName?: string;
  images?: string[];
  profilePicture?: string | null;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full md:w-auto text-slate-600 whitespace-nowrap gap-2 transition-colors">
      <div className="flex flex-row items-center gap-2">
        <div className="flex border rounded-full w-10 h-10 items-center justify-center bg-blue-600/15 shrink-0">
          <Lucide icon="Facebook" className="w-5 h-5 text-blue-600" />
        </div>

        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {t("post_on_facebook")}
        </span>
      </div>

      <div className="border rounded-md shadow-sm bg-white dark:bg-darkmode-300">
        <div className="p-4 flex items-center gap-3">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 shrink-0" />
          )}

          <div>
            <div className="font-medium text-sm dark:text-slate-300 whitespace-normal break-words">
              {pageName ?? t("your_social_network")}
            </div>
            <div className="text-xs text-slate-500">{t("just_now")}</div>
          </div>
        </div>

        <div className="p-2 text-sm whitespace-pre-line">
          {content ? (
            content
          ) : (
            <span className="text-slate-400 dark:text-slate-300">
              {t("post_caption_will_appear_here")}
            </span>
          )}
        </div>
        {images.length > 0 && (
          <div
            className={clsx(
              "grid gap-1",
              images.length === 1 && "grid-cols-1",
              images.length === 2 && "grid-cols-2",
              images.length >= 3 && "grid-cols-2"
            )}
          >
            {images.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
            ))}
          </div>
        )}

        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-medium hover:text-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <Lucide icon="ThumbsUp" className="w-4 h-4 stroke-[1.5]" />
            <span>{t("like")}</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors">
            <Lucide icon="MessageCircle" className="w-4 h-4 stroke-[1.5]" />
            <span>{t("comment")}</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors">
            <Lucide icon="Send" className="w-4 h-4 stroke-[1.5]" />
            <span>{t("send")}</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors">
            <Lucide icon="Share2" className="w-4 h-4 stroke-[1.5]" />
            <span>{t("share")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function InstagramPreview({
  content,
  username,
  images = [],
  profilePicture,
}: {
  content?: string;
  username?: string;
  images?: string[];
  profilePicture?: string | null;
}) {
  const { t } = useTranslation();
  
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col w-full md:w-auto py-2 pt-4 text-slate-600 whitespace-nowrap rounded-[0.6rem] gap-2 transition-colors">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-600/10 shrink-0">
          <Lucide icon="Instagram" className="w-5 h-5 text-pink-600" />
        </div>

        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {t("publish_on_instagram")}
        </span>
      </div>

      <div className="border border-slate-200 rounded-md ">
        <div className="p-2 flex items-center gap-3 pl-5">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 shrink-0" />
          )}

          <div className="font-medium text-sm dark:text-slate-300 whitespace-normal break-words">
            {username ?? t("your_social_network")}
          </div>
        </div>

        {images.length > 0 ? (
          <div className="relative w-full h-48 overflow-hidden select-none">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Preview"
                  className="w-full h-48 object-cover shrink-0"
                />
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <Lucide icon="ArrowLeft" className="w-4 h-4 text-slate-100" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <Lucide
                    icon="ArrowRight"
                    className="w-4 h-4 text-slate-100"
                  />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      i === activeIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-slate-200 dark:bg-darkmode-300" />
        )}

        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-4">
            <span className="transition-opacity ">
              <Lucide
                icon="Heart"
                className="w-4 h-4 text-slate-600 dark:text-slate-400 stroke-[1.5]"
              />
            </span>

            <span className="transition-opacity">
              <Lucide
                icon="MessageCircle"
                className="w-4 h-4 text-slate-700 dark:text-slate-400 stroke-[1.5] -scale-x-100"
              />
            </span>

            <span className="transition-opacity">
              <Lucide
                icon="Send"
                className="w-4 h-4 text-slate-700 dark:text-slate-400 stroke-[1.5] -mt-1 rotate-6"
              />
            </span>
          </div>

          <span className="transition-opacity">
            <Lucide
              icon="Bookmark"
              className="w-4 h-4 text-slate-700 dark:text-slate-400 stroke-[1.5]"
            />
          </span>
        </div>

        <div className="flex px-4 pb-4 text-sm whitespace-pre-line justify-start ">
          <span className="font-semibold mr-2 text-slate-800 dark:text-slate-300">
            {username}
          </span>
          {content ? (
            <span className="text-slate-700">{content}</span>
          ) : (
            <span className="text-slate-400">
              {t("post_caption_will_appear_here")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
