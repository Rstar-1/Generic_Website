import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const ALL_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'HI' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: 'MR' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'GU' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: 'BN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'TA' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'TE' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: 'ML' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: 'PA' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: 'UR' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'DE' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'AR' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'RU' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: 'ZH' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'JA' }
];

export const getSavedLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  if (match && match[1]) return match[1];
  return localStorage.getItem('i18nextLng') || 'en';
};

export const changeWebsiteLanguage = (langCode) => {
  if (typeof window === 'undefined') return;
  const code = langCode || 'en';

  if (code === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
  } else {
    const val = `/en/${code}`;
    document.cookie = `googtrans=${val}; path=/;`;
    document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname};`;
  }

  localStorage.setItem('i18nextLng', code);
  i18n.changeLanguage(code);

  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
};

export const initGoogleTranslate = () => {
  if (typeof window === 'undefined') return;
  if (!document.getElementById('google-translate-script')) {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      lookupCookie: 'googtrans',
    },
    interpolation: {
      escapeValue: false,
    },
  });

if (typeof window !== 'undefined') {
  initGoogleTranslate();
}

export default i18n;
