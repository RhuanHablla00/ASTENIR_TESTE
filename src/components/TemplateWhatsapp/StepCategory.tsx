import clsx from "clsx";
import { TbSpeakerphone, TbBell, TbKey } from "react-icons/tb";
import { FormCheck } from "@/components/Base/Form";
import { TemplateData, Category, MarketingType } from "./templateTypes";
import { useTranslation } from "react-i18next";

interface StepCategoryProps {
  data: TemplateData;
  update: (patch: Partial<TemplateData>) => void;
  handlers: {
    changeMarketingType: (type: MarketingType) => void;
  }
}

export default function StepCategory({ data, update, handlers }: StepCategoryProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex rounded-md border border-slate-300 dark:border-slate-700 overflow-hidden">
        {(["MARKETING", "UTILITY", "AUTHENTICATION"] as Category[]).map((c) => {
          const isActive = data.category === c;

          return (
            <label
              key={c}
              className={clsx(
                "flex-1 cursor-pointer px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                isActive
                  ? "bg-slate-100 text-slate-900 dark:bg-cyan-950 dark:text-slate-100"
                  : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-black dark:text-slate-400 dark:hover:bg-slate-700"
              )}
            >
              <input
                type="radio"
                className="hidden"
                checked={isActive}
                onChange={() => update({ category: c })}
              />

              {c === "MARKETING" && <TbSpeakerphone className="w-5 h-5" strokeWidth={1} />}
              {c === "UTILITY" && <TbBell className="w-5 h-5" strokeWidth={1} />}
              {c === "AUTHENTICATION" && <TbKey className="w-5 h-5" strokeWidth={1} />}

              {c.charAt(0) + c.slice(1).toLowerCase()}
            </label>
          );
        })}
      </div>

      {data.category === "MARKETING" && (
        <div className="space-y-3">
          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "DEFAULT"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "DEFAULT"}
              onChange={() => update({ marketingType: "DEFAULT" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t("default")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_default_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "CATALOG"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "CATALOG"}
              onChange={() => update({ marketingType: "CATALOG" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('catalog')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_catalog_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "FLOWS"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "FLOWS"}
              onChange={() => update({ marketingType: "FLOWS" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('flows')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_flows_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "ORDER_DETAILS"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "ORDER_DETAILS"}
              onChange={() => update({ marketingType: "ORDER_DETAILS" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('order_details')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_order_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "CALL_PERMISSION"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "CALL_PERMISSION"}
              onChange={() => update({ marketingType: "CALL_PERMISSION" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('calling_permissions_request')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_call_permission_desc')}
              </p>
            </div>
          </label>
        </div>
      )}


      {data.category === "UTILITY" && (
        <div className="space-y-3">
          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "DEFAULT"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "DEFAULT"}
              onChange={() => update({ marketingType: "DEFAULT" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t("default")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_utility_default_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "FLOWS"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "FLOWS"}
              onChange={() => update({ marketingType: "FLOWS" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('flows')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_flows_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "ORDER_STATUS"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "ORDER_STATUS"}
              onChange={() => update({ marketingType: "ORDER_STATUS" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('order_status')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_order_status_desc')}
              </p>
            </div>
          </label>

          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "ORDER_DETAILS"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "ORDER_DETAILS"}
              onChange={() => update({ marketingType: "ORDER_DETAILS" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('order_details')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_order_desc')}
              </p>
            </div>
          </label>
          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "CALL_PERMISSION"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "CALL_PERMISSION"}
              onChange={() => update({ marketingType: "CALL_PERMISSION" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('calling_permissions_request')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_call_permission_desc')}
              </p>
            </div>
          </label>
        </div>
      )}

      {data.category === "AUTHENTICATION" && (
        <div className="space-y-3">
          <label
            className={clsx(
              "flex items-start gap-3 border rounded-md p-4 cursor-pointer transition-colors",
              data.marketingType === "DEFAULT"
                ? "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-black/40"
                : "border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-700/40"
            )}
          >
            <FormCheck.Input
              type="radio"
              className="mt-1 dark:bg-black dark:border-slate-500"
              checked={data.marketingType === "DEFAULT"}
              onChange={() => update({ marketingType: "DEFAULT" })}
            />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('one_time_passcode')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('category_auth_default_desc')}
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}