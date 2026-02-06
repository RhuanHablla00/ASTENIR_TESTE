import Lucide from "@/components/Base/Lucide";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const menuItems = [
  { label: "settings", icon: "Settings", path: "" },
  { label: "workspace_info", icon: "List", path: "/workspace-info" },
  { label: "workspace_deactivation", icon: "Lock", path: "/deactivation", disabled: true },
  { label: "users", icon: "User", path: "/users", disabled: true },
];

export default function WorkspaceSettings() {
  const { pathname } = useLocation();
  const { workspace_id } = useParams();
  const { t } = useTranslation();

  const base = `/workspace/${workspace_id}/workspace-settings`;

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            {t("workspace_settings")}
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="relative col-span-12 xl:col-span-3">
            <div className="sticky top-[104px]">
              <div className="flex flex-col px-5 pt-5 pb-6 box box--stacked">
                
                {menuItems.map((item) => {
                  const fullPath = `${base}${item.path}`;
                  
                  const isActive = item.path === '' 
                    ? pathname === base 
                    : pathname.includes(fullPath);

                  return (
                    <Link
                      key={item.label}
                      to={item.disabled ? "#" : fullPath}
                      onClick={(e) => item.disabled && e.preventDefault()}
                      className={clsx([
                        "flex items-center py-3 transition-colors first:-mt-3 last:-mb-3",
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

          <div className="flex flex-col col-span-12 xl:col-span-9 gap-y-7">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
