import "@/assets/css/vendors/simplebar.css";
import "@/assets/css/themes/echo.css";
import { Transition } from "react-transition-group";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { useState, useEffect, createRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectSideMenu } from "@/stores/sideMenuSlice";
import {
  selectCompactMenu,
  setCompactMenu as setCompactMenuStore,
} from "@/stores/compactMenuSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { FormattedMenu, linkTo, nestedMenu, enter, leave } from "./side-menu";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import SimpleBar from "simplebar";
import { Menu } from "@/components/Base/Headless";
import QuickSearch from "@/components/QuickSearch";
import SwitchAccount from "@/components/SwitchAccount";
import NotificationsPanel from "@/components/NotificationsPanel";
import ActivitiesPanel from "@/components/ActivitiesPanel";
import { useLogoutMutation, useProfileQuery } from "@/api/authApi";
import { clearCredentials, selectAuth } from "@/stores/authSlice";
import LanguageSelector from "@/components/LanguageSelector";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { useTranslation } from "react-i18next";
import WorkspaceSelector from "@/components/WorkspaceSelector.tsx";
import { persistor } from "@/stores/store";
import GenericModal from "@/components/Modals/GenericModal";
import ModalSelectConnection from "@/components/Modals/ModalSelectConnection";
import TomSelect from "@/components/Base/TomSelect";
import timezones from "@/utils/timezones";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "@/components/Base/Form";
import languages from "@/utils/languages";


