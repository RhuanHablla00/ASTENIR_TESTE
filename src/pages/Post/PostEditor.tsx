import { useState } from "react";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import { Tab } from "@/components/Base/Headless";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import EmojiSelector from "@/components/EmojiSelector";
import { useTranslation } from "react-i18next";

type Network = "base" | "facebook" | "instagram";

interface NetworkContent {
  text?: string;
  images?: File[];
}

interface PostEditorValue {
  base: string;
  instagram?: NetworkContent;
  facebook?: NetworkContent;
}

interface PostEditorProps {
  value: any;
  onChange: (value: PostEditorValue) => void;
  activeNetwork: Network;
  onActiveTabChange: (tab: Network) => void;
  onOpenHashtagAI?: () => void;
  onOpenEnhanceAI?: () => void;
}

export default function PostEditor({
  value,
  onChange,
  activeNetwork,
  onActiveTabChange,
  onOpenHashtagAI,
  onOpenEnhanceAI,
}: PostEditorProps) {
  const networks: Network[] = ["base", "facebook", "instagram"];

  const [previews, setPreviews] = useState<Record<string, string[]>>({});

  const { t } = useTranslation();

  const currentText =
    activeNetwork === "base"
      ? value.base
      : value[activeNetwork]?.text ?? value.base;

  const handleTextChange = (text: string) => {
    if (activeNetwork === "base") {
      onChange({ ...value, base: text });
      return;
    }

    onChange({
      ...value,
      [activeNetwork]: {
        ...value[activeNetwork],
        text,
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeNetwork === "base") return;

    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentImages = value?.[activeNetwork]?.images ?? [];
    const currentPreviews = previews[activeNetwork] ?? [];

    const nextImages = [...currentImages, ...files].slice(0, 4);
    const nextPreviews = [
      ...currentPreviews,
      ...files.map((f) => URL.createObjectURL(f)),
    ].slice(0, 4);

    onChange({
      ...value,
      [activeNetwork]: {
        ...value[activeNetwork],
        images: nextImages,
      },
    });

    setPreviews((prev) => ({
      ...prev,
      [activeNetwork]: nextPreviews,
    }));

    e.target.value = "";
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    handleTextChange(`${currentText ?? ""}${emojiData.emoji}`);
  };

  const removeImage = (index: number) => {
    if (activeNetwork === "base") return;

    const nextImages = [...(value?.[activeNetwork]?.images ?? [])];
    const nextPreviews = [...(previews[activeNetwork] ?? [])];

    nextImages.splice(index, 1);
    nextPreviews.splice(index, 1);

    onChange({
      ...value,
      [activeNetwork]: {
        ...value[activeNetwork],
        images: nextImages,
      },
    });

    setPreviews((prev) => ({
      ...prev,
      [activeNetwork]: nextPreviews,
    }));
  };

  const isVideo = (src: string) => src.includes("video") || src.endsWith(".mp4") || src.endsWith(".mov");

  return (
    <>
      <div
        className={clsx(
          "w-full rounded-lg border bg-white dark:bg-darkmode-600 border-slate-200"
        )}
      >
        <Tab.Group
          selectedIndex={networks.indexOf(activeNetwork)}
          onChange={(index) => onActiveTabChange(networks[index])}
        >
          {/* <div className="flex flex-col md:flex-row items-center border-b border-slate-200 p-2"> */}
          <Tab.List className="flex gap-1 p-2 border-b border-slate-200 bg-white dark:bg-darkmode-600 rounded-t-xl">
            <Tab className="bg-white dark:bg-darkmode-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-primary [&[aria-selected='true']_button]:font-semibold [&[aria-selected='true']_button]:bg-white [&[aria-selected='true']_button]:dark:bg-slate-800">
              <Tab.Button
                className="w-full md:w-auto px-4 py-2 text-slate-600 whitespace-nowrap rounded-[0.6rem] transition-colors"
                as="button"
                type="button"
              >
                {t("your_post")}
              </Tab.Button>
            </Tab>

            <Tab className="bg-white dark:bg-darkmode-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-primary [&[aria-selected='true']_button]:font-semibold [&[aria-selected='true']_button]:dark:bg-slate-800">
              <Tab.Button
                className="w-full md:w-auto px-4 py-2 text-slate-600 whitespace-nowrap rounded-[0.6rem] flex items-center gap-2 transition-colors"
                as="button"
                type="button"
              >
                <Lucide icon="Facebook" className="w-4 h-4 text-primary " />{" "}
                Facebook
              </Tab.Button>
            </Tab>

            <Tab className="bg-white dark:bg-darkmode-600 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-primary [&[aria-selected='true']_button]:font-semibold [&[aria-selected='true']_button]:bg-white [&[aria-selected='true']_button]:dark:bg-slate-800">
              <Tab.Button
                className="w-full md:w-auto px-4 py-2 text-slate-600 whitespace-nowrap rounded-[0.6rem] flex items-center gap-2 transition-colors"
                as="button"
                type="button"
              >
                <Lucide icon="Instagram" className="w-4 h-4 text-primary " />{" "}
                Instagram
              </Tab.Button>
            </Tab>
          </Tab.List>
          {/* </div> */}

          <Tab.Panels className="p-4">
            <Tab.Panel className="leading-relaxed focus:outline-none">
              <EditorTextarea value={currentText} onChange={handleTextChange} />
            </Tab.Panel>
            <Tab.Panel className="leading-relaxed focus:outline-none">
              <EditorTextarea value={currentText} onChange={handleTextChange} />
            </Tab.Panel>
            <Tab.Panel className="leading-relaxed focus:outline-none">
              <EditorTextarea value={currentText} onChange={handleTextChange} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <div className="border-t border-slate-200 px-4 py-3 text-sm flex flex-col gap-3 text-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenEnhanceAI}
                className="flex items-center gap-1 hover:scale-110 transition-transform rounded-md p-2 border-primary border-[0.5px]"
              >
                <Lucide icon="Sparkles" className="w-4 h-4 text-slate-500" />
                <span>{t("enhance_with_ai")}</span>
              </button>

              <EmojiSelector onEmojiSelect={handleEmojiSelect} />

              <button
                type="button"
                title="Hashtag"
                onClick={onOpenHashtagAI}
                className="hover:scale-110 transition-transform rounded-md p-2 border-primary border-[0.5px]"
              >
                <Lucide icon="Hash" className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <span className="text-xs text-slate-500">
             {t('maximum_character')} {currentText?.length}/2000
            </span>
          </div>

          {/* {error && <div className="text-danger mt-2">{error}</div>} */}
        </div>
      </div>
      {activeNetwork !== "base" && (
        <div
          className={clsx(
            "w-full rounded-lg border-dashed border-2 bg-white dark:bg-darkmode-600 mt-3 p-2 pl-4",
            "border-slate-200"
          )}
        >
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border hover:bg-slate-50 dark:hover:bg-darkmode-500 transition-colors bg-primary/15">
              <Lucide
                icon="ImagePlus"
                className="w-6 h-6 text-primary stroke-[1.5]"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />

            </label>
            {!previews[activeNetwork]?.length ? (
              <div className="flex flex-col">
                <span>{t('add_media')}</span>
                <span className="text-xs text-slate-400">
                  {t("click_to_select_images")}
                </span>
              </div>
            ) : (
              <div className="flex gap-2">
                {previews[activeNetwork].map((src, index) => {
                  const video = isVideo(src);

                  return (
                    <div key={index} className="relative group">
                      {video ? (
                        <video
                          src={src}
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={src}
                          alt="Preview"
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function EditorTextarea({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("type_here_post_content")}
      rows={5}
      className="w-full resize-none border-0 p-0 text-sm focus:ring-0 focus:outline-none bg-transparent placeholder:text-slate-400 text-slate-700"
    />
  );
}
