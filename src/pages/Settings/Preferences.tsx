import Button from "@/components/Base/Button";
import { FormSwitch } from "@/components/Base/Form";
import TomSelect from "@/components/Base/TomSelect";
import languages from "@/utils/languages";
import timezones from "@/utils/timezones";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Preferences() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedTimezone, setSelectedTimezone] = useState("-05:00");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-5 box box--stacked">
      <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
        {t('preferences')}
      </div>
      <div>
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('language')}</div>
                <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  {t('required')}
                </div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('select_your_preferred_language')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <TomSelect
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
              }}
              options={{
                placeholder: t('select_your_language'),
                maxOptions: undefined,
              }}
              className="w-full"
            >
             {languages.getAll().map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
            </TomSelect>
          </div>
        </div>
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('timezone')}</div>
                <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  {t('required')}
                </div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('select_your_current_timezone_from_list')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
          <TomSelect
            value={selectedTimezone}
            onChange={(e) => {
              setSelectedTimezone(e.target.value);
            }}
            options={{
              placeholder: t("select_your_timezone"),
              maxOptions: undefined,
            }}
            className="w-full"
          >
            {timezones.getAll().map((timezone) => (
              <option key={timezone.code} value={timezone.code}>
                {timezone.name}
              </option>
            ))}
          </TomSelect>
          </div>
        </div>
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('item_support')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {t('item_support_description')}
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormSwitch.Input
              id="checkbox-switch-7"
              type="checkbox"
            />
          </div>
        </div>
        <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div className="text-left">
              <div className="flex items-center">
                <div className="font-medium">{t('featured_items')}</div>
              </div>
              <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                {`${t('featured_items_description')} ${" "}`}
                <a href="" className="text-primary">
                  {t('platform')}
                </a>
                .
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <FormSwitch.Input
              id="checkbox-switch-7"
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
        <Button
          variant="outline-primary"
          className="w-full px-4 border-primary/50 md:w-auto"
        >
          {t('save_changes')}
        </Button>
      </div>
    </div>
  )
}