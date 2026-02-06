import { useState } from "react";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export type EnhanceAction = "grammar" | "length" | "tone" | "engagement";

interface EnhanceWithAIProps {
  onApply: (text: string) => void;
  onBack: () => void;
}

const SUGGESTIONS: Record<EnhanceAction, string> = {
  grammar:
    "Teste de mensagem. Você é um sucesso!\nEntre em contato agora mesmo! 😁\n\n#teste #sucesso #contato",
  length:
    "Mensagem ajustada para um tamanho ideal, mantendo clareza e impacto.",
  tone: "Mensagem com tom mais profissional e alinhado à sua marca.",
  engagement:
    "Que tal comentar aqui embaixo ou marcar alguém que precisa ver isso? 🔥",
};

export default function EnhanceWithAI({ onApply, onBack }: EnhanceWithAIProps) {
  const [active, setActive] = useState<EnhanceAction | null>(null);
  const { t } = useTranslation();
  function handleSelect(action: EnhanceAction) {
    setActive((prev) => (prev === action ? null : action));
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white  mt-7 shadow-md box box--stacked">
      <div className="flex items-center justify-start px-4 py-2 gap-2">
        <button type="button" onClick={onBack}>
          <Lucide
            icon="ArrowLeft"
            className="w-4 h-4 text-slate-800 stroke-[2] dark:text-slate-300"
          />
        </button>
        <span className="font-medium text-slate-800 text-base dark:text-slate-300">
          {t("enhance_with_ai")}
        </span>
      </div>

      <div className="px-4 pb-4 text-sm text-slate-500">
       {t('recommendations_for_your_publication')}
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        <EnhanceItem
          icon="SpellCheck"
          title={t('review_spelling')}
          description={t('review_spelling_desc')}
          isActive={active === "grammar"}
          onClick={() => handleSelect("grammar")}
        >
          <SuggestionBox text={SUGGESTIONS.grammar} onApply={onApply} />
        </EnhanceItem>

        <EnhanceItem
          icon="ArrowLeftRight"
          title={t('adjust_text_size')}
          description={t('adjust_text_size_desc')}
          isActive={active === "length"}
          onClick={() => handleSelect("length")}
        >
          <SuggestionBox text={SUGGESTIONS.length} onApply={onApply} />
        </EnhanceItem>

        <EnhanceItem
          icon="AudioLines"
          title={t('set_message_tone')}
          description={t('set_message_tone_desc')}
          badge="Alt"
          isActive={active === "tone"}
          onClick={() => handleSelect("tone")}
        >
          <SuggestionBox text={SUGGESTIONS.tone} onApply={onApply} />
        </EnhanceItem>

        <EnhanceItem
          icon="Flame"
          title={t('stimulate_engagement')}
          description={t('stimulate_engagement_desc')}
          isActive={active === "engagement"}
          onClick={() => handleSelect("engagement")}
        >
          <SuggestionBox text={SUGGESTIONS.engagement} onApply={onApply} />
        </EnhanceItem>
      </div>
    </div>
  );
}

function EnhanceItem({
  icon,
  title,
  description,
  badge,
  isActive,
  onClick,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  badge?: string;
  isActive?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "flex items-start gap-3 p-4 rounded-lg border text-left dark:bg-slate-900",
          isActive
            ? "border-primary bg-primary/5 dark:bg-slate-700"
            : "border-slate-200 hover:bg-slate-50",
          "transition-colors"
        )}
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/20 text-primary shrink-0">
          {badge ? (
            <span className="text-xs font-semibold">{badge}</span>
          ) : (
            <Lucide icon={icon} className="w-4 h-4" />
          )}
        </div>

        <div>
          <div className="font-medium text-slate-800 dark:text-slate-300">{title}</div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </button>

      {isActive && children}
    </div>
  );
}

function SuggestionBox({
  text,
  onApply,
}: {
  text: string;
  onApply: (text: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-700 dark:text-slate-300">
      <div className="font-medium mb-2 dark:text-slate-300">{t('heres_a_suggestion')}</div>

      <div className="whitespace-pre-line rounded-md border border-slate-200 bg-white dark:bg-slate-800 p-3 text-slate-600 dark:text-slate-300">
        {text}
      </div>

      <button
        type="button"
        onClick={() => onApply(text)}
        className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
      >
        {t('replace_with_this_content')}
        <Lucide icon="Pencil" className="w-4 h-4" />
      </button>
    </div>
  );
}
