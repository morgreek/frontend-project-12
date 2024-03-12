import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import App from './App';
import resources from './locales/index.js';

const Init = () => {
  const i18nInstance = i18next.createInstance();

  i18nInstance
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  return <App i18n={i18nInstance} />;
};

export default Init;
