import { useGetAllConnectionsQuery } from "@/api/connectionsApi";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import {
  TbFileDescription,
  TbChartBar,
  TbMagnet,
  TbDeviceMobile,
  TbBrandThreads,
  TbBrandWhatsapp,
  TbTarget,
  TbLink,
  TbBrandInstagram,
  TbCode,
  TbVideo,
  TbBrandFacebook,
} from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

export default function AllConnections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { workspace_id } = useParams();

  const { data, isLoading, error } = useGetAllConnectionsQuery({
    workspace: workspace_id,
  });

  const items = [
    {
      id: "catalog_management",
      title: t("catalog_management"),
      description: t("catalog_management_desc"),
      icon: () => <TbFileDescription className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "facebook_ads",
      title: "Facebook Ads (Conectar)",
      description: "Importar pixel automaticamente via OAuth",
      icon: () => <TbBrandFacebook className="stroke-1 text-gray-600 dark:text-gray-300" />,
    },
    {
      id: "messenger_customer_messaging",
      title: t("messenger_customer_messaging"),
      description: t("messenger_customer_messaging_desc"),
      icon: () => <TbDeviceMobile className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "whatsapp_messaging",
      title: t("whatsapp_messaging"),
      description: t("whastapp_messaging_description"),
      icon: () => <TbBrandWhatsapp className="stroke-1 text-gray-600 dark:text-gray-300" />,
    },
    {
      id: "fundraising_campaigns",
      title: t("fundraising_campaigns"),
      description: t("fundraising_campaigns_desc"),
      icon: () => <TbTarget className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "instagram",
      title: t("instagram"),
      description: t("instagram_content_desc"),
      icon: () => <TbBrandInstagram className="stroke-1 text-gray-600 dark:text-gray-300" />,
    },
    {
      id: "live_video_api",
      title: t("live_video_api"),
      description: t("live_video_api_desc"),
      icon: () => <TbVideo className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "oembed_embeds",
      title: t("oembed_embeds"),
      description: t("oembed_embeds_desc"),
      icon: () => <TbCode className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "website",
      title: t("pages_management"),
      description: t("pages_management_desc"),
      icon: () => <TbFileDescription className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "marketing_ads_management",
      title: t("marketing_ads_management"),
      description: t("marketing_ads_management_desc"),
      icon: () => <TbFileDescription className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "marketing_ads_measurement",
      title: t("marketing_ads_measurement"),
      description: t("marketing_ads_measurement_desc"),
      icon: () => <TbChartBar className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "marketing_lead_ads",
      title: t("marketing_lead_ads"),
      description: t("marketing_lead_ads_desc"),
      icon: () => <TbMagnet className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "app_ads_campaigns",
      title: t("app_ads_campaigns"),
      description: t("app_ads_campaigns_desc"),
      icon: () => <TbDeviceMobile className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "threads_api",
      title: t("threads_api"),
      description: t("threads_api_desc"),
      icon: () => <TbBrandThreads className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
    {
      id: "live_video_api",
      title: t("live_video_api"),
      description: t("live_video_api_desc"),
      icon: () => <TbVideo className="stroke-1 text-gray-600 dark:text-gray-300" />,
      disabled: true,
    },
  ];

  const connectionsCount: Record<string, number> = {};
  if (data?.results) {
    data.results.forEach((conn) => {
      const key = conn?.scope?.toLowerCase();
      connectionsCount[key] = (connectionsCount[key] || 0) + 1;
    });
  }

  return (
    <div className="w-full mx-auto py-6 space-y-6 text-white mt-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{t('use_cases')}</h1>
        </div>

        <p className="text-sm max-w-2xl text-white">
          {t('use_cases_description')}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => !item?.disabled && navigate(`connections/${item.id}`)}
            className={clsx(
              "flex items-start justify-between p-4 rounded-2xl border transition shadow-sm",
              "bg-white dark:bg-black border-gray-200 dark:border-gray-700",
              item.disabled
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "cursor-pointer hover:bg-gray-50 dark:hover:bg-darkmode-600 hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-4 mr-8">
              <div className="text-3xl"><item.icon /></div>
              <div>
                <h2 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="min-w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-inner">
                {connectionsCount[item.id] || 0}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}