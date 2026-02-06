import { TemplateData } from "./templateTypes";
import clsx from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  TbPhone,
  TbExternalLink,
  TbCopy,
  TbArrowBackUp,
  TbChevronDown,
  TbShoppingBag,
  TbPhoto,
  TbFileTypePdf,
  TbBrandVisa,
  TbBrandMastercard,
} from "react-icons/tb";

interface TemplatePreviewProps {
  data?: TemplateData;
}

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  isFirst?: boolean;
  hideIcon?: boolean;
}

export const ActionButton = ({
  icon,
  children,
  isFirst = false,
  hideIcon = false,
  className,
  ...props
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "w-full h-10 flex items-center justify-center gap-2",
        "text-[#009de2] dark:text-[#53bdeb] font-bold text-[15px]",
        "hover:bg-slate-50 dark:hover:bg-[#2a3942] transition-colors",
        "active:bg-slate-100 dark:active:bg-[#2a3942]",
        !isFirst && "border-t border-slate-100 dark:border-[#2a3942]",
        className
      )}
      {...props}
    >
      {!hideIcon && icon}
      <span className="truncate max-w-[200px]">{children}</span>
    </button>
  );
};

const AuthenticationTemplate = ({ data }: { data: TemplateData }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-3 pt-3 pb-2 text-sm text-slate-800 dark:text-[#e9edef]">
        <p className="font-bold mb-1 text-[15px]">
          {data.headerText ||
            t("verification_code", { defaultValue: "Verification Code" })}
        </p>
        <p className="whitespace-pre-wrap leading-snug text-[15px]">
          {data.body ||
            t("auth_body_placeholder", {
              defaultValue: "Your verification code is {{code}}.",
            })}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-right">
          11:59
        </p>
      </div>

      <div className="border-t border-slate-100 dark:border-[#2a3942]">
        <ActionButton icon={<TbCopy className="w-4 h-4" />} isFirst>
          {t("copy_code")}
        </ActionButton>
      </div>
    </>
  );
};

const UtilityTemplate = ({ data }: { data: TemplateData }) => {
  const { t } = useTranslation();

  const renderBodyContent = () => {
    switch (data.marketingType) {
      case "FLOWS":
        let placeholderFlows = t("utility_body_placeholder", {
          defaultValue: "Your order has been shipped!",
        });

        return (
          <p className="whitespace-pre-wrap leading-snug text-[15px]">
            {data.body || placeholderFlows}
          </p>
        );
      case "ORDER_DETAILS":
        return (
          <div className="mb-2">
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3 mb-3">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
                CHARGE #238990321
              </p>

              <div className="flex items-center gap-2 mb-4">
                <TbFileTypePdf className="w-6 h-6 text-red-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  DiamondCertificate.pdf
                </span>
              </div>

              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Pay with
                </span>
                <div className="flex gap-1">
                  <div className="bg-white border border-slate-200 rounded px-1 py-0.5 flex items-center">
                    <TbBrandVisa className="w-6 h-4 text-[#1A1F71]" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-1 py-0.5 flex items-center">
                    <TbBrandMastercard className="w-6 h-4 text-[#EB001B]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Total
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  R$ 25.000,00
                </span>
              </div>
            </div>

            <p className="whitespace-pre-wrap leading-snug text-[15px]">
              {data.body ||
                t("order_details_body_placeholder", {
                  defaultValue:
                    "Good news! Your order is ready. You'll find the certificate attached.",
                })}
            </p>
          </div>
        );

      case "CALL_PERMISSION":
        return (
          <div className="mb-1 flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <TbPhone className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            </div>
            <div>
              <p className="font-bold text-[15px] text-slate-800 dark:text-slate-200 leading-tight">
                {data.headerText ||
                  t("call_permission_title", {
                    defaultValue: "Can we call you?",
                  })}
              </p>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {data.body ||
                  t("call_permission_body", {
                    defaultValue: "You can update your preference anytime.",
                  })}
              </p>
            </div>
          </div>
        );

      case "ORDER_STATUS":
        let placeholderStatus = t("order_status_placeholder", {
          defaultValue: "Your order status has been updated to: In Progress.",
        });
        return (
          <p className="whitespace-pre-wrap leading-snug text-[15px]">
            {data.body || placeholderStatus}
          </p>
        );

      default:
        let placeholder = t("utility_body_placeholder", {
          defaultValue: "Your order has been shipped!",
        });

        return (
          <p className="whitespace-pre-wrap leading-snug text-[15px]">
            {data.body || placeholder}
          </p>
        );
    }
  };

  const renderButtons = () => {
    if (data.buttons && data.buttons.length > 0) {
      return data.buttons.map((btn, i) => (
        <ActionButton
          key={i}
          isFirst={i === 0}
          hideIcon={data.marketingType !== "ORDER_DETAILS"}
        >
          {btn.text}
        </ActionButton>
      ));
    }

    if (data.marketingType === "ORDER_STATUS") {
      return null;
    }

    if (data.marketingType === "FLOWS") {
      return (
        <>
          <ActionButton isFirst>{t("Share feedback")}</ActionButton>
        </>
      );
    }

    if (data.marketingType === "ORDER_DETAILS") {
      return (
        <>
          <ActionButton icon={<TbCopy className="w-4 h-4" />} isFirst>
            {t("Copy Pix code")}
          </ActionButton>
          <ActionButton icon={<TbExternalLink className="w-4 h-4" />}>
            {t("More ways to pay")}
          </ActionButton>
        </>
      );
    }

    if (data.marketingType === "CALL_PERMISSION") {
      return (
        <ActionButton
          icon={<TbChevronDown className="w-4 h-4" />}
          isFirst
          className="text-[#008069] dark:text-[#00a884]"
        >
          {t("Choose preference")}
        </ActionButton>
      );
    }

    return (
      <ActionButton isFirst hideIcon>
        {t("track_order", { defaultValue: "Track order" })}
      </ActionButton>
    );
  };

  const buttonsContent = renderButtons();

  return (
    <>
      <div className="px-3 pt-3 pb-2 text-sm text-slate-800 dark:text-[#e9edef]">
        {renderBodyContent()}

        {data.footer && (
          <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-2">
            {data.footer}
          </p>
        )}

        <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1 text-right">
          11:59
        </span>
      </div>

      {buttonsContent && (
        <div className="border-t border-slate-100 dark:border-[#2a3942]">
          {buttonsContent}
        </div>
      )}
    </>
  );
};

