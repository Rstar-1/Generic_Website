import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const ALL_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "EN" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "HI" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "MR" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "GU" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "BN" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "TA" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "TE" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "KN" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "ML" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "PA" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "UR" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "ES" },
  { code: "fr", name: "French", nativeName: "Français", flag: "FR" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "DE" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "AR" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "RU" },
  { code: "zh-CN", name: "Chinese", nativeName: "中文", flag: "ZH" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "JA" },
];

export const getSavedLanguage = () => {
  if (typeof window === "undefined") return "en";

  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  const saved = match?.[1] || localStorage.getItem("i18nextLng") || "en";

  return ALL_LANGUAGES.some(({ code }) => code === saved) ? saved : "en";
};

export const changeWebsiteLanguage = (code = "en") => {
  if (typeof window === "undefined") return;

  if (!ALL_LANGUAGES.some((lang) => lang.code === code)) return;

  const cookie = code === "en" ? "" : `/en/${code}`;
  const expires =
    code === "en" ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";

  document.cookie = `googtrans=${cookie}; path=/${expires}`;
  document.cookie = `googtrans=${cookie}; path=/${expires}; domain=${location.hostname}`;

  localStorage.setItem("i18nextLng", code);
  i18n.changeLanguage(code);

  const select = document.querySelector(".goog-te-combo");

  if (select) {
    select.value = code;
    select.dispatchEvent(new Event("change"));
  } else {
    location.reload();
  }
};

export const initGoogleTranslate = () => {
  if (
    typeof window === "undefined" ||
    document.getElementById("google-translate-script")
  )
    return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false },
      "google_translate_element",
    );
  };

  const container = document.createElement("div");
  container.id = "google_translate_element";
  container.hidden = true;
  document.body.appendChild(container);

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getSavedLanguage(),
    fallbackLng: "en",
    supportedLngs: ALL_LANGUAGES.map(({ code }) => code),
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

if (typeof window !== "undefined") {
  initGoogleTranslate();
}

export default i18n;