function Main() {
  const dispatch = useAppDispatch();
  const compactMenu = useAppSelector(selectCompactMenu);
  const form = useForm()
  const { control, formState: { errors } } = form;
  const setCompactMenu = (val: boolean) => {
    localStorage.setItem("compactMenu", val.toString());
    dispatch(setCompactMenuStore(val));
  };
  const [quickSearch, setQuickSearch] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [notificationsPanel, setNotificationsPanel] = useState(false);
  const [activitiesPanel, setActivitiesPanel] = useState(false);
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | string>
  >([]);
  const sideMenuStore = useAppSelector(selectSideMenu);
  const { user } = useAppSelector(selectAuth);
  const workspaceId = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);
  const sideMenu = () => nestedMenu(sideMenuStore, location, workspaceId);
  const scrollableRef = createRef<HTMLDivElement>();
  const [topBarActive, setTopBarActive] = useState(false);
  const [logoutApi] = useLogoutMutation();
  const { t } = useTranslation();


  const { data: userProfile, isSuccess } = useProfileQuery(undefined, {
  });
  const userPhoto = user ?? userProfile;

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


  const toggleCompactMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setCompactMenu(!compactMenu);
  };

  const compactLayout = () => {
    if (window.innerWidth <= 1600) {
      setCompactMenu(true);
    }
  };

  const requestFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    targetLink: string | null;
  }>({
    isOpen: false,
    targetLink: null
  });

  const handleModalTrigger = (trigger: string, link?: string) => {
    if (trigger === "select-connection") {
      setModalState({
        isOpen: true,
        targetLink: link || null
      });
    }
  };

  const handleConnectionSelected = (connection: any) => {
    setModalState({ ...modalState, isOpen: false });

    if (modalState.targetLink && workspaceId) {
      const finalUrl = modalState.targetLink
        .replace(":workspaceId", workspaceId)
        .replace(":connectionId", connection.id);

      navigate(finalUrl);
    }
  };

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current);
    }

    setFormattedMenu(sideMenu());
    compactLayout();

    window.onresize = () => {
      compactLayout();
    };
  }, [sideMenuStore, location, workspaceId]);

  window.onscroll = () => {
    // Topbar
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setTopBarActive(true);
    } else {
      setTopBarActive(false);
    }
  };

  return (
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
          "xl:ml-0 shadow-xl transition-[margin,padding] duration-300 xl:shadow-none fixed top-0 left-0 z-50 side-menu group inset-y-0 xl:py-3.5 xl:pl-3.5",
          "after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:xl:hidden",
          { "side-menu--collapsed": compactMenu },
          { "side-menu--on-hover": compactMenuOnHover },
          { "ml-0 after:block": activeMobileMenu },
          { "-ml-[275px] after:hidden": !activeMobileMenu },
        ])}
      >
        <div
          className={clsx([
            "fixed ml-[275px] w-10 h-10 items-center justify-center xl:hidden z-50",
            { flex: activeMobileMenu },
            { hidden: !activeMobileMenu },
          ])}
        >
          <a
            href=""
            onClick={(event) => {
              event.preventDefault();
              setActiveMobileMenu(false);
            }}
            className="mt-5 ml-5"
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </a>
        </div>
        <div
          className={clsx([
            "h-full box bg-white/[0.95] rounded-none xl:rounded-xl z-20 relative w-[275px] duration-300 transition-[width] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] overflow-hidden flex flex-col",
          ])}
          onMouseOver={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(true);
          }}
          onMouseLeave={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(false);
          }}
        >
          <div
            className={clsx([
              "flex-none hidden xl:flex items-center z-10 px-5 h-[65px] w-[275px] overflow-hidden relative duration-300 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px]",
            ])}
          >
            <img
              src="/astenir.svg"
              alt="Astenir"
              className="h-[20px] w-auto object-contain"
            />

            <a
              href=""
              onClick={toggleCompactMenu}
              className="hidden group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] 3xl:flex items-center justify-center w-[20px] h-[20px] ml-auto border rounded-full border-slate-600/40 hover:bg-slate-600/5 dark:border-darkmode-100"
            >
              <Lucide icon="ArrowLeft" className="w-3.5 h-3.5 stroke-[1.3]" />
            </a>
          </div>


          <div
            ref={scrollableRef}
            className={clsx([
              "w-full h-full z-20 px-5 overflow-y-auto overflow-x-hidden pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
              "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
            ])}
          >
            <ul className="scrollable">
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
              typeof menu == "string" ? (
                <li className="side-menu__divider flex items-center justify-between" key={menuKey}>
                  {menu}
                </li>
              ) : (
                <li key={menuKey}>
                  <a
                    href=""
                    className={clsx([
                      "side-menu__link",
                      { "side-menu__link--active": menu.active },
                      { "side-menu__link--active-dropdown": menu.activeDropdown },
                    ])}
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      if (menu.subMenu) {
                        const updatedMenu = [...formattedMenu];
                        (updatedMenu[menuKey] as FormattedMenu).activeDropdown = !menu.activeDropdown;
                        setFormattedMenu(updatedMenu);
                      } else {
                        linkTo(menu, navigate, handleModalTrigger);
                      }
                    }}
                  >
                    <Lucide icon={menu.icon} className="side-menu__link__icon" />
                    <div className="side-menu__link__title">{t(menu.title)}</div>
                    
                    {menu.subMenu && (
                      <Lucide
                        icon="ChevronDown"
                        className={clsx([
                          "side-menu__link__chevron w-4 h-4 transition-transform duration-300",
                          { "rotate-180": menu.activeDropdown }
                        ])}
                      />
                    )}
                  </a>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition in={menu.activeDropdown} onEnter={enter} onExit={leave} timeout={300}>
                      <ul className={clsx(["side-menu__sub-list", { block: menu.activeDropdown, hidden: !menu.activeDropdown }])}>
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <a
                              href=""
                              className={clsx(["side-menu__link side-menu__link--sub", { "side-menu__link--active": subMenu.active }])}
                              onClick={(e) => {
                                e.preventDefault();
                                linkTo(subMenu, navigate, handleModalTrigger);
                              }}
                            >
                              <div className="side-menu__link__title">{t(subMenu.title)}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                </li>
              )
              )}
            </ul>
          </div>
        </div>
        <div className="fixed h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px] mt-3.5 inset-x-0 top-0">
          <div
            className={clsx([
              "top-bar absolute left-0 xl:left-3.5 right-0 h-full mx-5 group",
              "before:content-[''] before:absolute before:top-0 before:inset-x-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur",
              topBarActive && "top-bar--active",
            ])}
          >
            <div
              className="
      container flex items-center w-full h-full transition-[padding,background-color,border-color] ease-in-out duration-300 box bg-transparent border-transparent shadow-none dark:bg-transparent dark:border-transparent
      group-[.top-bar--active]:box group-[.top-bar--active]:px-5
      group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:from-theme-1 group-[.top-bar--active]:to-theme-2
    "
            >
              {/* Menu Mobile */}
              <div className="flex items-center gap-1 xl:hidden">
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveMobileMenu(true);
                  }}
                  className="p-2 text-white rounded-full hover:bg-white/5"
                >
                  <Lucide icon="AlignJustify" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href=""
                  className="p-2 text-white rounded-full hover:bg-white/5"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickSearch(true);
                  }}
                >
                  <Lucide icon="Search" className="w-[18px] h-[18px]" />
                </a>
              </div>

              <div className="flex items-center mr-auto xl:block">
                <div className="flex items-center gap-3">
                  <div className="w-36">
                    <TomSelect
                       value=""
                       onChange={(e: any) =>
                         console.log("Workspace selecionado:", e)
                       }
                      options={{
                        placeholder: t("search"),
                      }}
                      className="custom-tomselect bg-transparent border border-white/20 rounded-md text-sm shadow-sm text-white">
                      <option value="ws1" className="text-gray-800">
                        Workspace
                      </option>
                      <option value="ws2" className="text-gray-800">
                        Astenir Corp
                      </option>
                    </TomSelect>
                  </div>

                  {/* --- Select 2: Entity --- */}
                  <div className="w-36">
                    <TomSelect
                      value=""
                      onChange={(e: any) =>
                        console.log("Entity selecionada:", e)
                      }
                      options={{
                        placeholder: t("search"),
                      }}
                      className="custom-tomselect bg-transparent border border-white/20 rounded-md text-sm shadow-sm text-white">
                       <option value="ent1" className="text-gray-800">
                        Cliente A
                      </option>
                      <option value="ent2" className="text-gray-800">
                        Fornecedor B
                      </option>
                    </TomSelect>
                  </div>

                  {/* --- Select 3: Connection --- */}
                  <div className="w-36">
                    <TomSelect
                      value=""
                      onChange={(e: any) =>
                        console.log("Connection selecionada:", e)
                      }
                      options={{
                        placeholder: t("search"),
                      }}
                      className="custom-tomselect bg-transparent border border-white/20 rounded-md text-sm shadow-sm text-white">
                      <option value="conn1" className="text-gray-800">
                        WhatsApp API
                      </option>
                      <option value="conn2" className="text-gray-800">
                        Stripe
                      </option>
                    </TomSelect>
                  </div>
                </div>
              </div>

              {/* ÁREA DE BUSCA */}
              <div
                className="relative flex items-center xl:flex mr-4"
                onClick={() => setQuickSearch(true)}
              >
                <div className="bg-white/[0.12] border-transparent border w-[300px] flex items-center py-2 px-3.5 rounded-[0.5rem] text-white cursor-pointer hover:bg-white/[0.2] transition-colors duration-300">
                  <Lucide icon="Search" className="w-[18px] h-[18px] text-white" />
                  <div className="ml-2.5 mr-auto text-white">{t('quick_search')}</div>
                </div>
              </div>
              <QuickSearch
                quickSearch={quickSearch}
                setQuickSearch={setQuickSearch}
              />

              {/* MENU DO USUÁRIO & NOTIFICAÇÕES */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <a href="" onClick={(e) => { e.preventDefault(); setActivitiesPanel(true); }} className="p-2 text-white rounded-full hover:bg-white/10">
                    <Lucide icon="LayoutGrid" className="w-[18px] h-[18px]" />
                  </a>
                  <a href="" onClick={(e) => { e.preventDefault(); requestFullscreen(); }} className="p-2 text-white rounded-full hover:bg-white/10">
                    <Lucide icon="Expand" className="w-[18px] h-[18px]" />
                  </a>
                  <a href="" onClick={(e) => { e.preventDefault(); setNotificationsPanel(true); }} className="p-2 text-white rounded-full hover:bg-white/10">
                    <Lucide icon="Bell" className="w-[18px] h-[18px]" />
                  </a>
                </div>

                <Menu className="flex gap-2 items-center">

                  <WorkspaceSelector />

                  <Menu.Button className="block w-10 h-10 overflow-hidden rounded-full border-[2px] border-white/50 shadow-lg">
                    {userPhoto?.photo_url ? (
                      <img src={userPhoto.photo_url} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm select-none">
                        {userPhoto?.name?.charAt(0).toUpperCase() || ""}
                      </div>
                    )}
                  </Menu.Button>

                  <Menu.Items className="w-56 mt-1">
                    <Menu.Item onClick={() => { navigate("settings"); }}>
                      <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                      {t('settings')}
                    </Menu.Item>
                    <LanguageSelector />
                    <ToggleDarkMode />
                    <Menu.Divider />
                    <Menu.Item onClick={() => { handleLogout(); }}>
                      <Lucide icon="Power" className="w-4 h-4 mr-2" />
                      {t('logout')}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>

              <ActivitiesPanel activitiesPanel={activitiesPanel} setActivitiesPanel={setActivitiesPanel} />
              <NotificationsPanel notificationsPanel={notificationsPanel} setNotificationsPanel={setNotificationsPanel} />
              <SwitchAccount switchAccount={switchAccount} setSwitchAccount={setSwitchAccount} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx([
          "transition-[margin,width] duration-100 xl:pl-3.5 pt-[54px] pb-16 relative z-10 group mode",
          { "xl:ml-[275px]": !compactMenu },
          { "xl:ml-[91px]": compactMenu },
          { "mode--light": !topBarActive },
        ])}
      >
        <div className="px-5 mt-16">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
      <GenericModal
        open={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={t("select_the_connection")}
        subtitle={t("select_the_desired_connection")}
        size="big"
        content={
          <ModalSelectConnection
            onClose={() => setModalState({ ...modalState, isOpen: false })}
            onConfirm={handleConnectionSelected}
          />
        }
      />
    </div >
  );
}

export default Main;
