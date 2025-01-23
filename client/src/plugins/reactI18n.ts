import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ru from "../locales/ru.json";

export const defaultNS = "translations";
export const resources = {
  en: {
    translations: en,
  },
  ru: {
    translations: ru,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("I18N_LANGUAGE") ?? "en",
  fallbackLng: "en",
  resources,
  ns: ["translations"],
  defaultNS,
  interpolation: {
    escapeValue: false,
    format: function (value, format) {
      if (format === "capitalize") {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    },
  },
});

i18n.languages = ["en", "ru"];

export default i18n;
