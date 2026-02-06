import "@/assets/css/vendors/simplebar.css";
import "@/assets/css/themes/echo.css";
import { useState, createRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "@/components/Base/Headless";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { clearCredentials, selectAuth } from "@/stores/authSlice";
import { useLogoutMutation, useProfileQuery } from "@/api/authApi";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import Lucide from "@/components/Base/Lucide";
import { useTranslation } from "react-i18next";
import { persistor } from "@/stores/store";

function Main() {
  const { user } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const { data: userProfile, isSuccess } = useProfileQuery(undefined, {
  });
  const userPhoto = user ?? userProfile;
  const [topBarActive, setTopBarActive] = useState(false);

  window.onscroll = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setTopBarActive(true);
    } else {
      setTopBarActive(false);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await logoutApi({ refresh_token: refreshToken });
      }

      dispatch(clearCredentials());
      persistor.purge();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(clearCredentials());
      persistor.purge();
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="fixed top-7 right-9 z-20">
        <Menu className="flex gap-2 items-center ml-auto">
          <Menu.Button className="block w-10 h-10 overflow-hidden rounded-full border-[3px] border-white/[0.15] shadow-lg">
            {userPhoto?.photo_url ? (
              <img
                src={userPhoto.photo_url}
                // alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full dark:bg-darkmode-400 bg-slate-200 flex items-center justify-center text-slate-600 dark:text-slate-200 font-bold text-sm select-none">
                {userPhoto?.name?.charAt(0).toUpperCase() || ""}
              </div>
            )}
          </Menu.Button>
          <Menu.Items className="w-56 mt-2 origin-top-right">
            <LanguageSelector />
            <ToggleDarkMode />
            <Menu.Item
              onClick={() => {
                handleLogout();
              }}
            >
              <Lucide icon="Power" className="w-4 h-4 mr-2" />
              {t('logout')}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div
        className={clsx([
          "echo group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen dark:from-darkmode-800/[.95] dark:to-darkmode-900/[.95]",
          "before:content-[''] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed",
          "after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat",
          topBarActive && "background--hidden",
        ])}
      >
        <div
          className={clsx([
            "w-full pt-[54px] pb-16 relative z-10 group mode",
            { "mode--light": !topBarActive },
          ])}
        >
          <div className="px-5 mt-16">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;