import { useState } from "react";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormCheck } from "@/components/Base/Form";
import { useTranslation } from "react-i18next";

interface HashtagAISuggestionsProps {
  onApply: (hashtags: string[]) => void;
  onBack: () => void;
}

export default function HashtagAISuggestions({
  onApply,
  onBack,
}: HashtagAISuggestionsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const { t } = useTranslation();
  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const suggestions = [
    "#Opiniões",
    "#Comunidade",
    "#TesteDeMensagem",
    "#CompartilheSuaOpinião",
    "#Engajamento",
    "#Feedback",
    "#Discussão",
    "#Conversa",
    "#Interação",
    "#Pensamentos",
  ];

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white my-7 shadow-md box box--stacked">
      <div className="flex items-center justify-start px-4 py-2 gap-2">
        <button type="button" onClick={onBack}>
          <Lucide
            icon="ArrowLeft"
            className="w-4 h-4 text-slate-800 stroke-[2] dark:text-slate-300"
          />
        </button>
        <span className="text-base font-medium text-slate-800 text-md dark:text-slate-300">
          {t('ai_powered_hashtags_suggestions')}
        </span>
      </div>

      <div className="px-4 pb-4 text-sm text-slate-500">
        {t('recommendations_for_your_publication')}
      </div>

      <div className="px-4 text-base text-slate-800 dark:text-slate-300">
       {t('heres_a_suggestion')}
      </div>
      {/* <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <Lucide icon="RefreshCcw" className="w-4 h-4" />
            Atualizar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:underline"
          >
            Fechar
          </button>
        </div> */}
      {/* </div> */}

      <div className="p-4 space-y-2 max-h-72 overflow-auto">
        {suggestions.map((tag) => {
          const checked = selected.includes(tag);

          return (
            <label
              key={tag}
              className={clsx(
                "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors border-dashed border-b hover:bg-slate-50 dark:hover:bg-slate-900"
                // checked
                //   ? "bg-amber-100 border border-amber-200"
                //   : "hover:bg-slate-50"
              )}
            >
              <FormCheck.Input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(tag)}
              />
              <span className="text-sm">{tag}</span>
            </label>
          );
        })}
      </div>

      <div className="flex justify-end p-4 w-full">
        <Button
          variant="outline-primary"
          disabled={!selected.length}
          onClick={() => onApply(selected)}
        >
          # {t('add_tags')}
        </Button>
      </div>
    </div>
  );
}
