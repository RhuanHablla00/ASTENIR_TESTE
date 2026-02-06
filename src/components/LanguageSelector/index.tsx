import { Menu } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Lucide from "../Base/Lucide";
import { TbChevronDown, TbChevronRight, TbChevronUp } from "react-icons/tb";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const current = i18n.language;

  const languages = [
    { code: "pt-BR", label: "Português", flag: "🇧🇷", short: "BR" },
    { code: "en", label: "English", flag: "🇺🇸", short: "US" },
    { code: "es", label: "Español", flag: "🇪🇸", short: "ES" },
    { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
  ];

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-darkmode-300"
      >
        <Lucide icon="Globe" className="w-4 h-4 mr-2" />
        {t('language')}

        <span className="ml-auto opacity-60">
          {open ? <TbChevronUp /> : <TbChevronDown />}
        </span>
      </button>

      {open && (
        <div className="pl-4 pt-1 pb-2 flex flex-col gap-1">


          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => i18n.changeLanguage(lng.code)}
              className="flex items-center px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-darkmode-300 rounded"
            >
              <span
                className={`w-3 h-3 mr-3 rounded-full border-[2px] border-slate-400 flex items-center justify-center`}
              >
                {current === lng.code && (
                  <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-slate-200"></span>
                )}
              </span>

              <span className="mr-2 text-xs">{lng.short}</span>
              <span className="text-sm">{lng.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
