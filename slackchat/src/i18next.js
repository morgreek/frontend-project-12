import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    nterpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18next;
