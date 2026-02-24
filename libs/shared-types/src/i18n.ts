import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations manually (bundler friendly for Vite)
import arAuth from './locales/ar/auth.json';
import arCommon from './locales/ar/common.json';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import idAuth from './locales/id/auth.json';
import idCommon from './locales/id/common.json';

const resources = {
  id: {
    common: idCommon,
    auth: idAuth,
  },
  en: {
    common: enCommon,
    auth: enAuth,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'id', // Default language is Indonesian
    fallbackLng: 'en', // Fallback to English if key missing

    // Have a common namespace used around the full app
    ns: ['common', 'auth'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