const MarketingTemplate = ({ data }: { data: TemplateData }) => {
  const { t } = useTranslation();

  const getIcon = (type: string) => {
    switch (type) {
      case "URL":
        return <TbExternalLink className="w-4 h-4" />;
      case "PHONE_NUMBER":
        return <TbPhone className="w-4 h-4" />;
      case "COPY_CODE":
        return <TbCopy className="w-4 h-4" />;
      case "CALL_PERMISSION":
        return <TbChevronDown className="w-4 h-4" />;
      default:
        return <TbArrowBackUp className="w-4 h-4" />;
    }
  };

  const renderSpecificContent = () => {
    switch (data.marketingType) {
      case "CATALOG":
        return (
          <div className="mb-3">
            <div className="bg-slate-100 dark:bg-slate-800 rounded flex overflow-hidden h-[80px] items-center cursor-pointer border border-slate-200 dark:border-slate-700">
              <div className="w-[80px] h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <TbShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <div className="px-3 py-2 flex flex-col justify-center h-full">
                <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200 leading-tight line-clamp-2">
                  {data.headerText ||
                    t("view_catalog_title", {
                      defaultValue: "View Business Catalog",
                    })}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  WhatsApp Business Account
                </span>
              </div>
            </div>
          </div>
        );

      case "ORDER_DETAILS":
        return (
          <div className="mb-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
              CHARGE #238990321
            </p>
            <div className="flex items-center gap-2 mb-4">
              <TbFileTypePdf className="w-6 h-6 text-red-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                DiamondCertificate.pdf
              </span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pay with
              </span>
              <div className="flex gap-1">
                <div className="bg-white border border-slate-200 rounded px-1 py-0.5 flex items-center">
                  <TbBrandVisa className="w-6 h-4 text-[#1A1F71]" />
                </div>
                <div className="bg-white border border-slate-200 rounded px-1 py-0.5 flex items-center">
                  <TbBrandMastercard className="w-6 h-4 text-[#EB001B]" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Total
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                R$ 25.000,00
              </span>
            </div>
          </div>
        );

      case "CALL_PERMISSION":
        return (
          <div className="mb-2 flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <TbPhone className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            </div>
            <div>
              <p className="font-bold text-[15px] text-slate-800 dark:text-slate-200 leading-tight">
                {data.headerText ||
                  t("call_permission_title", {
                    defaultValue: "Can Jasper's Market call you?",
                  })}
              </p>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {data.body ||
                  t("call_permission_body", {
                    defaultValue:
                      "You can update your preference anytime in the business profile.",
                  })}
              </p>
            </div>
          </div>
        );

      default:
        if (data.headerType === "text") {
          return (
            <p
              className={clsx(
                "font-bold mb-1 text-[15px]",
                !data.headerText && "text-slate-400 dark:text-slate-600"
              )}
            >
              {data.headerText ||
                t("header_text_placeholder", { defaultValue: "Header text" })}
            </p>
          );
        }
        return null;
    }
  };

  const renderButtons = () => {
    if (data.buttons && data.buttons.length > 0) {
      return data.buttons.map((btn, i) => (
        <ActionButton key={i} isFirst={i === 0} icon={getIcon(btn.type)}>
          {btn.text}
        </ActionButton>
      ));
    }

    switch (data.marketingType) {
      case "CATALOG":
        return <ActionButton isFirst>{t("View catalog")}</ActionButton>;

      case "FLOWS":
        return <ActionButton isFirst>{t("Sign up")}</ActionButton>;

      case "ORDER_DETAILS":
        return (
          <>
            <ActionButton icon={<TbCopy className="w-4 h-4" />} isFirst>
              {t("Copy Pix code")}
            </ActionButton>
            <ActionButton icon={<TbExternalLink className="w-4 h-4" />}>
              {t("More ways to pay")}
            </ActionButton>
          </>
        );

      case "CALL_PERMISSION":
        return (
          <ActionButton
            icon={<TbChevronDown className="w-4 h-4" />}
            isFirst
            className="text-[#008069] dark:text-[#00a884]"
          >
            {t("Choose preference")}
          </ActionButton>
        );

      default:
        return (
          <>
            <ActionButton icon={<TbExternalLink className="w-4 h-4" />} isFirst>
              {t("Shop now")}
            </ActionButton>
            <ActionButton icon={<TbCopy className="w-4 h-4" />}>
              {t("copy_code")}
            </ActionButton>
          </>
        );
    }
  };

  const showHeader =
    ["DEFAULT", "FLOWS", "MARKETING", undefined, ""].includes(
      data.marketingType
    ) &&
    (data.headerType === "image" ||
      data.headerType === "video" ||
      data.headerType === "none");

  return (
    <>
      {showHeader && (
        <div className="w-full h-40 bg-slate-200 dark:bg-black flex items-center justify-center border-b border-slate-100 dark:border-slate-700/50">
          {data.headerType === "video" ? (
            <span className="text-xs text-slate-400">
              {t("video_preview", { defaultValue: "Video" })}
            </span>
          ) : (
            <TbPhoto className="w-8 h-8 text-slate-400 opacity-50" />
          )}
        </div>
      )}

      <div className="px-3 pt-3 pb-2 text-sm text-slate-800 dark:text-[#e9edef]">
        {renderSpecificContent()}

        {data.marketingType !== "CALL_PERMISSION" && (
          <p
            className={clsx(
              "whitespace-pre-wrap leading-snug text-[15px]",
              !data.body && "text-slate-400 dark:text-slate-600 italic"
            )}
          >
            {data.body ||
              t("body_text_placeholder", {
                defaultValue: "Your text here...",
              })}
          </p>
        )}

        {data.footer && (
          <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-2">
            {data.footer}
          </p>
        )}

        <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1 text-right select-none">
          11:59
        </span>
      </div>

      <div className="border-t border-slate-100 dark:border-[#2a3942]">
        {renderButtons()}
      </div>
    </>
  );
};

