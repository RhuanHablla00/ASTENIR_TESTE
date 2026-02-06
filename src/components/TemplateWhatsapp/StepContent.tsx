import { Controller, UseFormReturn } from "react-hook-form";
import { FormInput, FormTextarea, FormCheck } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import TomSelect from "../Base/TomSelect";
import languages from "@/utils/languages";
import { useTranslation } from "react-i18next";
import { ButtonType, TemplateButton, TemplateData, templateNameSchema } from "./templateTypes";
import { useState } from "react";
import clsx from "clsx";
import {
  TbChevronDown,
  TbCopy,
  TbGripVertical,
  TbLink,
  TbMessage,
  TbPhone,
  TbPlus,
  TbTrash,
  TbInfoCircle,
  TbBuildingStore,
  TbClick
} from "react-icons/tb";

interface StepContentProps {
  form: UseFormReturn<any>;
  data: TemplateData & {
    securityRecommendation?: boolean;
    codeExpiration?: boolean;
    validityPeriod?: number;
    useCustomValidity?: boolean;
    packageName?: string;
    appSignature?: string;
    zeroTapTermsAccepted?: boolean;
  };
  validationErrors: {
    header?: string;
    body?: string;
  };
  update: (patch: Partial<TemplateData> | any) => void;
  refs: {
    headerInputRef: React.MutableRefObject<HTMLInputElement | null>;
    bodyTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  };
  handlers: {
    addVariable: (type: "header" | "body") => void;
    handleHeaderChange: (val: string) => void;
    handleBodyChange: (val: string) => void;
    handleExampleChange: (type: "header" | "body", index: number, val: string) => void;
  };
  variables: {
    headerVariables: string[];
    bodyVariables: string[];
  };
  buttonActions: {
    addButton: (type: ButtonType) => void;
    removeButton: (index: number) => void;
    updateButton: (index: number, field: keyof TemplateButton, value: any) => void;
    getButtonCounts: () => {
      URL: number;
      PHONE_NUMBER: number;
      COPY_CODE: number;
      QUICK_REPLY: number;
      TOTAL: number;
    };
  };
}

