import { TbMoon, TbSun } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectDarkMode, setDarkMode } from "@/stores/darkModeSlice";
import { useTranslation } from "react-i18next";

const DARK_CLASS = "dark";

export default function ToggleDarkMode() {
  const isDark = useAppSelector(selectDarkMode);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (isDark) {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }

  const toggleMode = () => {
    const newDarkState = !isDark;
    dispatch(setDarkMode(newDarkState));
  };

  return (
    <button
      onClick={toggleMode}
      className="flex items-center w-full px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-darkmode-300"
    >
      <span className="flex items-center mr-2">
        {isDark ? (
          <TbMoon className="w-4 h-4" />
        ) : (
          <TbSun className="w-4 h-4" />
        )}
      </span>

      <span className="font-normal">
        {isDark ? t('dark_mode') : t('light_mode')}
      </span>

      <span className="ml-auto">
        <div className={`w-9 h-5 rounded-full flex items-center px-[2px] transition-all ${isDark ? "bg-slate-700 justify-end" : "bg-slate-300 justify-start"}`}>
          <div className="w-4 h-4 rounded-full bg-white shadow" />
        </div>
      </span>
    </button>
  );
}