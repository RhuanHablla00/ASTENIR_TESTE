import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt-BR",
    supportedLngs: ["pt-BR", "en", "es", "fr"],

    ns: ["common", "errors"],
    defaultNS: "common",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    detection: {
      lookupLocalStorage: "@astenir.i18n",
    },

    interpolation: {
      escapeValue: false,
    },

    debug: false,
  });

export default i18n;
