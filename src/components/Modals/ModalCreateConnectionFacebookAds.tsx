import { useEffect, useState } from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useAuthenticateMetaApiMutation } from "@/api/connectionsApi";
import { useTranslation } from "react-i18next";
import { showErrorNotification, showSuccessNotification } from "../Base/Notification";
import { useFacebookBusinessDisconnectMutation } from "@/api/authApi";

declare global {
  interface Window {
    FB: any;
  }
}

export default function ModalCreateConnectionFacebookAds({ onSuccess }: { onSuccess: () => void; }) {
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false);
  const [authenticateMeta, { isLoading }] = useAuthenticateMetaApiMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!fbSdkLoaded) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/pt_BR/sdk.js";
      script.async = true;
      script.onload = () => {
        window.FB.init({
          appId: "1013969894244814",
          cookie: true,
          xfbml: true,
          version: 'v23.0',
        });
        setFbSdkLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [fbSdkLoaded]);

  const handleConnect = () => {
    window.FB.login(
      (response: any) => {
        console.log("response", response);

        if (response.status === "connected" && response.authResponse) {
          const { accessToken } = response.authResponse;

          if (accessToken) {
            authenticateMeta({
              access_token: accessToken,
            })
              .unwrap()
              .then(() => {
                showSuccessNotification(t("connection_created_successfully"));
                onSuccess();
              })
              .catch((err: any) => {
                console.error("Erro ao criar conexão:", err);
                showErrorNotification(
                  t(`errors:${err?.data?.error_code}`) ||
                  "Erro inesperado ao criar conexão"
                );
              });
          }
        } else {
          console.log("Usuário não conectou ou cancelou.");
        }
      },
      {
        scope: [
          "ads_management",
          "ads_read",
          "leads_retrieval",
          "business_management",
          "pages_show_list",
          "pages_read_engagement",
          "pages_manage_ads",
          "pages_manage_posts",
          "pages_manage_metadata",
          "pages_manage_engagement",
          "pages_read_user_content",
          "pages_messaging",
          "pages_utility_messaging",
          "whatsapp_business_management",
          "whatsapp_business_messaging",
          "whatsapp_business_manage_events",
          "instagram_basic",
          "instagram_content_publish",
          "instagram_manage_comments",
          "instagram_manage_messages",
          "instagram_manage_insights",
          "instagram_manage_contents",
          "instagram_manage_upcoming_events",
          "instagram_shopping_tag_products",
          "instagram_branded_content_ads_brand",
          "instagram_branded_content_brand",
          "instagram_branded_content_creator",
          "instagram_creator_marketplace_discovery",
          "catalog_management",
          "facebook_branded_content_ads_brand",
          "facebook_creator_marketplace_discovery",
          "publish_video",
          "paid_marketing_messages",
          "read_insights",
        ].join(","),
        auth_type: "rerequest",
        return_scopes: true,
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <div className="mb-8 text-center text-slate-600 dark:text-slate-400 max-w-md animate-[fadeIn_0.4s_ease-in-out]">
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-200 mb-2">
          {t('connect_meta_account')}
        </h2>
        <p>
          {t('login_facebook_description')}
        </p>
      </div>

      <div className="w-full max-w-sm animate-[fadeIn_0.4s_ease-in-out]">
        <Button
          type="button"
          variant="primary"
          className="w-full"
          onClick={handleConnect}
          disabled={!fbSdkLoaded || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Lucide icon="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              {t("connecting")}...
            </div>
          ) : (
            "Conectar Facebook / WhatsApp / Instagram"
          )}
        </Button>
      </div>
    </div>
  );
}