export default function TemplatePreview({ data }: TemplatePreviewProps) {
  if (!data) return null;
  const { t } = useTranslation();
  
  const CATEGORY_RENDERERS: Record<string, React.FC<any>> = {
    AUTHENTICATION: AuthenticationTemplate,
    UTILITY: UtilityTemplate,
    MARKETING: MarketingTemplate,
  };

  const renderContent = () => {
    const Renderer = data.category ? CATEGORY_RENDERERS[data.category] : null;

    if (Renderer) return <Renderer data={data} />;
  };

  return (
    <div className="w-[420px] shrink-0 mx-auto xl:mx-0 animate-fadeIn">      
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black shadow-sm sticky top-4">        
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("template_preview")}
          </h3>
        </div>

        <div className="bg-[#f3efe8] dark:bg-[#0b141a] p-6 min-h-[400px] flex flex-col  bg-opacity-90 transition-colors duration-300">
          <div className="max-w-[300px] w-full bg-white dark:bg-[#202c33] rounded-lg shadow-sm overflow-hidden relative transition-colors duration-300">
            {renderContent()}
          </div>
        </div>

        <div className="px-4 py-4 space-y-2 bg-slate-50 dark:bg-black rounded-b-lg border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {t("category")}:
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {data.category || "MARKETING"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {t("language")}:
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {data.language}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}