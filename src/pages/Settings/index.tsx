import Lucide from "@/components/Base/Lucide";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import AvatarImage from "@/components/AvatarImage";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { useUpdateProfileMutation } from "@/api/authApi";

const menuItems = [
  { label: "profile_info", icon: "AppWindow", path: "" },
  { label: "email_settings", icon: "MailCheck", path: "/email-settings" },
  { label: "security", icon: "KeyRound", path: "/security" },
  {
    label: "preferences",
    icon: "PackageCheck",
    path: "/preferences",
    disabled: true,
  },
  { label: "sessions", icon: "PackageCheck", path: "/sessions" },
  {
    label: "two_factor_authentication",
    icon: "ShieldCheck",
    path: "/two-factor-authentication",
  },
  {
    label: "device_history",
    icon: "Smartphone",
    path: "/device-history",
    disabled: true,
  },
  { label: "permissions", icon: "Lock", path: "/permissions" },
  {
    label: "notification_settings",
    icon: "BellDot",
    path: "/notification-settings",
    disabled: true,
  },
  {
    label: "connected_services",
    icon: "Workflow",
    path: "/connected-services",
    disabled: true,
  },
  {
    label: "social_media_links",
    icon: "Podcast",
    path: "/social-media-links",
    disabled: true,
  },
  { label: "team", icon: "Users", path: "/team" },
  {
    label: "account_deactivation",
    icon: "Trash2",
    path: "/account-deactivation",
    disabled: true,
  },
];

function Main() {
  const { pathname } = useLocation();
  const { workspace_id } = useParams();
  const { t } = useTranslation();
  const { profile } = useSettingsForm();
  const [updateProfile]: any = useUpdateProfileMutation();

  const base = `/workspace/${workspace_id}/settings`;

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            {t("settings")}
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
          {/* MENU LATERAL */}
          <div className="relative col-span-12 xl:col-span-3">
            <div className="sticky top-[104px]">
              <div className="flex flex-col px-5 pt-5 pb-6 box box--stacked">
                {menuItems.map((item) => {
                  const fullPath = `${base}${item.path}`;
                  const isActive =
                    item.path === ""
                      ? pathname === base
                      : pathname.includes(fullPath);

                  return (
                    <Link
                      key={item.label}
                      to={item.disabled ? "#" : fullPath}
                      onClick={(e) => item.disabled && e.preventDefault()}
                      className={clsx([
                        "flex items-center py-3 transition-colors",
                        item.disabled
                          ? "opacity-50 cursor-not-allowed pointer-events-none"
                          : "hover:text-primary",
                        isActive && "text-primary font-medium",
                      ])}
                    >
                      <Lucide
                        icon={item.icon as any}
                        className="stroke-[1.3] w-4 h-4 mr-3"
                      />
                      {t(item.label)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="flex flex-col col-span-12 xl:col-span-9 gap-y-7">
            <div className="p-1.5 box flex flex-col box--stacked">
              <div className="h-60 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
                <div
                  className={clsx([
                    "w-full h-full relative overflow-hidden",
                    "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                    "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
                  ])}
                ></div>

                <AvatarImage
                  initialImage={profile?.photo_url}
                  onConfirm={async (blob) => {
                    const formData = new FormData()
                    formData.append('photo', blob)

                    await updateProfile(formData).unwrap()
                  }}
                />

              </div>

              <div className="p-5 flex flex-col sm:flex-row gap-y-3 sm:items-end rounded-[0.6rem] bg-slate-50 pt-12 dark:bg-darkmode-500" />
            </div>

            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Main;