export default function StepContent({ form, data, update, refs, handlers, variables, buttonActions, validationErrors }: StepContentProps) {
  const { register, control, setValue, formState: { errors } } = form;
  const { t } = useTranslation();
  const [isButtonMenuOpen, setIsButtonMenuOpen] = useState(false);

  const isAuth = data.category === "AUTHENTICATION";
  const isCatalog = data.marketingType === "CATALOG";
  const isCallPermission = data.marketingType === "CALL_PERMISSION";
  const isOrderDetails = data.marketingType === "ORDER_DETAILS";
  const isOrderStatus = data.marketingType === "ORDER_STATUS";
  const isFlows = data.marketingType === "FLOWS";
  const hasFixedButton = isCatalog || isCallPermission || isFlows || isOrderDetails;
  const counts = buttonActions.getButtonCounts();

  const buttonOptions = [
    { type: "QUICK_REPLY", label: "Custom (Quick Reply)", icon: TbMessage, limit: 10, current: counts.QUICK_REPLY },
    { type: "URL", label: "Visit Website", icon: TbLink, limit: 2, current: counts.URL },
    { type: "PHONE_NUMBER", label: "Call Phone Number", icon: TbPhone, limit: 1, current: counts.PHONE_NUMBER },
    { type: "COPY_CODE", label: "Copy Offer Code", icon: TbCopy, limit: 1, current: counts.COPY_CODE },
  ];

  if (isAuth) {
    const showAppSetup = data.codeDeliveryMethod === "ZERO_TAP" || data.codeDeliveryMethod === "ONE_TAP";

    return (
      <div className="space-y-6 h-full overflow-y-auto pr-2 pb-20">

        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('template_name_language')}</h3>
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-12 md:col-span-8 space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('name_your_template')}</label>
              <div className="relative">
                <FormInput
                  type="text"
                  placeholder={t("template_name")}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parsed = templateNameSchema.safeParse(value);
                    if (parsed.success) update({ name: parsed.data });
                  }}
                  className="w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500"
                />
                {errors.templateName && <p className="text-xs text-red-500 dark:text-red-400">{errors.templateName.message as string}</p>}
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('language')}</label>
              <TomSelect
                value={data.language}
                onChange={(e: any) => update({ language: e.target.value })}
                options={{
                  placeholder: t("select_your_country"),
                  maxOptions: undefined,
                }}
                className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200"
              >
                {languages.getAll().map((item, index) => (
                  <option key={index} value={item.code || item.name}>
                    {item.name}
                  </option>
                ))}
              </TomSelect>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('code_delivery_setup')}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('choose_code_delivery_setup')}
          </p>

          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <FormCheck.Input
                  type="radio"
                  name="delivery_method"
                  checked={data.codeDeliveryMethod === "ZERO_TAP"}
                  onChange={() => update({ codeDeliveryMethod: "ZERO_TAP" })}
                  className="dark:bg-black dark:border-slate-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t('zero_tap_autofill')} <TbInfoCircle className="inline w-3 h-3 text-slate-400 dark:text-slate-500" /></span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t('send_code_automatically')}</span>
                </div>
              </label>

              {data.codeDeliveryMethod === "ZERO_TAP" && (
                <div className="ml-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-md">
                  <label className="flex gap-2 cursor-pointer">
                    <FormCheck.Input
                      type="checkbox"
                      className="mt-0.5 border-red-300 dark:border-red-500 dark:bg-black"
                      checked={data.zeroTapTermsAccepted}
                      onChange={(e) => update({ zeroTapTermsAccepted: e.target.checked })}
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {t('selecting_zero_tap_understand_terms')} <span className="text-blue-600 dark:text-blue-400">{t('read_more')}</span>
                    </span>
                  </label>
                  {!data.zeroTapTermsAccepted && (
                    <p className="text-[10px] text-red-500 dark:text-red-400 ml-6">{t('box_must_be_checked_template')}</p>
                  )}
                </div>
              )}
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <FormCheck.Input
                type="radio"
                name="delivery_method"
                checked={data.codeDeliveryMethod === "ONE_TAP"}
                onChange={() => update({ codeDeliveryMethod: "ONE_TAP" })}
                className="dark:bg-black dark:border-slate-500"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t('one_tap_autofill')} <TbInfoCircle className="inline w-3 h-3 text-slate-400 dark:text-slate-500" /></span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{t('code_sends_when_customers_tap_button')}</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <FormCheck.Input
                type="radio"
                name="delivery_method"
                checked={data.codeDeliveryMethod === "COPY_CODE"}
                onChange={() => update({ codeDeliveryMethod: "COPY_CODE" })}
                className="dark:bg-black dark:border-slate-500"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t('copy_code')}<TbInfoCircle className="inline w-3 h-3 text-slate-400 dark:text-slate-500" /></span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{t('basic_auth_with_quick_setup')}</span>
              </div>
            </label>
          </div>
        </div>

        {showAppSetup && (
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('app_setup')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('you_can_add_up_to_5_apps')}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('package_name')}</label>
                <FormInput
                  type="text"
                  placeholder="com.example.myapplication"
                  value={data.packageName || ""}
                  onChange={(e) => update({ packageName: e.target.value })}
                  className={clsx("w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500", !data.packageName && "border-red-300 dark:border-red-500")}
                />
                {!data.packageName && <p className="text-[10px] text-red-500 dark:text-red-400">{t('add_text_in_required_fields')}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('app_signature_hash')}</label>
                <FormInput
                  type="text"
                  placeholder="Enter text"
                  value={data.appSignature || ""}
                  onChange={(e) => update({ appSignature: e.target.value })}
                  className={clsx("w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500", !data.appSignature && "border-red-300 dark:border-red-500")}
                />
              </div>
            </div>

            <Button type="button" variant="outline-secondary" size="sm" className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Add another app</Button>
          </div>
        )}

        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('content')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('content_message_template')}
            </p>
          </div>

          <div className="space-y-3 pl-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <FormCheck.Input
                type="checkbox"
                checked={data.securityRecommendation || false}
                onChange={(e) => update({ securityRecommendation: e.target.checked })}
                className="dark:bg-black dark:border-slate-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{t('add_security_recommendation')}</span>
            </label>

            <div className="space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <FormCheck.Input
                  type="checkbox"
                  checked={data.codeExpiration || false}
                  onChange={(e) => update({ codeExpiration: e.target.checked })}
                  className="dark:bg-black dark:border-slate-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{t('add_expiration_time_for_the_code')}</span>
              </label>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-6">{t('after_the_expires_autofill_button_disabled')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 pb-20">
      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t('template_name_language')}
        </h3>

        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="space-y-1 col-span-8">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('name_your_template')}
            </label>

            <div className="relative">
              <FormInput
                type="text"
                placeholder={t('template_name')}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsed = templateNameSchema.safeParse(value);
                  if (parsed.success) {
                    update({ name: parsed.data })
                  }
                }}
                className="w-full rounded-md px-3 py-2 text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500"
              />
              {errors.templateName && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.templateName.message as string}
                </p>
              )}
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 dark:text-slate-500">
                0/512
              </span>
            </div>
          </div>

          <div className="space-y-1 col-span-4 max-w-xs">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('language')}
            </label>
            <TomSelect
              value={data.language}
              onChange={(e: any) => update({ language: e.target.value })}
              options={{
                placeholder: t("select_your_country"),
                maxOptions: undefined,
              }}
              className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200"
            >
              {languages.getAll().map((item, index) => (
                <option key={index} value={item.code || item.name}>
                  {item.name}
                </option>
              ))}
            </TomSelect>
          </div>
        </div>
      </div>

      {isCatalog && (
        <>
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('catalog_format')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('choose_message_format')}</p>

            <div className="space-y-3 mt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <FormCheck.Input
                  type="radio"
                  checked={data.catalogFormat === "CATALOG_MESSAGE"}
                  onChange={() => update({ catalogFormat: "CATALOG_MESSAGE" })}
                  className="dark:bg-black dark:border-slate-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t('catalog_message')}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t('include_entire_catalog')}</span>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <FormCheck.Input
                  type="radio"
                  checked={data.catalogFormat === "MULTI_PRODUCT_MESSAGE"}
                  onChange={() => update({ catalogFormat: "MULTI_PRODUCT_MESSAGE" })}
                  className="dark:bg-black dark:border-slate-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t('multi_product_message')}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t('include_up_to_30_products')}</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('catalog_setup')}</h3>
            <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-600 rounded p-3 flex gap-2 items-start">
              <TbInfoCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('you_cannot_add_media_to_this_template')}
              </p>
            </div>
            <Button variant="primary" type="button" className="mt-2">{t('connect_catalog')}</Button>
          </div>
        </>
      )}

      <div className="col-span-12 md:col-span-4 space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('type_of_variable')}</label>
        <TomSelect
          value={data.parameter_format || "number"}
          onChange={(e: any) => update({ parameter_format: e.target.value })}
          options={{
            placeholder: t("select_variable_type"),
          }}
          className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200"
        >
          {[{ name: t('number'), value: 'positional' }, { name: t('text'), value: 'named' }].map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </TomSelect>
      </div>

      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('content')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('add_a_header_body_footer')}
            <span className="text-blue-600 dark:text-blue-400 cursor-pointer ml-1">{t('learn_more')}</span>
          </p>
        </div>

        {!(isCatalog || isOrderStatus) && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">{t('header')}</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "none", label: t('none') },
                { key: "text", label: t('text') },
                { key: "image", label: t('image') },
                { key: "video", label: t('video') },
                { key: "document", label: t('document') },
              ]
                .filter((item) => {
                  if (isOrderDetails) {
                    return ["image", "document"].includes(item.key);
                  }
                  return true;
                })
                .map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => update({ headerType: item.key as any })}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${data.headerType === item.key
                      ? "border-cyan-700 bg-white text-cyan-700 dark:border-cyan-500 dark:bg-black dark:text-cyan-400"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
            </div>

            {data.headerType === "text" && (
              <FormInput
                ref={refs.headerInputRef}
                type="text"
                value={data.headerText}
                onChange={(e) => handlers.handleHeaderChange(e.target.value)}
                placeholder={t('insert_your_header_here')}
                maxLength={60}
                className="dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500"
              />
            )}

            {["image", "document", "video"].includes(data.headerType) && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <FormInput
                    type="text"
                    placeholder={t('insert_the_file_link_here')}
                    className="flex-1 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none dark:bg-black dark:text-slate-200 dark:placeholder-slate-500"
                  />
                  <Button type="button" variant="primary">Upload</Button>
                </div>
              </div>
            )}

            {validationErrors.header && (
              <span className="text-red-500 text-sm block">{validationErrors.header}</span>
            )}

            {data.headerType !== "none" && (
              <button
                type="button"
                onClick={() => handlers.addVariable("header")}
                className="text-sm hover:underline flex items-center gap-1 ml-auto"
                disabled={variables.headerVariables?.length > 0}
              >
                <span className="text-cyan-700 dark:text-cyan-400">+ {t('add_header_variables')}</span>
              </button>
            )}
          </div>
        )}

        {/* BODY */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('body')}</label>
          </div>
          <FormTextarea
            ref={refs.bodyTextareaRef}
            rows={4}
            value={data.body}
            onChange={(e) => handlers.handleBodyChange(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm resize-none dark:bg-black dark:text-slate-200"
          />
          {validationErrors.body && (
            <span className="text-red-500 text-sm mt-1 block">{validationErrors.body}</span>
          )}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 text-slate-500 dark:text-slate-400 text-sm">
              <span>😊</span>
              <span className="font-bold">B</span>
              <span className="italic">I</span>
              <span className="underline">S</span>
            </div>
            <button
              type="button"
              onClick={() => handlers.addVariable("body")}
              className="text-sm text-cyan-700 dark:text-cyan-400 hover:underline"
            >
              + {t('add_body_variables')}
            </button>
          </div>
        </div>

        {/* VARIABLES */}
        {!(variables.headerVariables.length === 0 && variables.bodyVariables.length === 0) && (
          <div className="bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('variables')}</h4>

            {/* --- HEADER VARIABLES --- */}
            {variables.headerVariables.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('header')}</label>
                {variables.headerVariables.map((variable, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={variable}
                      disabled
                      className="w-32 bg-slate-100 dark:bg-black border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm text-slate-600 dark:text-slate-300"
                    />

                    <input
                      type="text"
                      placeholder={t('insert_your_variable_value')}
                      value={data.variableExamples?.header?.[index] || ""}
                      required={true}
                      onChange={(e) => handlers.handleExampleChange("header", index, e.target.value)}
                      className="flex-1 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1 text-sm dark:bg-black dark:text-slate-200 dark:placeholder-slate-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {variables.bodyVariables.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('body')}</label>
                {variables.bodyVariables.map((variable, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={variable}
                      disabled
                      className="w-32 bg-slate-100 dark:bg-black border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm text-slate-600 dark:text-slate-300"
                    />

                    <input
                      type="text"
                      placeholder={t('insert_your_variable_value')}
                      value={data.variableExamples?.body?.[index] || ""}
                      required={true}
                      onChange={(e) => handlers.handleExampleChange("body", index, e.target.value)}
                      className="flex-1 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1 text-sm dark:bg-black dark:text-slate-200 dark:placeholder-slate-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('footer')} <span className="text-slate-400 dark:text-slate-500 font-normal">{t('optional')}</span></label>
            <span className="text-xs text-slate-400 dark:text-slate-500">0/60</span>
          </div>
          <FormInput type="text" placeholder="Enter text" value={data.footer} onChange={(e) => update({ footer: e.target.value })} className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm dark:bg-black dark:text-slate-200 dark:placeholder-slate-500" />
        </div>
      </div>

      {!isOrderStatus && (
        <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t('buttons')} <span className="text-slate-400 dark:text-slate-500 font-normal">{t('optional')}</span></h3>
            {hasFixedButton ? (
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                <TbInfoCircle className="w-3 h-3" />
                {t('only_one_button_is_supported_for_this_type_template')}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('create_buttons_that_let_customers_respond')}</p>
            )}
          </div>

          {hasFixedButton ? (
            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 shadow-sm opacity-70 cursor-not-allowed flex gap-3 items-center">
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('button_text')}</label>
                <FormInput
                  disabled
                  value={isCatalog ? t("view_catalog") : isCallPermission ? t('choose_preferences') : isFlows ? t("sign_up") : t("copy_pix_code")}
                  className="w-full bg-slate-100 dark:bg-black text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 text-sm"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsButtonMenuOpen(!isButtonMenuOpen)}
                  className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 rounded-md px-4 py-2 text-sm bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200"
                >
                  <TbPlus className="w-4 h-4" /> {t('add_button')} <TbChevronDown className="w-4 h-4" />
                </button>

                {isButtonMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-50 py-1">
                    {buttonOptions.map((opt) => {
                      const isDisabled = opt.current >= opt.limit || counts.TOTAL >= 10;
                      return (
                        <button
                          key={opt.type}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            buttonActions.addButton(opt.type as ButtonType);
                            setIsButtonMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <opt.icon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary" />
                            {opt.label}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {opt.limit > 1 ? `${opt.current}/${opt.limit}` : (opt.current === 1 ? "Max 1" : "")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {isOrderDetails}
                {data.buttons.map((btn: any, index: number) => (
                  <div key={index} className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 flex gap-4 items-start shadow-sm group">
                    <div className="pt-3 text-slate-300 dark:text-slate-500 cursor-move"><TbGripVertical className="w-4 h-4" /></div>
                    <div className="flex-1 grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-3 space-y-1">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('type_of_action')}</label>
                        <TomSelect
                          value={btn.type}
                          onChange={() => { }}
                          options={{ placeholder: t('select_type') }}
                          className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200"
                          disabled
                        >
                          <option value="QUICK_REPLY">{t('quick_reply')}</option>
                          <option value="URL">{t('visit_website')}</option>
                          <option value="PHONE_NUMBER">{t('call_phone_number')}</option>
                          <option value="COPY_CODE">{t('copy_offer_code')}</option>
                        </TomSelect>
                      </div>

                      <div className="col-span-12 md:col-span-4 space-y-1">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('button_text')}</label>
                        <FormInput type="text" value={btn.text} onChange={(e) => buttonActions.updateButton(index, "text", e.target.value)} maxLength={25} placeholder={t('click_here')} className="w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500" />
                        <div className="text-right text-[10px] text-slate-400 dark:text-slate-500">{btn.text.length}/25</div>
                      </div>

                      {btn.type === "URL" && (
                        <>
                          <div className="col-span-12 md:col-span-2 space-y-1">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('url_type')}</label>
                            <TomSelect value={btn.urlType} onChange={(e: any) => buttonActions.updateButton(index, "urlType", e.target.value)} options={{ placeholder: t('select_type') }} className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200">
                              <option value="STATIC">{t('static')}</option>
                              <option value="DYNAMIC">{t('dynamic')}</option>
                            </TomSelect>
                          </div>
                          <div className="col-span-12 md:col-span-3 space-y-1">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('website_url')}</label>
                            <FormInput type="text" placeholder="https://example.com" value={btn.url || ""} onChange={(e) => buttonActions.updateButton(index, "url", e.target.value)} className="w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500" />
                          </div>
                        </>
                      )}

                      {btn.type === "PHONE_NUMBER" && (
                        <>
                          <div className="col-span-12 md:col-span-2 space-y-1">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('country')}</label>
                            <TomSelect value={btn.countryCode} onChange={(e: any) => buttonActions.updateButton(index, "countryCode", e.target.value)} options={{ placeholder: "Select Country" }} className="w-full dark:bg-black dark:border-slate-600 dark:text-slate-200">
                              <option value="BR">🇧🇷 +55</option>
                              <option value="US">🇺🇸 +1</option>
                            </TomSelect>
                          </div>
                          <div className="col-span-12 md:col-span-3 space-y-1">
                            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('phone_number')}</label>
                            <FormInput type="text" placeholder="1199999999" value={btn.phoneNumber || ""} onChange={(e) => buttonActions.updateButton(index, "phoneNumber", e.target.value)} className={clsx("w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500", !btn.phoneNumber && "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20")} />
                            {!btn.phoneNumber && <p className="text-[10px] text-red-500 dark:text-red-400">{t('required')}</p>}
                          </div>
                        </>
                      )}

                      {btn.type === "COPY_CODE" && (
                        <div className="col-span-12 md:col-span-5 space-y-1">
                          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('offer_code')}</label>
                          <FormInput type="text" placeholder="SUMMER20" value={btn.offerCode || ""} onChange={(e) => buttonActions.updateButton(index, "offerCode", e.target.value)} className="w-full text-sm dark:bg-black dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500" />
                        </div>
                      )}
                    </div>
                    <button type="button" onClick={() => buttonActions.removeButton(index)} className="pt-3 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><TbTrash className="w-4 h-4" /></button>
                  </div>
                ))}

                {data.buttons.length === 0 && (
                  <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-md text-slate-400 dark:text-slate-500 text-sm">
                    {t('no_buttons_added_yet')}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-md p-4 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
          {t('message_validity_period')} <TbInfoCircle className="text-slate-400 dark:text-slate-500 w-3 h-3" />
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('recommended_set_custom_validity_period')}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('set_custom_validity_period')}</span>
          <FormCheck.Input
            type="checkbox"
            className="toggle dark:bg-black dark:border-slate-500"
            checked={data.useCustomValidity || false}
            onChange={(e) => update({ useCustomValidity: e.target.checked })}
          />
        </div>

        {data.useCustomValidity && (
          <div className="mt-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('validity_period')}</label>
            <TomSelect
              value={data.validityPeriod?.toString() || "10"}
              onChange={(e: any) => update({ validityPeriod: parseInt(e.target.value) })}
              options={{ placeholder: "Select" }}
              className="w-full mt-1 dark:bg-black dark:border-slate-600 dark:text-slate-200"
            >
              <option value="5">5 {t('minutes')}</option>
              <option value="10">10 {t('minutes')}</option>
              <option value="15">15 {t('minutes')}</option>
            </TomSelect>
          </div>
        )}
      </div>
    </div>
  );
}